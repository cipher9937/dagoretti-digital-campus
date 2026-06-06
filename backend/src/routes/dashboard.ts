import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      activeAssignments,
      totalNews,
      totalEvents,
      totalResources,
      recentActivities,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count(),
      prisma.assignment.count({ where: { status: 'ACTIVE' } }),
      prisma.news.count(),
      prisma.event.count({ where: { status: 'UPCOMING' } }),
      prisma.resource.count(),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { firstName: true, lastName: true, role: true } } },
      }),
    ]);

    const attendanceToday = await prisma.attendance.count({
      where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    });

    const attendancePresent = await prisma.attendance.count({
      where: {
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        status: 'PRESENT',
      },
    });

    const recentSubmissions = await prisma.submission.findMany({
      take: 5,
      orderBy: { submittedAt: 'desc' },
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        assignment: { select: { title: true } },
      },
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalTeachers,
          totalClasses,
          activeAssignments,
          totalNews,
          totalEvents,
          totalResources,
          attendanceToday,
          attendanceRate: attendanceToday > 0 ? Math.round((attendancePresent / attendanceToday) * 100) : 0,
        },
        recentActivities,
        recentSubmissions,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/teacher', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user!.id },
      include: {
        subjectAssignments: { include: { subject: true } },
        classTeacherStream: { include: { class: true } },
      },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const assignments = await prisma.assignment.findMany({
      where: { teacherId: teacher.id },
      include: {
        subject: { select: { name: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const upcomingClasses = await prisma.onlineClass.findMany({
      where: { teacherId: teacher.id, scheduledAt: { gte: new Date() } },
      orderBy: { scheduledAt: 'asc' },
      take: 5,
    });

    const pendingSubmissions = await prisma.submission.count({
      where: {
        assignment: { teacherId: teacher.id },
        status: 'SUBMITTED',
      },
    });

    res.json({
      success: true,
      data: {
        teacher,
        assignments,
        upcomingClasses,
        pendingSubmissions,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/student', authenticate, authorize('STUDENT'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user!.id },
      include: {
        stream: { include: { class: true } },
        user: { select: { firstName: true, lastName: true, email: true, avatar: true } },
      },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        subject: { gradeLevel: { has: student.gradeLevel } },
        status: 'ACTIVE',
      },
      include: {
        subject: { select: { name: true } },
        submissions: { where: { studentId: student.id } },
      },
      orderBy: { dueDate: 'asc' },
      take: 5,
    });

    const upcomingClasses = await prisma.onlineClass.findMany({
      where: { scheduledAt: { gte: new Date() } },
      orderBy: { scheduledAt: 'asc' },
      take: 3,
    });

    const attendance = await prisma.attendance.findMany({
      where: { studentId: student.id },
      orderBy: { date: 'desc' },
      take: 7,
    });

    const recentResources = await prisma.resource.findMany({
      where: { subject: { gradeLevel: { has: student.gradeLevel } } },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });

    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.id, read: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    res.json({
      success: true,
      data: {
        student,
        assignments,
        upcomingClasses,
        attendance,
        recentResources,
        notifications,
      },
    });
  } catch (error) {
    next(error);
  }
});

export { router as dashboardRouter };
