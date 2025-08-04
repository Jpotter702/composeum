# Docker Deployment Guide

This document covers how to deploy Composeum using Docker and Docker Compose - because a Docker Compose library should definitely run on Docker Compose!

## Quick Start

### Production Deployment
```bash
# Build and run in production mode
docker-compose up -d

# Access the application
open http://localhost:3000
```

### Development Mode
```bash
# Run in development mode with hot reloading
docker-compose -f docker-compose.dev.yml up

# Access the development server
open http://localhost:5173
```

## Available Configurations

### 1. Production Setup (`docker-compose.yml`)
- **Multi-stage build** with Node.js and Nginx
- **Optimized static files** served by Nginx
- **Production-ready** with security headers and caching
- **Optional Traefik** reverse proxy for advanced setups
- **Accessible at**: `http://localhost:3000`

### 2. Development Setup (`docker-compose.dev.yml`)
- **Hot reloading** for development
- **Volume mounting** for live code changes
- **Vite dev server** with fast refresh
- **Accessible at**: `http://localhost:5173`

### 3. Production with Reverse Proxy
```bash
# Run with Traefik reverse proxy
docker-compose --profile production up -d

# Access Traefik dashboard
open http://localhost:8080

# Access application through Traefik
open http://localhost
```

## Detailed Setup

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+
- 2GB free disk space (for builds)

### Environment Variables
Create a `.env` file for customization:

```env
# Application settings
NODE_ENV=production
COMPOSEUM_PORT=3000
COMPOSEUM_HOST=localhost

# Traefik settings (optional)
TRAEFIK_DASHBOARD_PORT=8080
TRAEFIK_WEB_PORT=80

# Custom branding (if implemented)
VITE_APP_TITLE="My Docker Library"
VITE_APP_DESCRIPTION="Custom Docker Compose configurations"
```

### Production Deployment Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jpotter702/composeum.git
   cd composeum
   ```

2. **Create environment file** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Build and start**
   ```bash
   docker-compose up -d
   ```

4. **Verify deployment**
   ```bash
   docker-compose ps
   curl http://localhost:3000
   ```

### Development Workflow

1. **Start development environment**
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. **Make changes to your code**
   - Files are mounted as volumes
   - Changes auto-reload in the browser
   - Fast development cycle

3. **View logs**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

## Architecture

### Production Build Process
```
Source Code → Node.js Build → Static Files → Nginx → Port 3000
```

### Multi-stage Dockerfile Benefits
- **Smaller image size**: Only production files in final image
- **Security**: No source code or build tools in production
- **Performance**: Optimized Nginx serving static files
- **Caching**: Efficient Docker layer caching

### Network Architecture
```
Internet → Docker Host (Port 3000) → composeum-network → composeum-app (Port 80)
```

With Traefik:
```
Internet → Traefik (Port 80) → composeum-network → composeum-app (Port 80)
```

## Customization

### Custom Domain
Update `docker-compose.yml` Traefik labels:
```yaml
labels:
  - "traefik.http.routers.composeum.rule=Host(`your-domain.com`)"
```

### HTTPS with Let's Encrypt
Add to Traefik service:
```yaml
command:
  - "--certificatesresolvers.letsencrypt.acme.email=your-email@domain.com"
  - "--certificatesresolvers.letsencrypt.acme.storage=/acme.json"
  - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
labels:
  - "traefik.http.routers.composeum.tls.certresolver=letsencrypt"
```

### Custom Port
Change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Access on port 8080 instead
```

### Resource Limits
Add resource constraints:
```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
    reservations:
      memory: 256M
      cpus: '0.25'
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :3000

# Use different port
docker-compose up -d --scale composeum=1 -p 3001:80
```

#### Build Fails
```bash
# Clean build with no cache
docker-compose build --no-cache

# Check build logs
docker-compose build composeum
```

#### Container Won't Start
```bash
# Check container logs
docker-compose logs composeum

# Check container status
docker-compose ps
```

#### File Permission Issues (Linux)
```bash
# Fix ownership issues
sudo chown -R $USER:$USER .
```

### Performance Optimization

#### Enable BuildKit
```bash
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
```

#### Optimize Build Context
Add to `.dockerignore`:
```
node_modules
.git
.github
*.md
.env*
docker-compose*.yml
```

## Monitoring

### Health Checks
Add to your `docker-compose.yml`:
```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 30s
```

### Log Management
```bash
# View logs
docker-compose logs -f composeum

# Limit log size
docker-compose up -d --log-opt max-size=10m --log-opt max-file=3
```

### Resource Usage
```bash
# Monitor resource usage
docker stats composeum-app

# Detailed container info
docker inspect composeum-app
```

## Production Deployment

### VPS/Server Deployment
1. **Setup Docker on server**
2. **Clone repository**
3. **Configure domain/SSL**
4. **Run with production profile**

### Docker Swarm (Multi-node)
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml composeum-stack
```

### Kubernetes Migration
For Kubernetes deployment, consider:
- Converting compose to K8s manifests
- Using Helm charts
- Setting up ingress controllers

## Maintenance

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Clean up old images
docker system prune -f
```

### Backups
```bash
# Backup configuration
tar -czf composeum-backup.tar.gz docker-compose*.yml nginx.conf Dockerfile*

# Backup data (if using volumes)
docker run --rm -v composeum_data:/data -v $(pwd):/backup alpine tar czf /backup/data-backup.tar.gz /data
```

---

🎉 **Congratulations!** You now have Composeum running in Docker - a Docker Compose library running on Docker Compose! Very meta! 🐳
