import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, classId, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (classId) where.classId = classId;
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { admissionNumber: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where, skip, take: Number(limit), orderBy: { firstName: 'asc' },
        include: {
          class: { select: { name: true, level: true, stream: true } },
          user: { select: { email: true, isActive: true, lastLogin: true } }
        }
      }),
      prisma.student.count({ where })
    ]);
    res.json({ success: true, data: students, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: {
        class: { include: { classSubjects: { include: { subject: true } } } },
        user: { select: { email: true, isActive: true, lastLogin: true, createdAt: true } }
      }
    });
    if (!student) throw new AppError('Student not found', 404);
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, gender, phone, parentPhone, parentEmail, address, classId, curriculum, admissionNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password || 'DHS@2024', 12);
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: { email, password: hashedPassword, role: 'STUDENT' } });
      return tx.student.create({
        data: { userId: user.id, firstName, lastName, admissionNumber, dateOfBirth: new Date(dateOfBirth), gender, phone, parentPhone, parentEmail, address, classId, curriculum },
        include: { class: true, user: { select: { email: true } } }
      });
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, ...studentData } = req.body;
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: { ...studentData, ...(studentData.dateOfBirth && { dateOfBirth: new Date(studentData.dateOfBirth) }) },
      include: { class: true, user: { select: { email: true } } }
    });
    if (email) await prisma.user.update({ where: { id: student.userId }, data: { email } });
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
});

router.patch('/:id/deactivate', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!student) throw new AppError('Student not found', 404);
    await prisma.user.update({ where: { id: student.userId }, data: { isActive: false } });
    res.json({ success: true, message: 'Student deactivated' });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!student) throw new AppError('Student not found', 404);
    await prisma.user.delete({ where: { id: student.userId } });
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) { next(error); }
});

export default router;