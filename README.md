# Valeed's Portfolio Website

A modern, responsive portfolio website with dual theme support (Dark Matrix & Light Olive) built with React and deployed on Vercel.

## 🌟 Features

- **Dual Theme Support**: Toggle between Dark Matrix mode and Light Olive mode
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Animations**: Matrix-style greeting animation, smooth transitions
- **Multi-language Support**: Greeting in Italian, Arabic, Hindi, Malayalam, and English
- **Portfolio Showcase**: App Designs, App Icons, and Web Design sections
- **Services Section**: Animated SVG icons showcasing services
- **Contact Section**: Interactive mouse trail drawing effect
- **Works Gallery**: Tabbed navigation with project showcases

## 🚀 Quick Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

### Manual Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

## 📋 Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | Database name | `portfolio_db` |
| `REACT_APP_BACKEND_URL` | Your Vercel URL | `https://your-project.vercel.app` |

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **Lucide React** - Icons
- **Custom CSS** - Styling with animations

### Backend
- **Vercel Serverless Functions** - Python-based API
- **MongoDB Atlas** - Database
- **PyMongo** - MongoDB driver

### Deployment
- **Vercel** - Hosting & deployment
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
/app/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js        # Main app component
│   │   └── index.css     # Global styles
│   ├── public/           # Static assets
│   └── package.json      # Dependencies
├── api/                  # Vercel serverless functions
│   ├── health.py         # Health check endpoint
│   ├── status.py         # Status management
│   ├── index.py          # API root
│   └── requirements.txt  # Python dependencies
├── vercel.json           # Vercel configuration
├── VERCEL_DEPLOY.md      # Detailed deployment guide
└── README.md             # This file
```

## 🎨 Theme Customization

The website supports two themes:

### Dark Mode (Matrix Theme)
- Pure black background (`#000000`)
- Bright lime green accents (`#00FF00`)
- Monospace fonts ("Share Tech Mono")

### Light Mode (Olive Theme)
- Cream background (`#FFFEF5`)
- Olive green palette (`#6B8E23` and variations)
- Natural, earthy aesthetics

Themes can be toggled using the button in the top-right corner.

## 📱 API Endpoints

- `GET /api/` - API information
- `GET /api/health` - Health check
- `GET /api/status` - Get all status checks
- `POST /api/status` - Create new status check

## 🧪 Local Development

```bash
# Install dependencies
cd frontend
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

## 📝 Detailed Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOY.md) - Complete deployment instructions
- [Environment Setup](.env.example) - Environment variable examples

## 🌐 Live Demo

- **Preview**: https://work-gallery-139.preview.emergentagent.com
- **Production**: https://valeedah.com

## 📄 License

This project is personal portfolio of Valeed.

## 🤝 Contact

- **Email**: valeedah@gmail.com
- **Location**: Napoli, Italy

## 🙏 Acknowledgments

Built with ❤️ using React, Vercel, and MongoDB Atlas.

---

**Ready to deploy?** Read the [Vercel Deployment Guide](./VERCEL_DEPLOY.md) for step-by-step instructions!
