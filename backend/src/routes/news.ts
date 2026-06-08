import { Router, Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, category, search, status = 'PUBLISHED' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = { status };
    if (status === 'PUBLISHED') where.publishedAt = { lte: new Date() };
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where, skip, take: Number(limit), orderBy: { publishedAt: 'desc' },
        include: { author: { select: { firstName: true, lastName: true } } }
      }),
      prisma.news.count({ where })
    ]);
    res.json({ success: true, data: news, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.get('/featured', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await prisma.news.findMany({
      where: { status: 'PUBLISHED', publishedAt: { lte: new Date() } },
      take: 5, orderBy: { views: 'desc' },
      include: { author: { select: { firstName: true, lastName: true } } }
    });
    res.json({ success: true, data: news });
  } catch (error) { next(error); }
});

router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await prisma.news.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { firstName: true, lastName: true } } }
    });
    if (!news) throw new AppError('News not found', 404);
    await prisma.news.update({ where: { id: news.id }, data: { views: { increment: 1 } } });
    res.json({ success: true, data: news });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const admin = await prisma.admin.findUnique({ where: { userId: req.user!.id } });
    if (!admin) throw new AppError('Admin profile not found', 404);
    const slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
    const news = await prisma.news.create({
      data: {
        ...req.body,
        slug,
        tags: req.body.tags || [],
        authorId: admin.id,
        publishedAt: req.body.status === 'PUBLISHED' ? new Date() : null
      }
    });
    res.status(201).json({ success: true, data: news });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const news = await prisma.news.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: news });
  } catch (error) { next(error); }
});

router.patch('/:id/publish', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const news = await prisma.news.update({
      where: { id: req.params.id },
      data: { status: 'PUBLISHED', publishedAt: new Date() }
    });
    res.json({ success: true, data: news });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.news.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'News deleted' });
  } catch (error) { next(error); }
});

export default router;