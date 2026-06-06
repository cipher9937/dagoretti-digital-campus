import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = '1', limit = '20', unread } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = { userId: req.user!.id };
    if (unread === 'true') where.read = false;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
    ]);

    res.json({
      success: true,
      data: notifications,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/read', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.update({
      where: { id, userId: req.user!.id },
      data: { read: true },
    });

    res.json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
});

router.patch('/read-all', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.id, read: false },
      data: { read: true },
    });

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
});

export { router as notificationRouter };
