#!/usr/bin/env python3
"""
自动化部署后端到 Render
"""

import subprocess
import json
import secrets

RENDER_TOKEN = "rnd_frNkl3Y6Vt7a5ZsP0xMBq62kgJFh"
GITHUB_REPO = "https://github.com/fattieray/opc-learn-demo"

def print_step(num, title):
    print(f"\n{'='*60}")
    print(f"步骤 {num}: {title}")
    print(f"{'='*60}")

def main():
    print("🚀 OPC Learning Hub - 后端自动化部署")
    print("="*60)
    
    # 生成 SECRET_KEY
    secret_key = secrets.token_urlsafe(32)
    
    print_step(1, "打开 Render Dashboard")
    print("\n请在浏览器中完成以下操作：\n")
    print("1. 访问: https://dashboard.render.com")
    print("2. 点击 'New +' → 'Web Service'")
    print("3. 连接仓库: fattieray/opc-learn-demo")
    
    print_step(2, "填写服务配置")
    print("\n请复制以下配置：\n")
    print("┌─────────────────────────────────────────────────┐")
    print("│ Name:            opc-learn-backend              │")
    print("│ Region:          Oregon                         │")
    print("│ Branch:          main                           │")
    print("│ Root Directory:  backend  ← 重要！              │")
    print("│ Runtime:         Python 3                       │")
    print("│                                                 │")
    print("│ Build Command:   pip install -r requirements.txt│")
    print("│ Start Command:   uvicorn app.main:app \\         │")
    print("│                    --host 0.0.0.0 --port $PORT  │")
    print("└─────────────────────────────────────────────────┘")
    
    print_step(3, "添加环境变量")
    print("\n逐个添加以下 4 个环境变量：\n")
    print(f"1. DATABASE_URL")
    print(f"   值: sqlite+aiosqlite:///./opc_learn_demo.db\n")
    print(f"2. SECRET_KEY")
    print(f"   值: {secret_key}")
    print(f"   (或点击 Generate 按钮自动生成)\n")
    print(f"3. CORS_ORIGINS")
    print(f'   值: ["https://opc-learn-demo.onrender.com", "http://localhost:3000"]\n')
    print(f"4. ACCESS_TOKEN_EXPIRE_MINUTES")
    print(f"   值: 10080\n")
    
    print_step(4, "创建服务")
    print("\n⚠️  重要：不要添加 Disk（免费套餐不支持）")
    print("\n点击 'Create Web Service' 开始部署")
    print("\n部署时间：约 5 分钟")
    
    print_step(5, "部署完成后")
    print("\n你会获得后端 URL，类似：")
    print("https://opc-learn-backend-xxxx.onrender.com")
    print("\n请把这个 URL 告诉我，我会自动：")
    print("  ✅ 初始化数据库")
    print("  ✅ 测试所有 API")
    print("  ✅ 配置前端连接后端")
    print("  ✅ 端到端验证")
    
    print("\n" + "="*60)
    print("💡 提示")
    print("="*60)
    print("\n所有配置已准备好，只需在 Render Dashboard 中复制粘贴即可。")
    print("\n打开 Render Dashboard...")
    
    # 打开 Render Dashboard
    subprocess.run(["open", "https://dashboard.render.com"])
    
    # 保存配置到剪贴板（macOS）
    config_text = f"""服务名: opc-learn-backend
Root Directory: backend
Build: pip install -r requirements.txt
Start: uvicorn app.main:app --host 0.0.0.0 --port $PORT

环境变量:
DATABASE_URL=sqlite+aiosqlite:///./opc_learn_demo.db
SECRET_KEY={secret_key}
CORS_ORIGINS=["https://opc-learn-demo.onrender.com", "http://localhost:3000"]
ACCESS_TOKEN_EXPIRE_MINUTES=10080"""
    
    try:
        subprocess.run(["pbcopy"], input=config_text, text=True)
        print("\n✅ 配置已复制到剪贴板！")
    except:
        pass

if __name__ == "__main__":
    main()
