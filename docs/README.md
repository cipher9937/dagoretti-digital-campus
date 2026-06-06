# Dagoretti High School Digital Campus

A complete production-ready digital campus platform for Dagoretti High School, Nairobi Kenya.

## Overview

This platform combines an official school website, student portal, teacher portal, admin portal, 
e-learning platform, digital library, and school news platform into a single unified system.

## Technology Stack

### Frontend
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT Authentication
- Refresh Tokens
- bcrypt Password Hashing

### Deployment
- Vercel (Frontend)
- Railway/Render (Backend)
- PostgreSQL Database

## Project Structure

```
/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
├── prisma/            # Prisma schema and migrations
├── docker/            # Docker configuration
├── tests/             # Test suites
├── scripts/           # Utility scripts
└── docs/              # Documentation
```

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ../prisma && npm install
   ```

3. Set up environment variables:
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   cp prisma/.env.example prisma/.env
   ```

4. Set up the database:
   ```bash
   cd prisma
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the development servers:
   ```bash
   npm run dev
   ```

### Docker Deployment

```bash
docker-compose -f docker/docker-compose.yml up -d
```

## Features

### Public Website
- Home page with hero section, school introduction, achievements
- About page with history, vision, mission, leadership
- Academics page with curriculum information
- News & Events pages
- Gallery with real school photos
- Contact page with Google Maps

### Student Portal
- Dashboard with assignments, timetable, announcements
- Subject portal with notes, videos, resources
- Assignment submission and tracking
- Digital library access
- Discussion boards
- School calendar

### Teacher Portal
- Dashboard with classes, assignments, attendance
- Content management (upload PDFs, videos, notes)
- Assignment creation and grading
- Online class scheduling
- Attendance marking
- Communication tools

### Admin Portal
- Dashboard with statistics and analytics
- Student/Teacher/Class management
- News and event management
- Digital library management
- System settings
- Audit logs

## Security Features

- JWT Authentication with Refresh Tokens
- bcrypt Password Hashing
- Input Validation
- CSRF Protection
- XSS Protection
- SQL Injection Protection (via Prisma)
- Rate Limiting
- Role-Based Access Control
- Audit Logging
- Secure Cookies
- Security Headers

## Performance Features

- Image Optimization
- Code Splitting
- Lazy Loading
- Pagination
- Caching
- Optimized Queries

## License

Copyright © 2024 Dagoretti High School. All rights reserved.
