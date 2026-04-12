#!/bin/bash
# OPC Learning Hub - Quick Deploy to Vercel Script

echo "======================================"
echo "OPC Learning Hub - Vercel Deployment"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found"
    echo "Installing Vercel CLI..."
    npm i -g vercel
fi

echo "✅ Vercel CLI found"
echo ""

# Check if logged in
echo "Checking Vercel login status..."
vercel whoami 2>/dev/null
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Not logged in to Vercel"
    echo "Please login first:"
    vercel login
    echo ""
fi

echo ""
echo "======================================"
echo "Starting Deployment..."
echo "======================================"
echo ""

# Deploy to Vercel
echo "This will deploy your frontend to Vercel."
echo "Your app will use MOCK DATA (no backend connection)."
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "🚀 Deploying to Vercel..."
echo ""

# Deploy
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ Deployment Successful!"
    echo "======================================"
    echo ""
    echo "Your app is now live on Vercel!"
    echo ""
    echo "Next steps:"
    echo "1. Visit your deployment URL above"
    echo "2. Test all features (will use mock data)"
    echo "3. To connect to backend, see DEPLOYMENT_GUIDE.md"
    echo ""
else
    echo ""
    echo "======================================"
    echo "❌ Deployment Failed"
    echo "======================================"
    echo ""
    echo "Please check the error messages above."
    echo "Common issues:"
    echo "- Not logged in to Vercel (run: vercel login)"
    echo "- Build errors (run: npm run build)"
    echo "- Network issues"
    echo ""
fi
