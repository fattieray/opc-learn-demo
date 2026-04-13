#!/bin/bash
# OPC Learning Hub Backend - Railway 自动部署脚本

echo "=========================================="
echo "OPC Learn Backend - Railway 部署"
echo "=========================================="
echo ""

# 检查 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI 未安装"
    echo "请运行: brew install railway"
    exit 1
fi

echo "✅ Railway CLI 已安装"
echo ""

# 检查登录状态
echo "检查登录状态..."
railway whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ 未登录 Railway"
    echo "请运行: railway login"
    exit 1
fi

echo "✅ 已登录 Railway"
echo ""

# 进入项目目录
cd "/Users/xangwei/Documents/10-工作文件夹/OpenCode/OPC Learning Hub/opc-learn-demo"

echo "=========================================="
echo "开始部署后端..."
echo "=========================================="
echo ""
echo "⚠️  Railway 部署需要交互式操作"
echo ""
echo "请按照以下步骤操作："
echo ""
echo "1️⃣  初始化项目（选择 fattieray's Projects）"
echo "   railway link 或 railway init"
echo ""
echo "2️⃣  添加环境变量"
echo "   railway variables set --variables \"DATABASE_URL=sqlite+aiosqlite:///./data/opc_learn.db\""
echo "   railway variables set --variables \"SECRET_KEY=your-secret-key-here\""
echo "   railway variables set --variables \"CORS_ORIGINS=[\\\"https://opc-learn-demo.vercel.app\\\",\\\"http://localhost:3000\\\"]\""
echo "   railway variables set --variables \"ACCESS_TOKEN_EXPIRE_MINUTES=10080\""
echo ""
echo "3️⃣  部署"
echo "   railway up"
echo ""
echo "=========================================="
echo ""

# 提供一键部署命令
read -p "是否现在开始部署？(y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "部署已取消"
    exit 0
fi

echo ""
echo "=========================================="
echo "步骤 1: 链接/创建 Railway 项目"
echo "=========================================="
echo ""
echo "即将打开 Railway 项目选择界面..."
echo "请选择或创建一个新项目"
echo ""

# 尝试链接现有项目或创建新项目
railway link 2>/dev/null

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 项目链接失败"
    echo "请手动运行: railway init"
    exit 1
fi

echo ""
echo "✅ 项目已链接"
echo ""

echo "=========================================="
echo "步骤 2: 配置环境变量"
echo "=========================================="
echo ""

# 生成随机 SECRET_KEY
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")

echo "设置环境变量..."
railway variables set \
    DATABASE_URL="sqlite+aiosqlite:///./data/opc_learn.db" \
    SECRET_KEY="$SECRET_KEY" \
    CORS_ORIGINS='["https://opc-learn-demo.vercel.app", "http://localhost:3000"]' \
    ACCESS_TOKEN_EXPIRE_MINUTES="10080"

if [ $? -eq 0 ]; then
    echo "✅ 环境变量已设置"
else
    echo "⚠️  环境变量设置失败，请在 Railway Dashboard 中手动设置"
fi

echo ""
echo "=========================================="
echo "步骤 3: 部署到 Railway"
echo "=========================================="
echo ""
echo "即将开始部署，这可能需要 3-5 分钟..."
echo ""

# 部署
railway up --detach

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ 部署已启动！"
    echo "=========================================="
    echo ""
    echo "查看部署状态: railway logs"
    echo "查看项目: railway open"
    echo ""
    echo "部署完成后，请执行以下操作："
    echo ""
    echo "1. 获取后端 URL:"
    echo "   railway domain"
    echo ""
    echo "2. 初始化数据库:"
    echo "   curl -X POST https://你的后端URL.railway.app/api/v1/seed/"
    echo ""
    echo "3. 配置前端环境变量:"
    echo "   vercel env add NEXT_PUBLIC_API_URL production"
    echo ""
    echo "4. 重新部署前端:"
    echo "   vercel --prod"
    echo ""
else
    echo ""
    echo "=========================================="
    echo "❌ 部署失败"
    echo "=========================================="
    echo ""
    echo "请查看错误信息或运行: railway logs"
    echo ""
fi
