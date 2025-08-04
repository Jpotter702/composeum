# 🚀 Deployment Guide - Composeum v1

This guide covers multiple ways to deploy and use Composeum as a starter template for your own Docker Compose library.

## 📋 Table of Contents

- [Quick Start Options](#quick-start-options)
- [Docker Compose Deployment](#docker-compose-deployment-recommended)
- [Method 1: Use as GitHub Template](#method-1-use-as-github-template-recommended)
- [Method 2: Fork the Repository](#method-2-fork-the-repository)
- [Method 3: Clone and Customize](#method-3-clone-and-customize)
- [Local Development Setup](#local-development-setup)
- [Deployment Platforms](#deployment-platforms)
- [Environment Configuration](#environment-configuration)
- [Customization Guide](#customization-guide)

## 🎯 Quick Start Options

Choose the method that best fits your needs:

| Method | Best For | Maintains Connection | Easy Updates |
|--------|----------|---------------------|--------------|
| **🐳 Docker** | Production deployment | N/A | ✅ |
| **Template** | Creating your own library | ❌ | ❌ |
| **Fork** | Contributing back | ✅ | ✅ (via PR) |
| **Clone** | Complete customization | ❌ | ❌ |

## 🐳 Docker Compose Deployment (Recommended)

**Best for**: Production deployment, easy setup, containerized environment

Composeum supports Docker Compose deployment for both production and development environments. This is the fastest way to get Composeum running!

### Prerequisites
- Docker (20.10+)
- Docker Compose (2.0+)
- Git

### Production Deployment

**Step 1: Clone and Deploy**
```bash
# Clone the repository
git clone https://github.com/Jpotter702/composeum.git
cd composeum

# Start production deployment
docker-compose up -d

# Access the application
open http://localhost:3000
```

**What this does:**
- Builds the React application using multi-stage Docker build
- Serves the app via Nginx with optimized configuration
- Includes optional Traefik reverse proxy for production use
- Runs on port 3000 by default

**Step 2: Verify Deployment**
```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f composeum

# Stop the deployment
docker-compose down
```

### Development Deployment

**For development with hot reloading:**
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Access the development server
open http://localhost:5173

# View development logs
docker-compose -f docker-compose.dev.yml logs -f
```

**Development features:**
- Hot reloading for code changes
- Volume mounting for live file updates
- Development server with Vite
- Runs on port 5173 (Vite default)

### Advanced Production Setup

**With Traefik Reverse Proxy:**
```bash
# Start with Traefik for load balancing and SSL
docker-compose --profile production up -d

# Access via Traefik dashboard
open http://localhost:8080  # Traefik dashboard
open http://localhost       # Main application
```

**Custom Environment Variables:**
```bash
# Create environment file
echo 'NODE_ENV=production' > .env
echo 'COMPOSE_PROJECT_NAME=my-composeum' >> .env

# Deploy with custom config
docker-compose up -d
```

### Docker Deployment Commands

```bash
# Production deployment
docker-compose up -d                    # Start in background
docker-compose up                       # Start with logs
docker-compose down                     # Stop all services
docker-compose down -v                  # Stop and remove volumes

# Development deployment
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down

# Rebuild containers
docker-compose build --no-cache         # Force rebuild
docker-compose up -d --build            # Rebuild and start

# View logs
docker-compose logs                     # All logs
docker-compose logs -f composeum        # Follow specific service
docker-compose logs --tail=100          # Last 100 lines
```

### Customizing Docker Deployment

**Custom Ports:**
```yaml
# docker-compose.override.yml
version: '3.8'
services:
  composeum:
    ports:
      - "8080:80"  # Use port 8080 instead of 3000
```

**Custom Environment:**
```yaml
# docker-compose.override.yml
version: '3.8'
services:
  composeum:
    environment:
      - NODE_ENV=production
      - VITE_APP_TITLE=My Custom Library
```

**SSL/HTTPS Setup:**
See [DOCKER.md](DOCKER.md) for complete SSL configuration with Traefik.

### Troubleshooting Docker Deployment

**Common Issues:**

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Use different port
   docker-compose up -d -p 3001:80
   ```

2. **Permission errors**
   ```bash
   # Fix Docker permissions (Linux)
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Build failures**
   ```bash
   # Clean rebuild
   docker-compose down
   docker system prune -f
   docker-compose build --no-cache
   docker-compose up -d
   ```

4. **Container won't start**
   ```bash
   # Check logs for errors
   docker-compose logs composeum
   
   # Check container status
   docker-compose ps
   ```

### Docker Deployment Benefits

✅ **Consistent Environment**: Same setup across all machines  
✅ **Easy Scaling**: Add more containers with `docker-compose scale`  
✅ **Isolated Dependencies**: No conflicts with host system  
✅ **Production Ready**: Nginx + optimized React build  
✅ **Development Friendly**: Hot reload support  
✅ **Reverse Proxy Ready**: Optional Traefik integration  

📖 **For complete Docker documentation**: See [DOCKER.md](DOCKER.md)

## Method 1: Use as GitHub Template

**Best for**: Creating your own independent Docker Compose library

### Step 1: Create from Template
1. Visit the [Composeum repository](https://github.com/Jpotter702/composeum)
2. Click the **"Use this template"** button (green button near the top)
3. Select **"Create a new repository"**
4. Choose your repository name (e.g., `my-docker-library`)
5. Set visibility (Public/Private)
6. Click **"Create repository from template"**

### Step 2: Clone Your New Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Step 3: Install and Run
```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Step 4: Deploy to Vercel
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel

# Follow the prompts to link your project
```

## Method 2: Fork the Repository

**Best for**: Contributing improvements back to the original project

### Step 1: Fork on GitHub
1. Visit the [Composeum repository](https://github.com/jpotter702/composeum)
2. Click the **"Fork"** button (top right)
3. Choose your account/organization
4. Optionally rename the repository

### Step 2: Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/composeum.git
cd composeum

# Add upstream remote for updates
git remote add upstream https://github.com/Jpotter702/composeum.git
```

### Step 3: Keep Your Fork Updated
```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

## Method 3: Clone and Customize

**Best for**: Complete control and customization

### Step 1: Clone the Repository
```bash
git clone https://github.com/Jpotter702/composeum.git
cd composeum

# Remove original git history (optional)
rm -rf .git
git init
git add .
git commit -m "Initial commit from Composeum template"
```

### Step 2: Create New Repository
1. Create a new repository on GitHub
2. Add your new repository as origin:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Git

### Installation Steps
```bash
# 1. Navigate to your project directory
cd your-project-name

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Start development server
npm run dev
# or
pnpm dev

# 4. Build for production (optional)
npm run build
# or
pnpm build
```

### Development Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Deployment Platforms

### Vercel (Recommended)

#### Option A: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the interactive prompts
```

#### Option B: Deploy via GitHub Integration
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your repository
5. Configure project settings (auto-detected from `vercel.json`)
6. Click **"Deploy"**

#### Option C: Deploy Button (Add to your README)
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
dist

# Deploy
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## ⚙️ Environment Configuration

### Environment Variables
Create a `.env` file for local development:

```env
# .env
VITE_APP_TITLE="My Docker Library"
VITE_APP_DESCRIPTION="Custom Docker Compose configurations"
VITE_ANALYTICS_ID="your-analytics-id"
```

### Production Environment Variables

#### Vercel
Set via Vercel dashboard or CLI:
```bash
vercel env add VITE_APP_TITLE
vercel env add VITE_APP_DESCRIPTION
```

#### Netlify
Set via Netlify dashboard: **Site settings** → **Environment variables**

## 🎨 Customization Guide

### 1. Update Branding
```javascript
// src/data/siteConfig.js (create this file)
export const siteConfig = {
  name: "Your Library Name",
  description: "Your custom description",
  url: "https://your-domain.com",
  author: "Your Name",
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername"
  }
}
```

### 2. Add Your Docker Configurations
Edit `src/data/sampleData.js`:
```javascript
export const sampleComposes = [
  {
    id: 'your-service',
    title: 'Your Custom Service',
    description: 'Description of your service',
    category: 'your-category',
    tags: ['tag1', 'tag2'],
    author: 'Your Name',
    createdAt: '1 day ago',
    thumbnail: '/assets/thumbnails/your-service.png',
    dockerCompose: `version: '3.8'
services:
  your-service:
    image: your-image:latest
    ports:
      - "8080:8080"`
  },
  // ... add more configurations
]
```

### 3. Update Categories
```javascript
export const categories = [
  { id: 'all', name: 'All', count: 0 },
  { id: 'your-category', name: 'Your Category', count: 1 },
  // ... add your categories
]
```

### 4. Add Custom Thumbnails
1. Add images to `public/assets/thumbnails/`
2. Use format: `service-name.png`
3. Recommended size: 400x300px
4. Supported formats: PNG, JPG, WebP

### 5. Customize Styling
- Edit `src/index.css` for global styles
- Modify `tailwind.config.js` for theme customization
- Update component styles in individual component files

## 🏷️ Version Tagging

### Creating Releases
```bash
# Tag your first release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create subsequent releases
git tag -a v1.1.0 -m "Release v1.1.0 - Added new configurations"
git push origin v1.1.0
```

### Semantic Versioning
- **Major** (v2.0.0): Breaking changes
- **Minor** (v1.1.0): New features, backward compatible
- **Patch** (v1.0.1): Bug fixes, backward compatible

## 🔍 Troubleshooting

### Common Issues

#### Build Fails on Deployment
```bash
# Check Node.js version
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Thumbnails Not Loading
- Ensure images are in `public/assets/thumbnails/`
- Check file paths in `sampleData.js`
- Verify image formats are supported

#### Environment Variables Not Working
- Prefix with `VITE_` for client-side variables
- Restart development server after adding variables
- Check deployment platform environment settings

### Getting Help
- Check the [GitHub Issues](https://github.com/Jpotter702/composeum/issues)
- Review [GitHub Discussions](https://github.com/Jpotter702/composeum/discussions)
- Read the [main README](README.md)

## 📝 Next Steps

After successful deployment:

1. **Update README**: Customize with your project details
2. **Add Analytics**: Integrate Google Analytics or similar
3. **SEO Optimization**: Add meta tags and OpenGraph
4. **Custom Domain**: Configure custom domain in Vercel/Netlify
5. **Monitoring**: Set up error tracking (Sentry, LogRocket)
6. **Community**: Enable GitHub Discussions for community engagement

---

🎉 **Congratulations!** You now have your own Docker Compose library up and running. Happy containerizing!
