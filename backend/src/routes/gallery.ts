import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { page = '1', limit = '20', category, featured } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gallery.count({ where }),
    ]);

    res.json({
      success: true,
      data: items,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await prisma.gallery.findUnique({ where: { id } });

    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('category').trim().notEmpty(),
    body('imageUrl').trim().isURL(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const item = await prisma.gallery.create({
        data: req.body,
      });

      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }
);

export { router as galleryRouter };
