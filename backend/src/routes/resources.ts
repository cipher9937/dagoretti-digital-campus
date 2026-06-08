import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { subjectId, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (subjectId) where.subjectId = subjectId;
    if (req.user!.role === 'STUDENT') where.isPublic = true;

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
        include: {
          teacher: { select: { firstName: true, lastName: true } },
          subject: { select: { name: true } }
        }
      }),
      prisma.resource.count({ where })
    ]);
    res.json({ success: true, data: resources, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
    const resource = await prisma.resource.create({
      data: { ...req.body, teacherId: teacher?.id || req.body.teacherId }
    });
    res.status(201).json({ success: true, data: resource });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.resource.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) { next(error); }
});

export default router;