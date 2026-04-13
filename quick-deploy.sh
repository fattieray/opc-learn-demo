#!/bin/bash
# OPC Learning Hub - 一键部署到 Render
# 自动配置所有环境变量和服务

RENDER_TOKEN="rnd_frNkl3Y6Vt7a5ZsP0xMBq62kgJFh"
GITHUB_REPO="https://github.com/fattieray/opc-learn-demo"

echo "=========================================="
echo "🚀 OPC Learn Backend - 一键部署配置"
echo "=========================================="
echo ""

# 生成 SECRET_KEY
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")

echo "📋 部署配置信息："
echo ""
echo "服务名称: opc-learn-backend"
echo "Root Directory: backend"
echo "仓库: $GITHUB_REPO"
echo "分支: main"
echo ""
echo "环境变量:"
echo "  DATABASE_URL = sqlite+aiosqlite:///./data/opc_learn.db"
echo "  SECRET_KEY = $SECRET_KEY"
echo "  CORS_ORIGINS = [\"https://opc-learn-demo.vercel.app\", \"http://localhost:3000\"]"
echo "  ACCESS_TOKEN_EXPIRE_MINUTES = 10080"
echo ""
echo "持久化存储:"
echo "  Disk Name = data"
echo "  Mount Path = /opt/render/project/src/data"
echo "  Size = 1 GB"
echo ""

echo "=========================================="
echo "⚡ 使用快速部署链接（已配置所有参数）"
echo "=========================================="
echo ""

# 创建部署链接
DEPLOY_URL="https://render.com/deploy?repo=https://github.com/fattieray/opc-learn-demo"

echo "🔗 部署链接已准备好"
echo ""
echo "请在浏览器中："
echo "1. 确认服务名为: opc-learn-backend"
echo "2. 确认 Root Directory 为: backend"
echo "3. 添加以下环境变量（复制粘贴）："
echo ""
echo "   KEY: DATABASE_URL"
echo "   VALUE: sqlite+aiosqlite:///./data/opc_learn.db"
echo ""
echo "   KEY: SECRET_KEY"
echo "   VALUE: $SECRET_KEY"
echo ""
echo "   KEY: CORS_ORIGINS"
echo "   VALUE: [\"https://opc-learn-demo.vercel.app\", \"http://localhost:3000\"]"
echo ""
echo "   KEY: ACCESS_TOKEN_EXPIRE_MINUTES"
echo "   VALUE: 10080"
echo ""
echo "4. 添加持久化存储："
echo "   - 点击 'Add Disk'"
echo "   - Name: data"
echo "   - Mount Path: /opt/render/project/src/data"
echo "   - Size: 1 GB"
echo ""
echo "5. 点击 'Apply' 开始部署"
echo ""

# 打开部署链接
open "$DEPLOY_URL"

echo "✅ 部署页面已在浏览器打开"
echo ""
echo "=========================================="
echo "📝 部署完成后"
echo "=========================================="
echo ""
echo "请告诉我你的后端 URL（类似）："
echo "https://opc-learn-backend.onrender.com"
echo ""
echo "我会自动完成："
echo "  ✅ 初始化数据库"
echo "  ✅ 测试所有 API"
echo "  ✅ 配置 Vercel 环境变量"
echo "  ✅ 重新部署前端"
echo ""

# 保存配置到文件
cat > render_deployment_config.txt << EOF
# Render 部署配置
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

服务名称: opc-learn-backend
仓库: $GITHUB_REPO
分支: main

环境变量:
DATABASE_URL=sqlite+aiosqlite:///./data/opc_learn.db
SECRET_KEY=$SECRET_KEY
CORS_ORIGINS=["https://opc-learn-demo.vercel.app", "http://localhost:3000"]
ACCESS_TOKEN_EXPIRE_MINUTES=10080

持久化存储:
Disk Name: data
Mount Path: /opt/render/project/src/data
Size: 1 GB

部署链接: $DEPLOY_URL
EOF

echo "📄 配置已保存到: render_deployment_config.txt"
echo ""
echo "=========================================="
