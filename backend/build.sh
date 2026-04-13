#!/bin/bash
# Render Build 脚本
# 使用预编译的二进制包避免 Rust 编译

set -e

echo "==> Installing dependencies with pre-built wheels..."

# 先安装不需要编译的依赖
pip install --prefer-binary --only-binary=:all: \
    fastapi==0.115.6 \
    uvicorn==0.34.0 \
    aiosqlite==0.20.0 \
    python-jose[cryptography]==3.3.0 \
    passlib[bcrypt]==1.7.4

# 安装 pydantic 和 sqlalchemy，使用 >= 版本让 pip 选择预编译版本
pip install --prefer-binary \
    "pydantic>=2.10.4,<3.0" \
    "pydantic-settings>=2.7.1,<3.0" \
    "sqlalchemy>=2.0.36,<3.0"

echo "==> All dependencies installed successfully!"
