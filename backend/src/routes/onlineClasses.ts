import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { upcoming, classId, subjectId } = req.query;
    const where: any = {};
    if (upcoming === 'true') where.scheduledAt = { gte: new Date() };
    if (classId) where.classId = classId;
    if (subjectId) where.subjectId = subjectId;

    if (req.user!.role === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (student) where.classId = student.classId;
    }
    if (req.user!.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      if (teacher) where.teacherId = teacher.id;
    }

    const classes = await prisma.onlineClass.findMany({
      where,
      include: {
        teacher: { select: { firstName: true, lastName: true } },
        subject: { select: { name: true } },
        class: { select: { name: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    });
    res.json({ success: true, data: classes });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
    const onlineClass = await prisma.onlineClass.create({
      data: {
        ...req.body,
        teacherId: teacher?.id || req.body.teacherId,
        scheduledAt: new Date(req.body.scheduledAt)
      }
    });
    res.status(201).json({ success: true, data: onlineClass });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const onlineClass = await prisma.onlineClass.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        ...(req.body.scheduledAt && { scheduledAt: new Date(req.body.scheduledAt) })
      }
    });
    res.json({ success: true, data: onlineClass });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.onlineClass.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Online class deleted' });
  } catch (error) { next(error); }
});

export default router;