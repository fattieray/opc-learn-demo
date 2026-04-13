#!/bin/bash
# OPC Learning Hub - 腾讯云一键部署脚本
# 使用方法: chmod +x deploy-tencent.sh && ./deploy-tencent.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   OPC Learning Hub - 腾讯云 CloudBase 部署脚本        ║"
echo "║                                                       ║"
echo "║   预计耗时: 15-20 分钟                                 ║"
echo "║   费用: 开发期免费，生产期 ¥10-50/月                   ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 步骤 1: 检查依赖
log_info "步骤 1/8: 检查依赖..."

if ! command -v node &> /dev/null; then
    log_error "Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    log_error "npm 未安装"
    exit 1
fi

if ! command -v tcb &> /dev/null; then
    log_warn "CloudBase CLI 未安装，正在安装..."
    npm install -g @cloudbase/cli
    log_success "CloudBase CLI 安装完成"
else
    log_success "CloudBase CLI 已安装: $(tcb --version)"
fi

# 步骤 2: 登录腾讯云
log_info "步骤 2/8: 登录腾讯云..."
log_info "请在弹出的二维码中用微信扫码登录"
tcb login
log_success "登录成功"

# 步骤 3: 获取环境 ID
log_info "步骤 3/8: 配置 CloudBase 环境..."
echo ""
echo "如果没有环境，请先创建："
echo "  1. 访问: https://console.cloud.tencent.com/tcb/env"
echo "  2. 点击'新建环境'"
echo "  3. 环境 ID 建议: opc-learn-xxx"
echo ""
read -p "请输入你的 CloudBase 环境 ID: " ENV_ID

if [ -z "$ENV_ID" ]; then
    log_error "环境 ID 不能为空"
    exit 1
fi

log_success "环境 ID: $ENV_ID"

# 步骤 4: 配置环境变量
log_info "步骤 4/8: 配置环境变量..."

# 创建后端云函数配置目录
mkdir -p backend/cloud-function

# 创建云函数入口文件
cat > backend/index.py << 'EOF'
"""CloudBase 云函数入口"""
from mangum import Mangum
from app.main import app

# 将 FastAPI 应用包装为云函数
handler = Mangum(app, lifespan="off")
EOF

log_success "云函数入口文件创建完成"

# 更新后端依赖
cat >> backend/requirements.txt << 'EOF'
mangum==0.17.0
pymysql==1.1.0
cryptography==41.0.0
EOF

log_success "后端依赖更新完成"

# 创建前端环境变量
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://$ENV_ID.service.tcloudbase.net
EOF

log_success "前端环境变量配置完成"

# 步骤 5: 安装依赖并构建前端
log_info "步骤 5/8: 安装依赖并构建前端..."

npm install
log_success "前端依赖安装完成"

log_info "构建前端（这可能需要 2-3 分钟）..."
npm run build
log_success "前端构建完成"

# 步骤 6: 创建 cloudbaserc.json 配置文件
log_info "步骤 6/8: 创建 CloudBase 配置文件..."

cat > cloudbaserc.json << EOF
{
  "envId": "$ENV_ID",
  "region": "ap-shanghai",
  "functionRoot": "./backend",
  "functions": [
    {
      "name": "opc-api",
      "timeout": 30,
      "runtime": "Python3.8",
      "memorySize": 512,
      "handler": "index.handler"
    }
  ],
  "hosting": {
    "source": ".next",
    "headers": [
      {
        "source": "/_next/static/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|png|gif|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=86400"
          }
        ]
      }
    ]
  }
}
EOF

log_success "CloudBase 配置文件创建完成"

# 步骤 7: 部署
log_info "步骤 7/8: 开始部署..."
echo ""

# 部署前端
log_info "正在部署前端到静态托管..."
tcb hosting:deploy .next || {
    log_error "前端部署失败"
    exit 1
}
log_success "前端部署成功"

echo ""

# 部署后端云函数
log_info "正在创建/更新云函数..."
tcb function:create --name opc-api --runtime Python3.8 --memory 512 --timeout 30 2>/dev/null || {
    log_warn "云函数已存在，跳过创建"
}

log_info "正在部署云函数..."
tcb function:deploy opc-api --dir backend || {
    log_error "云函数部署失败"
    exit 1
}
log_success "云函数部署成功"

# 步骤 8: 配置数据库
log_info "步骤 8/8: 配置云数据库..."

# 创建数据库集合
tcb database:create courses 2>/dev/null || log_warn "courses 集合已存在"
tcb database:create users 2>/dev/null || log_warn "users 集合已存在"
tcb database:create missions 2>/dev/null || log_warn "missions 集合已存在"
tcb database:create circles 2>/dev/null || log_warn "circles 集合已存在"

log_success "数据库集合创建完成"

# 完成
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              🎉 部署完成！                             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
log_success "访问地址:"
echo "  🌐 前端: https://$ENV_ID.service.tcloudbase.net"
echo "  🔧 后端: https://$ENV_ID.service.tcloudbase.net/api/v1/"
echo ""
echo "📝 测试命令:"
echo "  # 测试前端"
echo "  curl https://$ENV_ID.service.tcloudbase.net"
echo ""
echo "  # 测试后端"
echo "  curl https://$ENV_ID.service.tcloudbase.net/api/v1/health"
echo ""
echo "  # 测试课程 API"
echo "  curl https://$ENV_ID.service.tcloudbase.net/api/v1/courses/"
echo ""
echo "📚 下一步:"
echo "  1. 访问前端地址测试功能"
echo "  2. 导入初始课程数据"
echo "  3. 配置自定义域名（可选）"
echo "  4. 设置监控告警"
echo ""
echo "💰 费用说明:"
echo "  - 开发期: ¥0 (免费额度内)"
echo "  - 生产期: ¥10-50/月 (根据流量)"
echo ""
echo "❓ 遇到问题？查看完整文档:"
echo "  https://docs.cloudbase.net/"
echo ""
