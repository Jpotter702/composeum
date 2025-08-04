# Composeum - Docker Compose Library v1.0

[![GitHub release](https://img.shields.io/github/release/jpotter702/composeum.svg)](https://github.com/jpotter702/composeum/releases)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jpotter702/composeum)
[![Use this template](https://img.shields.io/badge/Use%20this-Template-blue?logo=github)](https://github.com/jpotter702/composeum/generate)

A modern, curated collection of reusable Docker Compose configurations for developers. Quickly find, copy, and deploy popular development stacks with ease.

> 🎯 **Ready to use as a starter template!** See our [Deployment Guide](DEPLOYMENT.md) for multiple ways to get started.

## 🌟 Features

- **Curated Collection**: Hand-picked Docker Compose configurations for popular development stacks
- **Easy Search & Filter**: Find configurations by category, tags, or technology
- **One-Click Copy**: Copy Docker Compose files directly to your clipboard
- **Beautiful UI**: Modern, responsive interface built with React and Tailwind CSS
- **Categories Include**:
  - 🗄️ Databases (PostgreSQL, MySQL, MongoDB, Redis)
  - 🌐 Web Servers (Nginx, Apache)
  - 📊 Monitoring (Prometheus + Grafana, ELK Stack)
  - 🔄 CI/CD (Jenkins)
  - 📨 Message Queues (RabbitMQ, Apache Kafka)
  - 💾 Storage (MinIO)
  - 🛠️ Development Tools

## 🚀 Getting Started

### Quick Start Options

| Method | Best For | One-Click Deploy |
|--------|----------|------------------|
| **[Use as Template](https://github.com/jpotter702/composeum/generate)** | Your own library | [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jpotter702/composeum) |
| **[Fork Repository](https://github.com/jpotter702/composeum/fork)** | Contributing back | Manual setup |
| **Clone & Customize** | Complete control | Manual setup |

📖 **Detailed Instructions**: See our comprehensive [Deployment Guide](DEPLOYMENT.md)

### Live Demo
Visit the live application: [Composeum Demo](https://your-vercel-url.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpotter702/composeum.git
   cd composeum
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Quick Development Setup

```bash
# Clone (or use template/fork)
git clone https://github.com/jpotter702/composeum.git
cd composeum

# Install dependencies
npm install  # or pnpm install

# Start development server
npm run dev  # or pnpm dev
```

### 🚀 Deploy Anywhere

- **Vercel**: One-click deploy with the button above
- **Netlify**: `npm run build` → upload `dist/` folder
- **GitHub Pages**: See [Deployment Guide](DEPLOYMENT.md)
- **Other platforms**: Standard static site deployment

📋 **Full deployment instructions**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 📁 Project Structure

```
composeum/
├── public/
│   ├── assets/
│   │   └── thumbnails/     # Service thumbnails
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   ├── ComposeCard.jsx # Main card component
│   │   └── ...
│   ├── data/
│   │   └── sampleData.js   # Docker Compose configurations
│   ├── lib/
│   │   └── utils.js        # Utility functions
│   └── App.jsx
├── vercel.json             # Vercel deployment config
└── package.json
```

## 🎨 Available Configurations

### Databases
- **PostgreSQL + pgAdmin** - Complete database setup with web interface
- **MySQL + phpMyAdmin** - MySQL with administration interface
- **MongoDB Replica Set** - High-availability MongoDB cluster
- **Redis Cache** - High-performance caching solution

### Web Servers
- **Nginx Reverse Proxy** - SSL termination and load balancing
- **Apache HTTP Server** - Traditional web server setup

### Monitoring & Observability
- **Prometheus + Grafana** - Complete metrics and visualization stack
- **ELK Stack** - Elasticsearch, Logstash, and Kibana for log analysis

### Development Tools
- **Node.js Development** - Hot reload and debugging setup
- **Jenkins CI/CD** - Continuous integration and deployment

### Message Queues
- **RabbitMQ** - Reliable message broker with management interface
- **Apache Kafka** - Distributed streaming platform

### Storage
- **MinIO** - S3-compatible object storage

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-compose-config
   ```
3. **Add your Docker Compose configuration**
   - Add the configuration to `src/data/sampleData.js`
   - Include a thumbnail image in `public/assets/thumbnails/`
   - Follow the existing data structure
4. **Commit your changes**
   ```bash
   git commit -m "Add new Docker Compose configuration for [service]"
   ```
5. **Push and create a Pull Request**

### Adding New Configurations

When adding new Docker Compose configurations, please ensure:

- **Complete Setup**: Include all necessary services and dependencies
- **Environment Variables**: Use sensible defaults for development
- **Documentation**: Add clear descriptions and usage notes
- **Security**: Use secure default passwords (document them clearly)
- **Best Practices**: Follow Docker Compose best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Docker](https://docker.com) for containerization technology
- [React](https://reactjs.org) for the amazing frontend library
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Radix UI](https://radix-ui.com) for accessible component primitives
- [Vercel](https://vercel.com) for seamless deployment

## 📞 Support

If you have questions or need help:

- Open an [issue](https://github.com/jpotter702/composeum/issues) on GitHub
- Start a [discussion](https://github.com/jpotter702/composeum/discussions)

---

Made with ❤️ for the developer community. Happy containerizing! 🐳
