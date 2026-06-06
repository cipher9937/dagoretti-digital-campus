import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/boards', authenticate, async (req, res, next) => {
  try {
    const { subjectId } = req.query;
    const where: any = {};
    if (subjectId) where.subjectId = subjectId as string;

    const boards = await prisma.discussionBoard.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        subject: { select: { name: true, code: true } },
        _count: { select: { posts: true } },
      },
    });

    res.json({ success: true, data: boards });
  } catch (error) {
    next(error);
  }
});

router.get('/boards/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await prisma.discussionBoard.findUnique({
      where: { id },
      include: {
        subject: true,
        posts: {
          where: { parentId: null },
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { firstName: true, lastName: true, role: true } },
            replies: {
              orderBy: { createdAt: 'asc' },
              include: {
                author: { select: { firstName: true, lastName: true, role: true } },
              },
            },
          },
        },
      },
    });

    if (!board) {
      throw new AppError('Discussion board not found', 404);
    }

    res.json({ success: true, data: board });
  } catch (error) {
    next(error);
  }
});

router.post('/boards', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'),
  validate([
    body('subjectId').isUUID(),
    body('title').trim().notEmpty(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const board = await prisma.discussionBoard.create({
        data: {
          ...req.body,
          createdBy: req.user!.id,
        },
        include: {
          subject: { select: { name: true } },
        },
      });

      res.status(201).json({ success: true, data: board });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/boards/:id/posts', authenticate,
  validate([
    body('content').trim().notEmpty(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      const { content, parentId, attachments } = req.body;

      const board = await prisma.discussionBoard.findUnique({ where: { id } });
      if (!board) {
        throw new AppError('Discussion board not found', 404);
      }

      if (board.isLocked) {
        throw new AppError('This discussion board is locked', 403);
      }

      const post = await prisma.discussionPost.create({
        data: {
          boardId: id,
          authorId: req.user!.id,
          content,
          parentId,
          attachments,
        },
        include: {
          author: { select: { firstName: true, lastName: true, role: true } },
        },
      });

      res.status(201).json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  }
);

export { router as discussionRouter };
