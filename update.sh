#!/bin/bash

# DarulQuran Frontend Deployment Update Script
# This script pulls the latest code, installs dependencies, builds, and restarts the application

set -e  # Exit on any error

echo "🚀 Starting deployment update..."

cd /var/www/darulquran-frontend

# Pull latest changes
echo "📥 Pulling latest changes from repository..."
git pull origin main || git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build application
echo "🔨 Building Next.js application..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart darulquran-frontend

echo "✅ Deployment completed successfully!"
echo "📊 Application status:"
pm2 status

