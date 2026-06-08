import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classes = await prisma.class.findMany({
      where: { isActive: true },
      include: {
        classTeacher: { select: { firstName: true, lastName: true } },
        _count: { select: { students: true } }
      },
      orderBy: { name: 'asc' }
    });
    res.json({ success: true, data: classes });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cls = await prisma.class.create({
      data: req.body,
      include: { classTeacher: true }
    });
    res.status(201).json({ success: true, data: cls });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cls = await prisma.class.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: cls });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.class.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Class deleted' });
  } catch (error) { next(error); }
});

export default router;