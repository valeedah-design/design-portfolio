#!/bin/bash

echo "🚀 Valeed's Portfolio - Vercel Deployment Setup"
echo "================================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI is already installed"
fi

echo ""
echo "📋 Deployment Checklist:"
echo ""
echo "1. ✅ Code is ready for Vercel deployment"
echo "2. ⚠️  Set up MongoDB Atlas (if not done)"
echo "3. ⚠️  Configure environment variables in Vercel"
echo "4. ⚠️  Deploy to Vercel"
echo ""

read -p "Do you want to deploy now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting deployment..."
    echo ""
    
    # Login to Vercel
    vercel login
    
    echo ""
    echo "⚙️  Deploying..."
    vercel --prod
    
    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Update REACT_APP_BACKEND_URL in Vercel with your deployment URL"
    echo "2. Set MONGO_URL and DB_NAME in Vercel Dashboard"
    echo "3. Redeploy if environment variables were added"
    echo ""
else
    echo ""
    echo "📚 To deploy later, run: vercel --prod"
    echo "📖 Read VERCEL_DEPLOY.md for detailed instructions"
    echo ""
fi
