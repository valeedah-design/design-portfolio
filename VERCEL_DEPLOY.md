# Vercel Deployment Guide for Valeed's Portfolio

This guide will help you deploy your portfolio website to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier works great!)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for command-line deployment)
3. MongoDB Atlas account for your database

## Project Structure

```
/app/
├── frontend/           # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/         # Generated after build
├── api/               # Serverless API functions
│   ├── health.py      # Health check endpoint
│   ├── status.py      # Status check endpoints
│   └── requirements.txt
├── vercel.json        # Vercel configuration
└── VERCEL_DEPLOY.md   # This file
```

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Configure Environment Variables**
   
   In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `MONGO_URL` | Your MongoDB connection string | Production, Preview, Development |
   | `DB_NAME` | Your database name (e.g., `portfolio_db`) | Production, Preview, Development |
   | `REACT_APP_BACKEND_URL` | Your Vercel project URL (e.g., `https://your-project.vercel.app`) | Production, Preview, Development |

   **Important:** 
   - For `MONGO_URL`, use MongoDB Atlas connection string (not localhost)
   - For `REACT_APP_BACKEND_URL`, after first deployment, update this with your actual Vercel URL

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /app
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N` (first time) or `Y` (subsequent deploys)
   - What's your project's name: `valeedah-portfolio` (or your choice)
   - In which directory is your code located: `./`

5. **Set Environment Variables**
   ```bash
   vercel env add MONGO_URL
   vercel env add DB_NAME
   vercel env add REACT_APP_BACKEND_URL
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Custom Domain Setup (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `valeedah.com`)
3. Follow Vercel's instructions to update your DNS records
4. Wait for DNS propagation (usually 5-30 minutes)
5. SSL certificate will be automatically provisioned

## MongoDB Atlas Setup

If you don't have MongoDB Atlas set up:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (Database Access)
4. Whitelist Vercel's IP ranges:
   - Go to Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - **Important:** This is necessary for Vercel's serverless functions
5. Get your connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

## Environment Variables Reference

### MONGO_URL
Your MongoDB Atlas connection string
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

### DB_NAME
Your database name
```
portfolio_db
```

### REACT_APP_BACKEND_URL
Your Vercel deployment URL (update after first deployment)
```
https://your-project.vercel.app
```

## Updating Your Deployment

### Automatic Deployments (GitHub Integration)
Once connected to GitHub, Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

### Manual Deployments
```bash
vercel --prod
```

## Vercel Serverless Functions

The API endpoints are deployed as serverless functions:

- `/api/health` - Health check endpoint
- `/api/status` - GET: Retrieve status checks, POST: Create status check

Each Python file in `/api` becomes a serverless function endpoint.

## Troubleshooting

### Build Fails
1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify `vercel.json` configuration

### API Not Working
1. Verify environment variables are set correctly
2. Check function logs in Vercel Dashboard → Your Project → Functions
3. Ensure MongoDB connection string is correct
4. Verify MongoDB Atlas allows connections from 0.0.0.0/0

### Frontend Not Loading
1. Check that `REACT_APP_BACKEND_URL` points to your Vercel URL
2. Verify build output directory is `frontend/build`
3. Check browser console for errors

### CORS Errors
1. Verify CORS headers in `vercel.json`
2. Check that API functions return proper CORS headers
3. Ensure `REACT_APP_BACKEND_URL` matches your deployment URL

## Monitoring & Analytics

Vercel provides built-in:
- **Analytics**: Track page views and Web Vitals
- **Logs**: View function execution logs
- **Speed Insights**: Monitor performance

Access these in Vercel Dashboard → Your Project

## Cost

Vercel's **Hobby (Free) plan** includes:
- Unlimited deployments
- Automatic HTTPS/SSL
- 100 GB bandwidth/month
- 100 hours serverless function execution/month
- Preview deployments for every push

This is more than enough for a portfolio website!

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure environment variables
3. ✅ Set up MongoDB Atlas
4. ✅ Test all functionality
5. ✅ (Optional) Add custom domain
6. ✅ (Optional) Set up analytics

Your portfolio is now live on Vercel! 🎉
