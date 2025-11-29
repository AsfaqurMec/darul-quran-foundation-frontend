# Build Troubleshooting Guide

## Issue: Module not found - Can't resolve button component

### Problem
The build is failing because it can't find the `button.tsx` component file.

### Root Causes
1. **Nested Directory Structure**: The error shows multiple lockfiles, suggesting files might be in a nested directory
2. **Missing Files**: The `components/ui/button.tsx` file might not have been uploaded to the server
3. **Wrong Working Directory**: You might be building from the wrong directory

---

## Solution Steps

### Step 1: Verify Your Current Directory

```bash
# Check where you are
pwd

# You should be in: /var/www/darulquran-frontend
# If you see a nested directory like darul-quran-foundation-frontend, navigate to it:
cd /var/www/darulquran-frontend/darul-quran-foundation-frontend
# OR move files up one level (see Step 2)
```

### Step 2: Check File Structure

```bash
# Check if button.tsx exists
ls -la components/ui/button.tsx

# If it doesn't exist, check if components/ui exists
ls -la components/ui/

# List all files to see structure
ls -la
```

### Step 3: Fix Nested Directory Issue (if applicable)

If your files are in a nested directory:

```bash
# Option A: Move files up one level
cd /var/www/darulquran-frontend
mv darul-quran-foundation-frontend/* .
mv darul-quran-foundation-frontend/.* . 2>/dev/null || true
rmdir darul-quran-foundation-frontend

# Option B: Build from nested directory
cd /var/www/darulquran-frontend/darul-quran-foundation-frontend
npm run build
```

### Step 4: Verify All Files Are Present

```bash
# Check critical files exist
test -f components/ui/button.tsx && echo "✅ button.tsx exists" || echo "❌ button.tsx missing"
test -f package.json && echo "✅ package.json exists" || echo "❌ package.json missing"
test -f next.config.js && echo "✅ next.config.js exists" || echo "❌ next.config.js missing"
test -d node_modules && echo "✅ node_modules exists" || echo "❌ node_modules missing - run npm install"
```

### Step 5: Clean and Rebuild

```bash
# Remove build artifacts
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

# Reinstall dependencies
npm install --production

# Rebuild
npm run build
```

### Step 6: If Files Are Missing - Re-upload

If the `components/ui/button.tsx` file is missing, you need to upload it:

```bash
# From your local machine, use SCP to upload the file
scp components/ui/button.tsx root@your-server-ip:/var/www/darulquran-frontend/components/ui/

# Or upload the entire components directory
scp -r components root@your-server-ip:/var/www/darulquran-frontend/
```

---

## Quick Fix Script

Run this script on your server to diagnose and fix common issues:

```bash
#!/bin/bash

echo "🔍 Diagnosing build issues..."

# Check current directory
echo "Current directory: $(pwd)"

# Check for nested directory
if [ -d "darul-quran-foundation-frontend" ]; then
    echo "⚠️  Nested directory detected!"
    echo "Files are in: darul-quran-foundation-frontend/"
    echo "Either move files up or build from nested directory"
fi

# Check if button.tsx exists
if [ -f "components/ui/button.tsx" ]; then
    echo "✅ button.tsx found"
else
    echo "❌ button.tsx NOT FOUND"
    echo "Searching for button files..."
    find . -name "*button*" -type f 2>/dev/null
fi

# Check node_modules
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "❌ node_modules missing - run: npm install"
fi

# Check package.json
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json NOT FOUND"
fi

echo ""
echo "📋 Recommended actions:"
echo "1. Ensure you're in the correct directory"
echo "2. Verify all files are uploaded"
echo "3. Run: npm install --production"
echo "4. Run: npm run build"
```

---

## Common Solutions

### Solution 1: Ensure You're in the Right Directory

```bash
# Navigate to project root
cd /var/www/darulquran-frontend

# If files are nested, either:
# A) Move them up
# B) Build from nested directory
```

### Solution 2: Re-upload Missing Files

If files are missing, re-upload from your local machine:

```bash
# From local machine (Windows PowerShell or Git Bash)
scp -r components root@your-server-ip:/var/www/darulquran-frontend/
```

### Solution 3: Use Git to Sync Files

If you're using Git:

```bash
# On server
cd /var/www/darulquran-frontend
git pull origin main
npm install --production
npm run build
```

### Solution 4: Check File Permissions

```bash
# Ensure files are readable
chmod -R 755 components/
chmod 644 components/ui/button.tsx
```

---

## Verification Commands

After fixing, verify everything works:

```bash
# 1. Check file exists
ls -la components/ui/button.tsx

# 2. Check TypeScript can resolve it
npx tsc --noEmit --skipLibCheck

# 3. Try building
npm run build
```

---

## If Problem Persists

1. **Check the exact error message** - it will tell you which file is missing
2. **Verify file paths** - Linux is case-sensitive, so `Button.tsx` ≠ `button.tsx`
3. **Check for symlinks** - make sure there are no broken symlinks
4. **Verify Git repository** - if using Git, make sure all files are committed and pushed

---

## Next Steps After Fix

Once the build succeeds:

1. Start the application: `pm2 start ecosystem.config.js`
2. Verify it's running: `pm2 status`
3. Check logs: `pm2 logs darulquran-frontend`
4. Test the website: Visit `https://darulquranfoundation.org`

