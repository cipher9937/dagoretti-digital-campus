import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { page = '1', limit = '10', status, category, upcoming } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (upcoming === 'true') {
      where.startDate = { gte: new Date() };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take,
        orderBy: { startDate: 'asc' },
      }),
      prisma.event.count({ where }),
    ]);

    res.json({
      success: true,
      data: events,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('startDate').isISO8601(),
    body('category').trim().notEmpty(),
  ]),
  async (req: any, res, next) => {
    try {
      const event = await prisma.event.create({
        data: req.body,
      });

      res.status(201).json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await prisma.event.update({
        where: { id },
        data: req.body,
      });

      res.json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.event.delete({ where: { id } });
      res.json({ success: true, message: 'Event deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as eventRouter };
