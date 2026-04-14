#!/bin/bash
# OPC Learning Hub - 完整一键部署脚本
# 使用方法：在服务器上运行 curl -sSL <脚本URL> | bash

set -e

echo "╔════════════════════════════════════════════════════════╗"
echo "║   OPC Learning Hub - 完整自动化部署脚本               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

SERVER_IP=$(curl -s ifconfig.me)
echo "服务器 IP: $SERVER_IP"
echo ""

# 步骤 1: 安装 Node.js
echo "[1/8] 安装 Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs
echo "Node.js 版本: $(node --version)"
echo ""

# 步骤 2: 安装 PM2
echo "[2/8] 安装 PM2..."
npm install -g pm2
echo ""

# 步骤 3: 安装 Python
echo "[3/8] 安装 Python..."
yum install -y python3 python3-pip python3-devel
echo ""

# 步骤 4: 克隆代码
echo "[4/8] 克隆代码..."
cd /
rm -rf /opt/opc-learn
mkdir -p /opt/opc-learn
cd /opt/opc-learn

# 尝试多个镜像源
echo "尝试从 GitHub 克隆..."
git clone --depth 1 https://github.com/fattieray/opc-learn-demo.git . 2>/dev/null && echo "✅ GitHub 克隆成功" || {
    echo "GitHub 失败，尝试镜像 1..."
    git clone --depth 1 https://github.moeyy.xyz/https://github.com/fattieray/opc-learn-demo.git . 2>/dev/null && echo "✅ 镜像 1 成功" || {
        echo "镜像 1 失败，尝试镜像 2..."
        git clone --depth 1 https://ghproxy.com/https://github.com/fattieray/opc-learn-demo.git . 2>/dev/null && echo "✅ 镜像 2 成功" || {
            echo "所有镜像源失败！"
            exit 1
        }
    }
}

# 验证文件
if [ ! -f "package.json" ]; then
    echo "❌ package.json 不存在，克隆可能不完整"
    ls -la
    exit 1
fi
echo "✅ 代码克隆成功"
echo ""

# 步骤 5: 配置后端
echo "[5/8] 配置后端..."
cd /opt/opc-learn/backend
python3 -m venv venv
/opt/opc-learn/backend/venv/bin/pip install --upgrade pip
/opt/opc-learn/backend/venv/bin/pip install -r requirements.txt

cat > /opt/opc-learn/backend/.env << EOF
DATABASE_URL=sqlite+aiosqlite:///opt/opc-learn/backend/opc_learn.db
SECRET_KEY=opc-learn-secret-key-2024
CORS_ORIGINS=["http://$SERVER_IP","http://localhost:3000","https://opc-learn-demo.vercel.app"]
ENVIRONMENT=production
EOF
echo "✅ 后端配置完成"
echo ""

# 步骤 6: 配置前端
echo "[6/8] 配置前端..."
cd /opt/opc-learn
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=http://$SERVER_IP:9000/api/v1
EOF

echo "安装前端依赖（需要 3-5 分钟）..."
npm install

echo "构建前端（需要 2-3 分钟）..."
npm run build
echo "✅ 前端构建完成"
echo ""

# 步骤 7: 配置 PM2
echo "[7/8] 配置进程管理..."
mkdir -p /var/log/pm2

cat > /opt/opc-learn/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'opc-backend',
      cwd: '/opt/opc-learn/backend',
      script: 'venv/bin/uvicorn',
      args: 'app.main:app --host 0.0.0.0 --port 9000',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      error_file: '/var/log/pm2/backend-error.log',
      out_file: '/var/log/pm2/backend-out.log',
      merge_logs: true
    },
    {
      name: 'opc-frontend',
      cwd: '/opt/opc-learn',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      autorestart: true,
      error_file: '/var/log/pm2/frontend-error.log',
      out_file: '/var/log/pm2/frontend-out.log',
      merge_logs: true
    }
  ]
};
EOF

pm2 start ecosystem.config.js
pm2 startup systemd -u root --hp /root
pm2 save
echo "✅ 进程管理配置完成"
echo ""

# 步骤 8: 配置 Nginx
echo "[8/8] 配置 Nginx..."
cat > /etc/nginx/conf.d/opc-learn.conf << EOF
server {
    listen 80;
    server_name _;
    client_max_body_size 10M;

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

    location /api/ {
        proxy_pass http://localhost:9000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

rm -f /etc/nginx/conf.d/default.conf
nginx -t
systemctl restart nginx
systemctl enable nginx
echo "✅ Nginx 配置完成"
echo ""

# 等待服务启动
echo "等待服务启动（15 秒）..."
sleep 15

# 初始化数据库
echo "初始化数据库..."
curl -s -X POST http://localhost:9000/api/v1/seed > /dev/null 2>&1 || echo "数据库初始化可能需要手动执行"
echo ""

# 完成
echo "╔════════════════════════════════════════════════════════╗"
echo "║              🎉 部署完成！                             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "访问地址:"
echo "  🌐 网站: http://$SERVER_IP"
echo "  🔧 后端 API: http://$SERVER_IP/api/v1/"
echo "  📚 API 文档: http://$SERVER_IP/docs"
echo ""
echo "服务状态:"
pm2 status
echo ""
echo "管理命令:"
echo "  查看日志: pm2 logs"
echo "  重启服务: pm2 restart all"
echo "  查看状态: pm2 status"
echo ""
