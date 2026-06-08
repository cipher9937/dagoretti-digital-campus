import { Router, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/create-admin', authenticate, authorize('SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: { email, password: hashed, role: 'ADMIN' } });
      return tx.admin.create({ data: { userId: user.id, firstName, lastName, phone } });
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
});

router.get('/activity-logs', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true, role: true } } }
    });
    res.json({ success: true, data: logs });
  } catch (error) { next(error); }
});

router.get('/settings', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const settings = await prisma.systemSettings.findMany();
    res.json({ success: true, data: settings });
  } catch (error) { next(error); }
});

router.put('/settings', authenticate, authorize('SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { key, value } = req.body;
    const setting = await prisma.systemSettings.upsert({
      where: { key },
      create: { key, value },
      update: { value }
    });
    res.json({ success: true, data: setting });
  } catch (error) { next(error); }
});

router.get('/departments', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const departments = await prisma.department.findMany({
      include: { _count: { select: { teachers: true, subjects: true } } }
    });
    res.json({ success: true, data: departments });
  } catch (error) { next(error); }
});

router.post('/departments', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const dept = await prisma.department.create({ data: req.body });
    res.status(201).json({ success: true, data: dept });
  } catch (error) { next(error); }
});

export default router;