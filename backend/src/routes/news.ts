import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { page = '1', limit = '10', category, status = 'PUBLISHED', search, featured } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (featured === 'true') where.featuredImage = { not: null };
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        skip,
        take,
        orderBy: { publishedAt: 'desc' },
        include: {
          author: { select: { firstName: true, lastName: true } },
        },
      }),
      prisma.news.count({ where }),
    ]);

    res.json({
      success: true,
      data: news,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const news = await prisma.news.findUnique({
      where: { slug },
      include: {
        author: { select: { firstName: true, lastName: true } },
      },
    });

    if (!news) {
      throw new AppError('News article not found', 404);
    }

    await prisma.news.update({
      where: { id: news.id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('slug').trim().notEmpty().matches(/^[a-z0-9-]+$/),
    body('content').trim().notEmpty(),
    body('category').trim().notEmpty(),
    body('status').isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']),
  ]),
  async (req: any, res, next) => {
    try {
      const news = await prisma.news.create({
        data: {
          ...req.body,
          authorId: req.user!.id,
          publishedAt: req.body.status === 'PUBLISHED' ? new Date() : req.body.publishedAt,
        },
        include: {
          author: { select: { firstName: true, lastName: true } },
        },
      });

      res.status(201).json({ success: true, data: news });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    param('id').isUUID(),
    body('title').optional().trim().notEmpty(),
    body('status').optional().isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']),
  ]),
  async (req: any, res, next) => {
    try {
      const { id } = req.params;
      const news = await prisma.news.update({
        where: { id },
        data: req.body,
        include: {
          author: { select: { firstName: true, lastName: true } },
        },
      });

      res.json({ success: true, data: news });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.news.delete({ where: { id } });
      res.json({ success: true, message: 'News article deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as newsRouter };
