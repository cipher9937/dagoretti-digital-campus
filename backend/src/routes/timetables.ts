import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/class/:classId', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const timetables = await prisma.timetable.findMany({
      where: { classId: req.params.classId },
      include: {
        subject: { select: { name: true, code: true } },
        class: { select: { name: true } }
      },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }]
    });
    res.json({ success: true, data: timetables });
  } catch (error) { next(error); }
});

router.get('/my', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user!.role === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
      const timetables = await prisma.timetable.findMany({
        where: { classId: student.classId },
        include: { subject: true, class: true },
        orderBy: [{ day: 'asc' }, { startTime: 'asc' }]
      });
      return res.json({ success: true, data: timetables });
    }
    if (req.user!.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      if (!teacher) return res.status(404).json({ success: false, error: 'Teacher not found' });
      const subjects = await prisma.subjectTeacher.findMany({
        where: { teacherId: teacher.id },
        select: { subjectId: true }
      });
      const timetables = await prisma.timetable.findMany({
        where: { subjectId: { in: subjects.map(s => s.subjectId) } },
        include: { subject: true, class: true },
        orderBy: [{ day: 'asc' }, { startTime: 'asc' }]
      });
      return res.json({ success: true, data: timetables });
    }
    res.json({ success: true, data: [] });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const timetable = await prisma.timetable.create({ data: req.body });
    res.status(201).json({ success: true, data: timetable });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const timetable = await prisma.timetable.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: timetable });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.timetable.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Timetable entry deleted' });
  } catch (error) { next(error); }
});

export default router;