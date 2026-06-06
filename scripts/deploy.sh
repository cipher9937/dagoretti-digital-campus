#!/bin/bash
set -e

echo "🚀 Deploying Dagoretti High School Digital Campus..."

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Build backend
echo "Building backend..."
cd backend
npm run build
cd ..

# Deploy with Docker (optional)
if [ "$1" == "docker" ]; then
    echo "Deploying with Docker..."
    docker-compose -f docker/docker-compose.yml up -d --build
fi

echo "✅ Deployment complete!"
