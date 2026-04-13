#!/usr/bin/env python3
"""
OPC Learning Hub - 通过 Render API 自动化部署后端
"""

import subprocess
import json
import sys
import time

RENDER_TOKEN = "rnd_frNkl3Y6Vt7a5ZsP0xMBq62kgJFh"
GITHUB_REPO = "https://github.com/fattieray/opc-learn-demo"
BRANCH = "main"

def run_api_call(method, endpoint, data=None):
    """调用 Render API"""
    import urllib.request
    import urllib.error
    
    url = f"https://api.render.com/v1/{endpoint}"
    headers = {
        "Authorization": f"Bearer {RENDER_TOKEN}",
        "Content-Type": "application/json"
    }
    
    if data:
        data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"❌ API 错误: {e.code}")
        print(f"响应: {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        print(f"❌ 请求失败: {e}")
        return None

def get_owner():
    """获取账户 owner ID"""
    print("📋 获取账户信息...")
    
    # 尝试多个可能的端点
    endpoints = ["owner", "account", "user"]
    
    for endpoint in endpoints:
        result = run_api_call("GET", endpoint)
        if result:
            print(f"✅ 获取成功: {json.dumps(result, indent=2)}")
            return result
    
    print("⚠️  无法自动获取 owner ID")
    return None

def create_service():
    """创建 Web 服务"""
    print("\n🚀 创建 Render 服务...")
    
    # 生成 SECRET_KEY
    import secrets
    secret_key = secrets.token_urlsafe(32)
    
    service_data = {
        "type": "web_service",
        "name": "opc-learn-backend",
        "serviceDetails": {
            "env": "python",
            "buildCommand": "pip install -r requirements.txt",
            "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
            "rootDir": "backend",
            "envVars": [
                {"key": "DATABASE_URL", "value": "sqlite+aiosqlite:///./opc_learn_demo.db"},
                {"key": "SECRET_KEY", "value": secret_key},
                {"key": "CORS_ORIGINS", "value": '["https://opc-learn-demo.vercel.app", "http://localhost:3000"]'},
                {"key": "ACCESS_TOKEN_EXPIRE_MINUTES", "value": "10080"}
            ],
            "repo": GITHUB_REPO,
            "branch": BRANCH,
            "autoDeploy": True
        },
        "region": "oregon"
    }
    
    print(f"\n📋 服务配置:")
    print(f"   名称: opc-learn-backend")
    print(f"   仓库: {GITHUB_REPO}")
    print(f"   分支: {BRANCH}")
    print(f"   Root Directory: backend")
    print(f"   区域: oregon")
    print(f"\n🔑 生成的 SECRET_KEY: {secret_key}")
    print(f"\n📝 环境变量:")
    print(f"   DATABASE_URL = sqlite+aiosqlite:///./opc_learn_demo.db")
    print(f"   CORS_ORIGINS = [\"https://opc-learn-demo.vercel.app\", \"http://localhost:3000\"]")
    print(f"   ACCESS_TOKEN_EXPIRE_MINUTES = 10080")
    
    # 注意: 需要 owner ID 才能创建服务
    print(f"\n⚠️  Render API 需要 owner ID 才能创建服务")
    print(f"💡 建议: 继续使用 Blueprint 方式部署")
    print(f"\n🔗 部署链接:")
    print(f"   https://render.com/deploy?repo={GITHUB_REPO}&branch={BRANCH}")
    
    return service_data

def main():
    print("=" * 70)
    print("🚀 OPC Learning Hub - Render API 自动化部署")
    print("=" * 70)
    print()
    
    # 尝试获取 owner
    owner = get_owner()
    
    # 创建服务配置
    service_config = create_service()
    
    print("\n" + "=" * 70)
    print("📝 下一步操作")
    print("=" * 70)
    print("""
由于 Render API 的限制，建议使用 Blueprint 方式部署：

1. 打开部署链接（已自动打开）
2. 在 Blueprint 页面手动删除 disk 配置
3. 点击 Apply 开始部署

或者，如果你想完全通过 API 部署，需要：
- 获取你的 Owner ID（在 Render Dashboard 中查看）
- 然后我可以帮你通过 API 创建服务
    """)
    
    # 打开部署链接
    import webbrowser
    webbrowser.open(f"https://render.com/deploy?repo={GITHUB_REPO}&branch={BRANCH}")

if __name__ == "__main__":
    main()
