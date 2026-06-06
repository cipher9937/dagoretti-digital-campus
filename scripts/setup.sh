#!/bin/bash
set -e

echo "🚀 Setting up Dagoretti High School Digital Campus..."

# Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required but not installed. Aborting." >&2; exit 1; }

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install prisma dependencies
echo "Installing prisma dependencies..."
cd prisma
npm install
cd ..

# Set up environment files
echo "Setting up environment files..."
if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "Created frontend/.env"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env"
fi

if [ ! -f prisma/.env ]; then
    cp prisma/.env.example prisma/.env
    echo "Created prisma/.env"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in .env files"
echo "2. Set up PostgreSQL database"
echo "3. Run migrations: npm run db:migrate"
echo "4. Seed database: npm run db:seed"
echo "5. Start development: npm run dev"
