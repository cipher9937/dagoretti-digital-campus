import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [totalStudents, totalTeachers, totalClasses, activeAssignments, recentNews, upcomingEvents] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count({ where: { isActive: true } }),
      prisma.assignment.count({ where: { status: 'PUBLISHED', dueDate: { gte: new Date() } } }),
      prisma.news.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 5,
        include: { author: { select: { firstName: true, lastName: true } } }
      }),
      prisma.event.findMany({
        where: { startDate: { gte: new Date() } },
        orderBy: { startDate: 'asc' },
        take: 5
      })
    ]);

    const todayAttendance = await prisma.attendance.groupBy({
      by: ['status'],
      where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      _count: { status: true }
    });

    res.json({
      success: true,
      data: { stats: { totalStudents, totalTeachers, totalClasses, activeAssignments }, todayAttendance, recentNews, upcomingEvents }
    });
  } catch (error) { next(error); }
});

router.get('/teacher', authenticate, authorize('TEACHER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
    if (!teacher) throw new AppError('Teacher profile not found', 404);

    const [myAssignments, myClasses, upcomingOnlineClasses, announcements] = await Promise.all([
      prisma.assignment.count({ where: { teacherId: teacher.id, status: 'PUBLISHED' } }),
      prisma.subjectTeacher.findMany({
        where: { teacherId: teacher.id },
        include: { subject: true }
      }),
      prisma.onlineClass.findMany({
        where: { teacherId: teacher.id, scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: 'asc' },
        take: 5
      }),
      prisma.announcement.findMany({
        where: { OR: [{ target: 'ALL' }, { target: 'TEACHERS' }], isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    res.json({ success: true, data: { myAssignments, myClasses, upcomingOnlineClasses, announcements } });
  } catch (error) { next(error); }
});

router.get('/student', authenticate, authorize('STUDENT'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user!.id },
      include: { class: { include: { classSubjects: { include: { subject: true } } } } }
    });
    if (!student) throw new AppError('Student profile not found', 404);

    const [pendingAssignments, upcomingClasses, announcements, recentLibrary] = await Promise.all([
      prisma.assignment.findMany({
        where: { classId: student.classId, status: 'PUBLISHED', dueDate: { gte: new Date() } },
        orderBy: { dueDate: 'asc' },
        take: 5,
        include: { subject: { select: { name: true } } }
      }),
      prisma.onlineClass.findMany({
        where: { classId: student.classId, scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: