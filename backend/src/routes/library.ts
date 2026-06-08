import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, category, subjectId, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = { isPublic: true };
    if (category) where.category = category;
    if (subjectId) where.subjectId = subjectId;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { author: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    const [items, total] = await Promise.all([
      prisma.libraryItem.findMany({
        where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
        include: { subject: { select: { name: true } } }
      }),
      prisma.libraryItem.count({ where })
    ]);
    res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.get('/categories', (req: Request, res: Response) => {
  res.json({ success: true, data: ['TEXTBOOK', 'NOTES', 'REVISION', 'PAST_PAPERS', 'VIDEO', 'RESEARCH', 'OTHER'] });
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.libraryItem.create({ data: req.body });
    res.status(201).json({ success: true, data: item });
  } catch (error) { next(error); }
});

router.patch('/:id/download', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.libraryItem.update({
      where: { id: req.params.id },
      data: { downloads: { increment: 1 } }
    });
    res.json({ success: true, data: item });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.libraryItem.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: item });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.libraryItem.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Library item deleted' });
  } catch (error) { next(error); }
});

export default router;