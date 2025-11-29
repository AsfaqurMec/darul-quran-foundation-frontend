#!/bin/bash

# Script to fix build issues on CentOS server
# Run this on your VPS server

echo "🔍 Checking file structure..."

# Check if button.tsx exists
if [ -f "components/ui/button.tsx" ]; then
    echo "✅ button.tsx exists"
else
    echo "❌ button.tsx NOT FOUND!"
    echo "Current directory: $(pwd)"
    echo "Looking for button.tsx..."
    find . -name "button.tsx" -o -name "Button.tsx" 2>/dev/null
    exit 1
fi

# Check for nested directory issue
if [ -d "darul-quran-foundation-frontend" ]; then
    echo "⚠️  Warning: Nested directory detected!"
    echo "You might be in the wrong directory."
    echo "Current structure:"
    ls -la
fi

# Check if components/ui directory exists
if [ ! -d "components/ui" ]; then
    echo "❌ components/ui directory NOT FOUND!"
    exit 1
fi

# List all files in components/ui
echo "📁 Files in components/ui:"
ls -la components/ui/

echo ""
echo "✅ File structure check complete"

