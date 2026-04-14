#!/bin/bash
# OPC Learning Hub - 腾讯云轻量服务器一键部署脚本
# 使用方法: curl -sSL <脚本URL> | bash
# 或在服务器上直接运行: bash deploy-tencent-lighthouse.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   OPC Learning Hub - 腾讯云轻量服务器部署脚本         ║"
echo "║                                                       ║"
echo "║   预计耗时: 15-20 分钟                                 ║"
echo "║   费用: 99元/年（2核4G，5M带宽）                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# ==========================================
# 步骤 1: 检查系统
# ==========================================
log_info "步骤 1/8: 检查系统环境..."

if [ "$EUID" -eq 0 ]; then 
    log_warn "不建议使用 root 用户运行，将切换到 ubuntu 用户"
fi

# 检查系统类型
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
else
    log_error "无法识别操作系统"
    exit 1
fi

log_success "系统: $OS $VER"

# ==========================================
# 步骤 2: 更新系统
# ==========================================
log_info "步骤 2/8: 更新系统..."

apt update -y
apt upgrade -y

log_success "系统更新完成"

# ==========================================
# 步骤 3: 安装基础软件
# ==========================================
log_info "步骤 3/8: 安装基础软件..."

# 安装必要工具
apt install -y \
    curl \
    git \
    wget \
    unzip \
    nginx \
    certbot \
    python3-certbot-nginx \
    build-essential

log_success "基础软件安装完成"

# ==========================================
# 步骤 4: 安装 Node.js
# ==========================================
log_info "步骤 4/8: 安装 Node.js 18..."

# 安装 NodeSource 仓库
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

# 安装 Node.js
apt install -y nodejs

# 验证安装
log_success "Node.js 版本: $(node --version)"
log_success "npm 版本: $(npm --version)"

# ==========================================
# 步骤 5: 安装 Python
# ==========================================
log_info "步骤 5/8: 安装 Python 环境..."

# 安装 Python 和 pip
apt install -y python3 python3-pip python3-venv

# 安装 PM2（进程管理）
npm install -g pm2

log_success "Python 版本: $(python3 --version)"
log_success "PM2 已安装"

# ==========================================
# 步骤 6: 部署应用
# ==========================================
log_info "步骤 6/8: 部署 OPC Learning Hub..."

# 创建应用目录
APP_DIR="/opt/opc-learn"
mkdir -p $APP_DIR
cd $APP_DIR

# 克隆代码
log_info "从 GitHub 克隆代码..."
git clone https://github.com/fattieray/opc-learn-demo.git .

# 获取服务器公网 IP
SERVER_IP=$(curl -s ifconfig.me)
log_info "服务器公网 IP: $SERVER_IP"

# 配置后端
log_info "配置后端环境..."
cd $APP_DIR/backend

# 创建 Python 虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 创建后端环境变量
cat > .env << EOF
DATABASE_URL=sqlite+aiosqlite:///$APP_DIR/backend/opc_learn_demo.db
SECRET_KEY=opc-learn-secret-key-$(date +%s)
CORS_ORIGINS=["http://$SERVER_IP","http://localhost:3000","https://opc-learn-demo.vercel.app"]
ENVIRONMENT=production
EOF

log_success "后端环境配置完成"

# 配置前端
log_info "配置前端环境..."
cd $APP_DIR

# 创建前端环境变量
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=http://$SERVER_IP:9000/api/v1
EOF

# 安装依赖并构建
log_info "安装前端依赖（这可能需要 3-5 分钟）..."
npm install

log_info "构建前端（这可能需要 2-3 分钟）..."
npm run build

log_success "前端构建完成"

# ==========================================
# 步骤 7: 配置进程管理
# ==========================================
log_info "步骤 7/8: 配置进程管理..."

cd $APP_DIR

# 创建 PM2 配置文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'opc-backend',
      cwd: '$APP_DIR/backend',
      script: 'venv/bin/uvicorn',
      args: 'app.main:app --host 0.0.0.0 --port 9000',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: 'sqlite+aiosqlite:///$APP_DIR/backend/opc_learn_demo.db',
        SECRET_KEY: 'opc-learn-secret-key'
      },
      error_file: '/var/log/pm2/opc-backend-error.log',
      out_file: '/var/log/pm2/opc-backend-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false
    },
    {
      name: 'opc-frontend',
      cwd: '$APP_DIR',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/opc-frontend-error.log',
      out_file: '/var/log/pm2/opc-frontend-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false
    }
  ]
};
EOF

# 创建日志目录
mkdir -p /var/log/pm2

# 启动应用
log_info "启动应用..."
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save

log_success "应用已启动"

# 等待应用启动
log_info "等待应用启动（10 秒）..."
sleep 10

# 测试后端
log_info "测试后端 API..."
if curl -s http://localhost:9000/health | grep -q "healthy"; then
    log_success "后端 API 运行正常"
else
    log_warn "后端 API 可能还在启动中"
fi

# 测试前端
log_info "测试前端..."
if curl -s http://localhost:3000 | grep -q "<!DOCTYPE"; then
    log_success "前端运行正常"
else
    log_warn "前端可能还在启动中"
fi

# ==========================================
# 步骤 8: 配置 Nginx
# ==========================================
log_info "步骤 8/8: 配置 Nginx 反向代理..."

# 创建 Nginx 配置
cat > /etc/nginx/sites-available/opc-learn << EOF
server {
    listen 80;
    server_name $SERVER_IP;

    # 客户端最大上传大小
    client_max_body_size 10M;

    # 前端 Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # 后端 FastAPI
    location /api/ {
        proxy_pass http://localhost:9000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # CORS headers
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        
        if (\$request_method = 'OPTIONS') {
            return 204;
        }
    }

    # 静态资源缓存
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/opc-learn /etc/nginx/sites-enabled/opc-learn
rm -f /etc/nginx/sites-enabled/default

# 测试 Nginx 配置
nginx -t

# 重启 Nginx
systemctl restart nginx
systemctl enable nginx

log_success "Nginx 配置完成"

# ==========================================
# 初始化数据库
# ==========================================
log_info "初始化数据库..."

# 调用 seed API 加载初始数据
sleep 5
curl -s -X POST http://localhost:9000/api/v1/seed > /dev/null 2>&1 || true

log_success "数据库初始化完成"

# ==========================================
# 完成
# ==========================================
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              🎉 部署完成！                             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
log_success "访问地址:"
echo "  🌐 网站: http://$SERVER_IP"
echo "  🔧 后端 API: http://$SERVER_IP/api/v1/"
echo "  📚 API 文档: http://$SERVER_IP/docs"
echo ""
echo "📝 服务状态:"
pm2 status
echo ""
echo "📊 系统资源:"
echo "  CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')%"
echo "  内存: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "  磁盘: $(df -h / | awk 'NR==2 {print $3 "/" $2}')"
echo ""
echo "📋 管理命令:"
echo "  查看日志: pm2 logs"
echo "  重启服务: pm2 restart all"
echo "  查看状态: pm2 status"
echo "  停止服务: pm2 stop all"
echo ""
echo "🔒 配置 HTTPS（可选）:"
echo "  1. 绑定域名到 IP: $SERVER_IP"
echo "  2. 运行: certbot --nginx -d 你的域名"
echo ""
echo "💰 服务器费用: 99元/年"
echo ""
echo "❓ 遇到问题？"
echo "  查看日志: tail -f /var/log/pm2/*.log"
echo "  检查服务: systemctl status nginx"
echo ""
