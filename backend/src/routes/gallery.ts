import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/albums', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const albums = await prisma.galleryAlbum.findMany({
      where: { isPublic: true, ...(category ? { category: category as string } : {}) },
      include: {
        _count: { select: { items: true } },
        items: { take: 1, orderBy: { order: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: albums });
  } catch (error) { next(error); }
});

router.get('/albums/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const album = await prisma.galleryAlbum.findUnique({
      where: { id: req.params.id },
      include: { items: { orderBy: { order: 'asc' } } }
    });
    if (!album) return res.status(404).json({ success: false, error: 'Album not found' });
    res.json({ success: true, data: album });
  } catch (error) { next(error); }
});

router.post('/albums', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const album = await prisma.galleryAlbum.create({ data: req.body });
    res.status(201).json({ success: true, data: album });
  } catch (error) { next(error); }
});

router.post('/albums/:id/items', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.galleryItem.create({
      data: { ...req.body, albumId: req.params.id }
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) { next(error); }
});

router.delete('/albums/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.galleryAlbum.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Album deleted' });
  } catch (error) { next(error); }
});

export default router;