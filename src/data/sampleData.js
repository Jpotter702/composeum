export const sampleComposes = [
  {
    id: '1',
    title: 'PostgreSQL with pgAdmin',
    description: 'Complete PostgreSQL setup with pgAdmin web interface for database management and monitoring',
    category: 'databases',
    tags: ['postgresql', 'database', 'admin', 'sql'],
    author: 'John Doe',
    createdAt: '2 days ago',
    thumbnail: '/src/assets/thumbnails/postgresql-pgadmin.png',
    dockerCompose: `version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "8080:80"
    depends_on:
      - postgres

volumes:
  postgres_data:`
  },
  {
    id: '2',
    title: 'Nginx Reverse Proxy',
    description: 'Nginx configured as a reverse proxy with SSL termination and load balancing',
    category: 'web-servers',
    tags: ['nginx', 'proxy', 'ssl', 'load-balancer'],
    author: 'Jane Smith',
    createdAt: '1 week ago',
    thumbnail: '/src/assets/thumbnails/nginx-proxy.png',
    dockerCompose: `version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    restart: unless-stopped`
  },
  {
    id: '3',
    title: 'Redis Cache',
    description: 'Redis server with persistence and monitoring for high-performance caching',
    category: 'databases',
    tags: ['redis', 'cache', 'memory', 'nosql'],
    author: 'Mike Johnson',
    createdAt: '3 days ago',
    thumbnail: '/src/assets/thumbnails/redis-cache.png',
    dockerCompose: `version: '3.8'
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

volumes:
  redis_data:`
  },
  {
    id: '4',
    title: 'MongoDB Replica Set',
    description: 'MongoDB cluster with replica set configuration for high availability',
    category: 'databases',
    tags: ['mongodb', 'nosql', 'replica-set', 'cluster'],
    author: 'Sarah Wilson',
    createdAt: '5 days ago',
    thumbnail: '/src/assets/thumbnails/mongodb-replica.png',
    dockerCompose: `version: '3.8'
services:
  mongo1:
    image: mongo:6
    command: mongod --replSet rs0 --bind_ip_all
    ports:
      - "27017:27017"
    volumes:
      - mongo1_data:/data/db
  
  mongo2:
    image: mongo:6
    command: mongod --replSet rs0 --bind_ip_all
    ports:
      - "27018:27017"
    volumes:
      - mongo2_data:/data/db

volumes:
  mongo1_data:
  mongo2_data:`
  },
  {
    id: '5',
    title: 'Node.js Development Environment',
    description: 'Complete Node.js development setup with hot reload and debugging support',
    category: 'development',
    tags: ['nodejs', 'development', 'hot-reload', 'debugging'],
    author: 'Alex Chen',
    createdAt: '1 day ago',
    thumbnail: '/src/assets/thumbnails/nodejs-dev.png',
    dockerCompose: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "9229:9229"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev`
  },
  {
    id: '6',
    title: 'Prometheus & Grafana',
    description: 'Complete monitoring stack with Prometheus metrics collection and Grafana dashboards',
    category: 'monitoring',
    tags: ['prometheus', 'grafana', 'monitoring', 'metrics'],
    author: 'David Brown',
    createdAt: '1 week ago',
    thumbnail: '/src/assets/thumbnails/prometheus-grafana.png',
    dockerCompose: `version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
  
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  prometheus_data:
  grafana_data:`
  },
  {
    id: '7',
    title: 'Apache Kafka Cluster',
    description: 'Apache Kafka cluster with Zookeeper for distributed streaming platform',
    category: 'messaging',
    tags: ['kafka', 'zookeeper', 'streaming', 'messaging'],
    author: 'Lisa Garcia',
    createdAt: '4 days ago',
    thumbnail: '/src/assets/thumbnails/kafka-cluster.png',
    dockerCompose: `version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
  
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1`
  },
  {
    id: '8',
    title: 'Jenkins CI/CD',
    description: 'Jenkins automation server with Docker support for continuous integration',
    category: 'cicd',
    tags: ['jenkins', 'ci-cd', 'automation', 'docker'],
    author: 'Tom Anderson',
    createdAt: '6 days ago',
    thumbnail: '/src/assets/thumbnails/jenkins-cicd.png',
    dockerCompose: `version: '3.8'
services:
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false

volumes:
  jenkins_data:`
  },
  {
    id: '9',
    title: 'MinIO Object Storage',
    description: 'MinIO S3-compatible object storage with web console for file management',
    category: 'storage',
    tags: ['minio', 's3', 'object-storage', 'files'],
    author: 'Emma Davis',
    createdAt: '3 days ago',
    thumbnail: '/src/assets/thumbnails/minio-storage.png',
    dockerCompose: `version: '3.8'
services:
  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

volumes:
  minio_data:`
  },
  {
    id: '10',
    title: 'ELK Stack',
    description: 'Elasticsearch, Logstash, and Kibana for log analysis and visualization',
    category: 'monitoring',
    tags: ['elasticsearch', 'logstash', 'kibana', 'logging'],
    author: 'Robert Taylor',
    createdAt: '1 week ago',
    thumbnail: '/src/assets/thumbnails/elk-stack.png',
    dockerCompose: `version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
  
  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:`
  },
  {
    id: '11',
    title: 'MySQL with phpMyAdmin',
    description: 'MySQL database server with phpMyAdmin web interface for database management',
    category: 'databases',
    tags: ['mysql', 'phpmyadmin', 'database', 'sql'],
    author: 'Kevin Lee',
    createdAt: '2 days ago',
    thumbnail: '/src/assets/thumbnails/mysql-phpmyadmin.png',
    dockerCompose: `version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
  
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports:
      - "8080:80"
    environment:
      PMA_HOST: mysql
    depends_on:
      - mysql

volumes:
  mysql_data:`
  },
  {
    id: '12',
    title: 'RabbitMQ Message Broker',
    description: 'RabbitMQ message broker with management interface for reliable messaging',
    category: 'messaging',
    tags: ['rabbitmq', 'message-broker', 'amqp', 'queue'],
    author: 'Maria Rodriguez',
    createdAt: '4 days ago',
    thumbnail: '/src/assets/thumbnails/rabbitmq-broker.png',
    dockerCompose: `version: '3.8'
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

volumes:
  rabbitmq_data:`
  }
]

export const categories = [
  { id: 'all', name: 'All', count: 12 },
  { id: 'databases', name: 'Databases', count: 4 },
  { id: 'web-servers', name: 'Web Servers', count: 1 },
  { id: 'development', name: 'Development', count: 1 },
  { id: 'monitoring', name: 'Monitoring', count: 2 },
  { id: 'cicd', name: 'CI/CD', count: 1 },
  { id: 'messaging', name: 'Message Queues', count: 2 },
  { id: 'storage', name: 'Storage', count: 1 },
  { id: 'security', name: 'Security', count: 0 }
]

