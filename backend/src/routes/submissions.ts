import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('STUDENT'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
    if (!student) throw new AppError('Student not found', 404);
    const submission = await prisma.submission.upsert({
      where: { assignmentId_studentId: { assignmentId: req.body.assignmentId, studentId: student.id } },
      create: { ...req.body, studentId: student.id, status: 'SUBMITTED' },
      update: { content: req.body.content, attachments: req.body.attachments, status: 'SUBMITTED', submittedAt: new Date() }
    });
    res.status(201).json({ success: true, data: submission });
  } catch (error) { next(error); }
});

router.get('/my', authenticate, authorize('STUDENT'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
    if (!student) throw new AppError('Student not found', 404);
    const submissions = await prisma.submission.findMany({
      where: { studentId: student.id },
      include: { assignment: { include: { subject: true } } },
      orderBy: { submittedAt: 'desc' }
    });
    res.json({ success: true, data: submissions });
  } catch (error) { next(error); }
});

router.patch('/:id/grade', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const submission = await prisma.submission.update({
      where: { id: req.params.id },
      data: { marks: req.body.marks, feedback: req.body.feedback, status: 'GRADED', gradedAt: new Date() }
    });
    res.json({ success: true, data: submission });
  } catch (error) { next(error); }
});

export default router;