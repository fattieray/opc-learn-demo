# 🐳 OPC Learning Hub - Docker 部署指南

## 📚 学习目标

通过这个部署过程，你将学到：
- ✅ Docker 和 Docker Compose 的使用
- ✅ 多阶段构建优化镜像大小
- ✅ 容器化前后端应用
- ✅ Nginx 反向代理配置
- ✅ 容器网络和数据卷管理
- ✅ 生产环境部署最佳实践

---

## 🏗️ 架构说明

```
┌──────────────────────────────────────────┐
│          腾讯云服务器                     │
│                                          │
│  ┌────────┐                              │
│  │ Nginx  │ 端口 80                      │
│  │ :80    │                              │
│  └───┬────┘                              │
│      │                                   │
│  ┌───┴────────────┐                     │
│  │                │                     │
│  ▼                ▼                     │
│ ┌──────┐    ┌──────────┐               │
│ │前端   │    │ 后端      │               │
│ │:3000 │    │ :9000    │               │
│ └──────┘    └────┬─────┘               │
│                  │                      │
│             ┌────┴────┐                │
│             │ SQLite  │                │
│             │ 数据卷   │                │
│             └─────────┘                │
└──────────────────────────────────────────┘
```

---

## 🚀 部署步骤

### 步骤 1: 在本地构建 Docker 镜像

在你的 **Mac 终端**运行：

```bash
# 进入项目目录
cd "/Users/xangwei/Documents/10-工作文件夹/OpenCode/OPC Learning Hub/opc-learn-demo"

# 构建前端镜像
docker build -t opc-frontend:latest .

# 构建后端镜像
docker build -t opc-backend:latest -f backend/Dockerfile .

# 查看镜像
docker images | grep opc
```

### 步骤 2: 保存镜像为文件

```bash
# 保存镜像到文件
docker save opc-frontend:latest opc-backend:latest > /tmp/opc-images.tar

# 查看文件大小
ls -lh /tmp/opc-images.tar
```

### 步骤 3: 上传到服务器

```bash
# 上传镜像文件
scp /tmp/opc-images.tar root@124.221.40.35:/tmp/

# 上传 docker-compose.yml 和 nginx.conf
scp docker-compose.yml nginx.conf root@124.221.40.35:/opt/opc-learn/
```

### 步骤 4: 在服务器上加载镜像并启动

**在服务器终端**运行：

```bash
# 加载 Docker 镜像
docker load < /tmp/opc-images.tar

# 进入部署目录
cd /opt/opc-learn

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 步骤 5: 初始化数据库

```bash
# 等待服务启动（30 秒）
sleep 30

# 初始化数据库
curl -X POST http://localhost:9000/api/v1/seed

# 测试访问
curl http://localhost/
```

---

## 📊 常用 Docker 命令

### 查看服务状态

```bash
# 查看所有容器
docker-compose ps

# 查看容器资源使用
docker stats
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f nginx
```

### 重启服务

```bash
# 重启所有服务
docker-compose restart

# 重启单个服务
docker-compose restart frontend
```

### 停止服务

```bash
# 停止所有服务
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

### 更新应用

```bash
# 1. 在本地重新构建镜像
docker build -t opc-frontend:latest .
docker build -t opc-backend:latest -f backend/Dockerfile .

# 2. 保存并上传
docker save opc-frontend:latest opc-backend:latest > /tmp/opc-images.tar
scp /tmp/opc-images.tar root@124.221.40.35:/tmp/

# 3. 在服务器上加载并重启
ssh root@124.221.40.35
docker load < /tmp/opc-images.tar
cd /opt/opc-learn
docker-compose up -d
```

---

## 🔧 故障排查

### 服务无法启动

```bash
# 查看详细日志
docker-compose logs

# 检查端口占用
netstat -tulpn | grep -E '80|3000|9000'

# 检查 Docker 状态
docker info
systemctl status docker
```

### 前端无法访问

```bash
# 检查前端容器
docker-compose logs frontend

# 进入容器调试
docker exec -it opc-frontend sh
```

### 后端 API 错误

```bash
# 检查后端容器
docker-compose logs backend

# 测试后端 API
curl http://localhost:9000/health
curl http://localhost:9000/docs
```

---

## 📝 配置文件说明

### Dockerfile（前端）

- **多阶段构建**：第一阶段构建，第二阶段运行
- **优化镜像大小**：只包含运行时需要的文件
- **环境变量**：通过 build args 传递 API URL

### Dockerfile（后端）

- **Python 3.11 slim**：轻量级基础镜像
- **依赖缓存**：先安装依赖，再复制代码
- **数据持久化**：数据库文件存储在卷中

### docker-compose.yml

- **服务编排**：前端、后端、Nginx 三个服务
- **网络隔离**：使用自定义网络
- **数据卷**：持久化数据库
- **自动重启**：除非手动停止

### nginx.conf

- **反向代理**：将请求转发到前端和后端
- **负载均衡**：可以扩展多个实例
- **静态缓存**：优化静态资源加载

---

## 🎓 学习要点

### 1. Docker 基础概念

- **镜像（Image）**：应用的打包模板
- **容器（Container）**：镜像的运行实例
- **数据卷（Volume）**：持久化数据
- **网络（Network）**：容器间通信

### 2. Docker Compose

- **服务定义**：声明式配置多个容器
- **依赖管理**：控制启动顺序
- **环境隔离**：不同环境使用不同配置

### 3. 多阶段构建

```dockerfile
# 第一阶段：构建
FROM node:18 AS builder
RUN npm install && npm run build

# 第二阶段：运行
FROM node:18-alpine
COPY --from=builder /app/dist ./
```

### 4. 生产环境最佳实践

- ✅ 使用具体版本标签（不用 latest）
- ✅ 最小化镜像大小（用 alpine/slim）
- ✅ 非 root 用户运行
- ✅ 健康检查
- ✅ 日志管理
- ✅ 资源限制

---

## 💡 进阶学习

### 添加 HTTPS

```bash
# 使用 Let's Encrypt
docker run -it --rm \
  -v /etc/letsencrypt:/etc/letsencrypt \
  certbot/certbot certonly \
  --standalone -d your-domain.com
```

### 添加监控

```yaml
# docker-compose.yml 添加
services:
  monitoring:
    image: grafana/grafana
    ports:
      - "3001:3000"
```

### 自动化部署

```bash
# 创建 deploy.sh
#!/bin/bash
docker-compose pull
docker-compose up -d
docker system prune -f
```

---

## 🎯 下一步

1. ✅ 完成 Docker 部署
2. ✅ 学习 Docker 命令
3. ✅ 理解容器架构
4. ✅ 实践更新和回滚
5. ✅ 添加监控和日志
6. ✅ 配置 CI/CD 自动化

---

**准备好了吗？从"步骤 1"开始！** 🚀
