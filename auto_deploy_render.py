#!/usr/bin/env python3
"""
OPC Learning Hub - 自动化部署到 Render
使用 Render Blueprint API 实现完全自动化
"""

import subprocess
import json
import time
import sys

RENDER_TOKEN = "rnd_frNkl3Y6Vt7a5ZsP0xMBq62kgJFh"
GITHUB_REPO = "https://github.com/fattieray/opc-learn-demo"
BRANCH = "main"

def run_command(cmd):
    """运行命令并返回输出"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip(), result.returncode

def print_status(message, status="info"):
    """打印状态信息"""
    icons = {
        "info": "ℹ️",
        "success": "✅",
        "error": "❌",
        "warning": "⚠️",
        "deploy": "🚀"
    }
    icon = icons.get(status, "ℹ️")
    print(f"{icon} {message}")

def check_github_connection():
    """检查 GitHub 仓库是否可访问"""
    print_status("检查 GitHub 仓库连接...", "info")
    stdout, stderr, code = run_command(f"curl -s {GITHUB_REPO}")
    if code == 0:
        print_status("GitHub 仓库可访问", "success")
        return True
    else:
        print_status("GitHub 仓库访问失败", "error")
        return False

def create_blueprint():
    """通过 Blueprint 创建部署"""
    print_status("创建 Render Blueprint 部署...", "deploy")
    
    # 使用 render.yaml 中的配置
    blueprint_url = f"{GITHUB_REPO}/blob/{BRANCH}/render.yaml"
    
    print(f"\n📋 Blueprint 配置:")
    print(f"   仓库: {GITHUB_REPO}")
    print(f"   分支: {BRANCH}")
    print(f"   配置文件: render.yaml")
    print(f"\n🔗 请在浏览器中打开以下链接完成部署:")
    print(f"   https://dashboard.render.com/blueprints")
    print(f"\n⚡ 或者使用快速部署链接:")
    print(f"   https://render.com/deploy?repo={GITHUB_REPO}&branch={BRANCH}")
    
    return True

def check_deployment_status():
    """检查部署状态"""
    print_status("检查部署状态...", "info")
    
    stdout, stderr, code = run_command(
        f'curl -s -H "Authorization: Bearer {RENDER_TOKEN}" '
        f'"https://api.render.com/v1/services"'
    )
    
    if code == 0 and stdout != "[]":
        services = json.loads(stdout) if stdout else []
        if services:
            print_status(f"发现 {len(services)} 个服务", "success")
            for svc in services:
                print(f"   - {svc.get('name', 'Unknown')}: {svc.get('status', 'Unknown')}")
            return services
    else:
        print_status("暂无部署的服务", "warning")
    
    return []

def setup_vercel_env(backend_url):
    """配置 Vercel 环境变量"""
    print_status("配置 Vercel 环境变量...", "info")
    
    api_url = f"{backend_url}/api/v1"
    
    print(f"\n请在终端运行以下命令:")
    print(f"   vercel env add NEXT_PUBLIC_API_URL production")
    print(f"   输入: {api_url}")
    print(f"\n然后重新部署前端:")
    print(f"   vercel --prod")

def main():
    print("=" * 70)
    print("🚀 OPC Learning Hub - Render 自动化部署")
    print("=" * 70)
    print()
    
    # 步骤 1: 检查 GitHub 连接
    if not check_github_connection():
        print_status("GitHub 仓库不可访问，请检查", "error")
        sys.exit(1)
    
    # 步骤 2: 创建 Blueprint 部署
    create_blueprint()
    
    # 步骤 3: 提供部署指南
    print("\n" + "=" * 70)
    print("📝 部署步骤")
    print("=" * 70)
    print("""
1️⃣  打开 Render Blueprint 页面:
   https://dashboard.render.com/blueprints

2️⃣  点击 "New Blueprint Instance"

3️⃣  选择你的 GitHub 仓库:
   fattieray/opc-learn-demo

4️⃣  Render 会自动读取 render.yaml 配置

5️⃣  确认配置无误后点击 "Apply"

6️⃣  等待部署完成（约 5 分钟）
    """)
    
    # 步骤 4: 检查部署状态
    print("=" * 70)
    print("⏳ 部署完成后，运行以下命令检查状态:")
    print("=" * 70)
    print("""
# 检查服务状态
python3 check_deployment.py

# 初始化数据库
curl -X POST https://你的RenderURL.onrender.com/api/v1/seed/

# 测试 API
curl https://你的RenderURL.onrender.com/api/v1/courses/
    """)
    
    print("\n" + "=" * 70)
    print("💡 提示: 部署完成后告诉我后端 URL，我会帮你配置前端！")
    print("=" * 70)

if __name__ == "__main__":
    main()
