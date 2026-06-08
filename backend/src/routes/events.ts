import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { upcoming, category, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = { isPublic: true };
    if (upcoming === 'true') where.startDate = { gte: new Date() };
    if (category) where.category = category;
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where, skip, take: Number(limit), orderBy: { startDate: 'asc' },
        include: { author: { select: { firstName: true, lastName: true } } }
      }),
      prisma.event.count({ where })
    ]);
    res.json({ success: true, data: events, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { author: { select: { firstName: true, lastName: true } } }
    });
    if (!event) throw new AppError('Event not found', 404);
    res.json({ success: true, data: event });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const admin = await prisma.admin.findUnique({ where: { userId: req.user!.id } });
    if (!admin) throw new AppError('Admin not found', 404);
    const event = await prisma.event.create({
      data: {
        ...req.body,
        authorId: admin.id,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate)
      }
    });
    res.status(201).json({ success: true, data: event });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        ...(req.body.startDate && { startDate: new Date(req.body.startDate) }),
        ...(req.body.endDate && { endDate: new Date(req.body.endDate) })
      }
    });
    res.json({ success: true, data: event });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) { next(error); }
});

export default router;