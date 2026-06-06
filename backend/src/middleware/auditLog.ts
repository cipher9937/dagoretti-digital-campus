import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from './auth';

export const auditLog = (action: string, entityType: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function(body: any) {
      if (req.user && res.statusCode < 400) {
        prisma.activityLog.create({
          data: {
            userId: req.user.id,
            action,
            entityType,
            entityId: req.params.id || req.body.id,
            details: JSON.stringify({ body: req.body, params: req.params }),
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          },
        }).catch(console.error);
      }
      return originalSend.call(this, body);
    };

    next();
  };
};
