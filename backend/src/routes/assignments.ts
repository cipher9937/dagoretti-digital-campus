import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = '1', limit = '20', subjectId, status, gradeLevel } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (subjectId) where.subjectId = subjectId as string;
    if (status) where.status = status as string;
    if (gradeLevel) {
      where.subject = { gradeLevel: { has: gradeLevel as string } };
    }

    if (req.user!.role === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (student) {
        where.subject = { gradeLevel: { has: student.gradeLevel } };
      }
    } else if (req.user!.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      if (teacher) {
        where.teacherId = teacher.id;
      }
    }

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
        skip,
        take,
        orderBy: { dueDate: 'asc' },
        include: {
          subject: { select: { name: true, code: true } },
          _count: { select: { submissions: true } },
        },
      }),
      prisma.assignment.count({ where }),
    ]);

    res.json({
      success: true,
      data: assignments,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        subject: true,
        submissions: {
          include: {
            student: {
              include: { user: { select: { firstName: true, lastName: true } } },
            },
          },
        },
      },
    });

    if (!assignment) {
      throw new AppError('Assignment not found', 404);
    }

    res.json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('description').optional().trim(),
    body('subjectId').isUUID(),
    body('type').isIn(['HOMEWORK', 'CLASSWORK', 'PROJECT', 'QUIZ', 'EXAM', 'LAB_REPORT']),
    body('dueDate').isISO8601(),
    body('maxScore').optional().isInt({ min: 1, max: 100 }),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      const teacherId = teacher?.id;

      const assignment = await prisma.assignment.create({
        data: {
          ...req.body,
          teacherId: teacherId || req.body.teacherId,
        },
        include: { subject: { select: { name: true } } },
      });

      res.status(201).json({ success: true, data: assignment });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/submit', authenticate, authorize('STUDENT'),
  validate([
    param('id').isUUID(),
    body('content').optional().trim(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      const { content, attachments } = req.body;

      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (!student) {
        throw new AppError('Student profile not found', 404);
      }

      const assignment = await prisma.assignment.findUnique({ where: { id } });
      if (!assignment) {
        throw new AppError('Assignment not found', 404);
      }

      const isLate = new Date() > new Date(assignment.dueDate);

      const submission = await prisma.submission.upsert({
        where: {
          assignmentId_studentId: {
            assignmentId: id,
            studentId: student.id,
          },
        },
        update: {
          content,
          attachments,
          status: isLate ? 'LATE' : 'SUBMITTED',
          submittedAt: new Date(),
        },
        create: {
          assignmentId: id,
          studentId: student.id,
          content,
          attachments,
          status: isLate ? 'LATE' : 'SUBMITTED',
        },
      });

      res.json({ success: true, data: submission });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id/grade', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'),
  validate([
    param('id').isUUID(),
    body('studentId').isUUID(),
    body('score').isInt({ min: 0, max: 100 }),
    body('feedback').optional().trim(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      const { studentId, score, feedback } = req.body;

      const submission = await prisma.submission.update({
        where: {
          assignmentId_studentId: {
            assignmentId: id,
            studentId,
          },
        },
        data: {
          score,
          feedback,
          status: 'GRADED',
          gradedAt: new Date(),
          gradedBy: req.user!.id,
        },
      });

      res.json({ success: true, data: submission });
    } catch (error) {
      next(error);
    }
  }
);

export { router as assignmentRouter };
