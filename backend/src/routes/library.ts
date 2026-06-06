import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = '1', limit = '20', type, category, status, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { author: { contains: search as string, mode: 'insensitive' } },
        { isbn: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.libraryItem.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.libraryItem.count({ where }),
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

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await prisma.libraryItem.findUnique({
      where: { id },
      include: {
        loans: {
          where: { status: 'ACTIVE' },
          include: {
            student: { include: { user: { select: { firstName: true, lastName: true } } } },
          },
        },
      },
    });

    if (!item) {
      throw new AppError('Library item not found', 404);
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('type').isIn(['TEXTBOOK', 'REFERENCE', 'FICTION', 'NON_FICTION', 'DIGITAL', 'JOURNAL', 'MAGAZINE']),
    body('category').trim().notEmpty(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const item = await prisma.libraryItem.create({
        data: req.body,
      });

      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/borrow', authenticate, authorize('STUDENT'),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      const { dueDate } = req.body;

      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (!student) {
        throw new AppError('Student profile not found', 404);
      }

      const item = await prisma.libraryItem.findUnique({ where: { id } });
      if (!item) {
        throw new AppError('Item not found', 404);
      }

      if (item.availableCopies < 1) {
        throw new AppError('Item not available for borrowing', 400);
      }

      const loan = await prisma.$transaction([
        prisma.libraryLoan.create({
          data: {
            itemId: id,
            studentId: student.id,
            dueDate: new Date(dueDate),
          },
        }),
        prisma.libraryItem.update({
          where: { id },
          data: {
            availableCopies: { decrement: 1 },
            status: item.availableCopies - 1 === 0 ? 'BORROWED' : 'AVAILABLE',
          },
        }),
      ]);

      res.json({ success: true, data: loan[0] });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/return', authenticate, authorize('STUDENT', 'ADMIN', 'SUPER_ADMIN'),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;

      const loan = await prisma.libraryLoan.findFirst({
        where: { itemId: id, status: 'ACTIVE' },
      });

      if (!loan) {
        throw new AppError('No active loan found for this item', 404);
      }

      await prisma.$transaction([
        prisma.libraryLoan.update({
          where: { id: loan.id },
          data: { status: 'RETURNED', returnedAt: new Date() },
        }),
        prisma.libraryItem.update({
          where: { id },
          data: {
            availableCopies: { increment: 1 },
            status: 'AVAILABLE',
          },
        }),
      ]);

      res.json({ success: true, message: 'Item returned successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as libraryRouter };
