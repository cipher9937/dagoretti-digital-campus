import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/boards', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { subjectId } = req.query;
    const boards = await prisma.discussionBoard.findMany({
      where: { ...(subjectId ? { subjectId: subjectId as string } : {}), isActive: true },
      include: {
        subject: { select: { name: true } },
        _count: { select: { posts: true } }
      }
    });
    res.json({ success: true, data: boards });
  } catch (error) { next(error); }
});

router.get('/boards/:boardId/posts', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.discussionPost.findMany({
      where: { boardId: req.params.boardId, parentId: null, isActive: true },
      include: { replies: { where: { isActive: true }, orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: posts });
  } catch (error) { next(error); }
});

router.post('/boards/:boardId/posts', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const post = await prisma.discussionPost.create({
      data: {
        boardId: req.params.boardId,
        authorId: req.user!.id,
        content: req.body.content,
        parentId: req.body.parentId || null
      }
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) { next(error); }
});

router.post('/boards', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const board = await prisma.discussionBoard.create({ data: req.body });
    res.status(201).json({ success: true, data: board });
  } catch (error) { next(error); }
});

export default router;