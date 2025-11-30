# Git Deployment Steps

## Local Machine (Windows)

### Step 1: Verify Changes
Check if your changes are saved:
```bash
git status
```

### Step 2: Stage and Commit Changes
If you see modified files, commit them:
```bash
# Stage all changes
git add .

# Or stage specific files
git add app/donation/page.tsx app/programs/page.tsx app/gallery/page.tsx app/notice/page.tsx next.config.js

# Commit with a message
git commit -m "Fix Next.js 15 searchParams Promise types and config warnings"
```

### Step 3: Push to Remote
```bash
git push origin main
```

---

## Server (CentOS VPS)

### Step 1: Navigate to Project Directory
```bash
cd /var/www/darulquran-frontend/darul-quran-foundation-frontend
```

### Step 2: Pull Latest Changes
```bash
git pull origin main
```

### Step 3: Verify Button.tsx is Lowercase
```bash
# Check if button.tsx exists (lowercase)
ls -la components/ui/button.tsx

# If it shows Button.tsx (uppercase), rename it:
mv components/ui/Button.tsx components/ui/button.tsx
```

### Step 4: Install Dependencies (if needed)
```bash
# Next.js build requires devDependencies for TypeScript types
npm install
```

### Step 5: Rebuild
```bash
# Clean previous build
rm -rf .next

# Build
npm run build
```

### Step 6: Restart PM2
```bash
pm2 restart darulquran-frontend
```

### Step 7: Check Status
```bash
pm2 status
pm2 logs darulquran-frontend --lines 20
```

---

## Quick Deployment Script (Server)

Create this script on your server for future updates:

```bash
#!/bin/bash
# File: /var/www/darulquran-frontend/darul-quran-foundation-frontend/deploy.sh

set -e

echo "🚀 Starting deployment..."

cd /var/www/darulquran-frontend/darul-quran-foundation-frontend

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies (including devDependencies for TypeScript types)
echo "📦 Installing dependencies..."
npm install

# Build
echo "🔨 Building application..."
rm -rf .next
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart darulquran-frontend

echo "✅ Deployment complete!"
pm2 status
```

Make it executable:
```bash
chmod +x deploy.sh
```

Usage:
```bash
./deploy.sh
```

---

## Troubleshooting

### If git pull fails with conflicts:
```bash
# Backup current changes
git stash

# Pull again
git pull origin main

# Apply stashed changes if needed
git stash pop
```

### If build still fails:
```bash
# Clean everything
rm -rf .next node_modules package-lock.json

# Reinstall
npm install --production

# Rebuild
npm run build
```

### Check git remote:
```bash
git remote -v
```

### If you need to set up git on server:
```bash
cd /var/www/darulquran-frontend/darul-quran-foundation-frontend
git remote add origin <your-repo-url>
git pull origin main
```

---

## Verification Checklist

After deployment:
- [ ] `git pull` completed successfully
- [ ] `button.tsx` is lowercase (not `Button.tsx`)
- [ ] `npm run build` completes without errors
- [ ] PM2 shows application as "online"
- [ ] Website loads at `https://darulquranfoundation.org`
- [ ] No console errors in browser
- [ ] Key pages work (donation, programs, gallery, notice)

