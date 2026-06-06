# Deployment Guide

## Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - NEXT_PUBLIC_API_URL
   - NEXT_PUBLIC_APP_URL
   - NEXT_PUBLIC_SCHOOL_NAME
4. Deploy

## Backend Deployment (Railway/Render)

1. Create new project
2. Connect GitHub repository
3. Set environment variables:
   - DATABASE_URL
   - JWT_SECRET
   - JWT_REFRESH_SECRET
   - CORS_ORIGIN
4. Deploy

## Database Setup

1. Create PostgreSQL database
2. Run migrations: `npx prisma migrate deploy`
3. Seed data: `npx prisma db seed`

## Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=https://api.dagorettihigh.ac.ke/api
NEXT_PUBLIC_APP_URL=https://dagorettihigh.ac.ke
NEXT_PUBLIC_SCHOOL_NAME=Dagoretti High School
```

### Backend (.env)
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=https://dagorettihigh.ac.ke
```

## SSL/TLS Setup

1. Obtain SSL certificate
2. Configure nginx with SSL
3. Update CORS_ORIGIN to HTTPS URL
