import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category) where.category = category;

    const settings = await prisma.systemSetting.findMany({
      where,
      orderBy: { category: 'asc' },
    });

    const settingsMap = settings.reduce((acc: any, setting: any) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    res.json({ success: true, data: settingsMap });
  } catch (error) {
    next(error);
  }
});

router.get('/:key', optionalAuth, async (req, res, next) => {
  try {
    const { key } = req.params;
    const setting = await prisma.systemSetting.findUnique({ where: { key } });

    if (!setting) {
      throw new AppError('Setting not found', 404);
    }

    res.json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
});

router.patch('/:key', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('value').notEmpty(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { key } = req.params;
      const { value, category } = req.body;

      const setting = await prisma.systemSetting.upsert({
        where: { key },
        update: { value, ...(category && { category }) },
        create: { key, value, category: category || 'GENERAL' },
      });

      res.json({ success: true, data: setting });
    } catch (error) {
      next(error);
    }
  }
);

export { router as settingsRouter };
