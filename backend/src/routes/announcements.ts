import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const where: any = { isActive: true };
    if (req.user!.role === 'STUDENT') {
      where.OR = [{ target: 'ALL' }, { target: 'STUDENTS' }];
    } else if (req.user!.role === 'TEACHER') {
      where.OR = [{ target: 'ALL' }, { target: 'TEACHERS' }];
    }
    const announcements = await prisma.announcement.findMany({
      where, orderBy: { createdAt: 'desc' }, take: 20
    });
    res.json({ success: true, data: announcements });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = req.user!.role === 'TEACHER'
      ? await prisma.teacher.findUnique({ where: { userId: req.user!.id } })
      : null;
    const announcement = await prisma.announcement.create({
      data: { ...req.body, teacherId: teacher?.id || null }
    });
    res.status(201).json({ success: true, data: announcement });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.announcement.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) { next(error); }
});

export default router;