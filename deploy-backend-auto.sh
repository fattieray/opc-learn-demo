#!/bin/bash
# OPC Learning Hub Backend - 完全自动化部署到 Render
# 使用 Render API 实现无交互式部署

set -e

echo "=========================================="
echo "🚀 OPC Learn Backend - 自动化部署到 Render"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查必要工具
check_requirements() {
    echo "📋 检查部署环境..."
    
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}❌ curl 未安装${NC}"
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ python3 未安装${NC}"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ git 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 所有必要工具已安装${NC}"
    echo ""
}

# 检查 Git 仓库
check_git_repo() {
    cd "/Users/xangwei/Documents/10-工作文件夹/OpenCode/OPC Learning Hub/opc-learn-demo"
    
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
        echo -e "${RED}❌ 当前目录不是 Git 仓库${NC}"
        echo "请先初始化 Git: git init"
        exit 1
    fi
    
    # 检查是否有远程仓库
    if ! git remote -v | grep -q origin; then
        echo -e "${YELLOW}⚠️  未配置 Git 远程仓库${NC}"
        echo ""
        echo "Render 需要从 Git 仓库部署。请选择："
        echo "1. 创建 GitHub 仓库并推送代码（推荐）"
        echo "2. 使用 Railway Dashboard 手动部署"
        echo ""
        read -p "是否继续查看手动部署指南？(y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            open "BACKEND_DEPLOYMENT_STATUS.md"
        fi
        exit 0
    fi
    
    echo -e "${GREEN}✅ Git 仓库已配置${NC}"
    echo ""
}

# 生成部署指南
generate_guide() {
    cat << 'EOF'
==========================================
📝 Render 自动化部署指南
==========================================

由于 Render 需要通过 GitHub 仓库部署，请按照以下步骤操作：

步骤 1: 创建 GitHub 仓库（如果还没有）
--------------------------------------
1. 访问 https://github.com/new
2. 创建新仓库：opc-learn-demo
3. 不要初始化（我们已经有了代码）

步骤 2: 推送代码到 GitHub
--------------------------------------
EOF

    # 获取远程仓库 URL
    REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "你的仓库URL")
    
    cat << EOF
运行以下命令：

    cd opc-learn-demo
    git push origin main

步骤 3: 在 Render 部署
--------------------------------------
1. 访问 https://render.com
2. 登录（使用 GitHub 账号）
3. 点击 "New +" → "Blueprint"
4. 选择你的仓库
5. Render 会自动读取 render.yaml 配置
6. 点击 "Apply"

步骤 4: 验证部署
--------------------------------------
部署完成后（约 5 分钟）：

    # 获取你的 Render URL
    RENDER_URL="https://opc-learn-backend.onrender.com"
    
    # 初始化数据库
    curl -X POST \$RENDER_URL/api/v1/seed/
    
    # 测试 API
    curl \$RENDER_URL/api/v1/courses/

步骤 5: 连接前端
--------------------------------------
    # 配置 Vercel 环境变量
    vercel env add NEXT_PUBLIC_API_URL production
    # 输入：https://你的RenderURL/api/v1
    
    # 重新部署前端
    vercel --prod

==========================================
📊 已准备好的配置文件
==========================================

✅ render.yaml - Render 自动部署配置
✅ backend/Procfile - 启动配置  
✅ backend/requirements.txt - Python 依赖
✅ backend/app/core/config.py - CORS 已配置

==========================================
💡 环境变量（Render 会自动配置）
==========================================

render.yaml 已包含以下配置：
- DATABASE_URL: sqlite+aiosqlite:///./data/opc_learn.db
- SECRET_KEY: 自动生成
- CORS_ORIGINS: ["https://opc-learn-demo.vercel.app"]
- ACCESS_TOKEN_EXPIRE_MINUTES: 10080
- 持久化存储: 1GB

==========================================

EOF
}

# 打开 Render 部署页面
open_render() {
    echo "🌐 打开 Render 部署页面..."
    open "https://render.com"
    echo ""
}

# 主流程
main() {
    check_requirements
    check_git_repo
    
    echo "=========================================="
    echo "📦 项目信息"
    echo "=========================================="
    echo ""
    echo "项目路径: $(pwd)"
    echo "分支: $(git branch --show-current)"
    echo "远程仓库: $(git remote get-url origin 2>/dev/null || '未配置')"
    echo ""
    
    read -p "是否查看完整部署指南？(y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        generate_guide
        echo ""
        read -p "是否打开 Render 网站开始部署？(y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            open_render
            echo -e "${GREEN}✅ Render 已打开，请按照指南操作${NC}"
        fi
    else
        echo ""
        echo -e "${YELLOW}💡 提示：运行以下命令查看完整指南${NC}"
        echo "   cat BACKEND_DEPLOYMENT_RENDER.md"
        echo ""
        echo -e "${YELLOW}💡 或直接打开文档${NC}"
        echo "   open BACKEND_DEPLOYMENT_RENDER.md"
    fi
    
    echo ""
    echo "=========================================="
    echo -e "${GREEN}✅ 准备工作已完成！${NC}"
    echo "=========================================="
    echo ""
    echo "下一步："
    echo "1. 推送代码到 GitHub: git push origin main"
    echo "2. 在 Render 部署: https://render.com"
    echo "3. 查看文档: open BACKEND_DEPLOYMENT_RENDER.md"
    echo ""
}

# 运行主流程
main
