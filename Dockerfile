# 前端 Next.js
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# 复制前端代码
COPY package*.json ./
COPY src/ src/
COPY public/ public/
COPY next.config.ts ./
COPY tsconfig.json ./

# 设置环境变量
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 安装依赖并构建
RUN npm install
RUN npm run build

# 生产环境
FROM node:18-alpine AS frontend-runner

WORKDIR /app

COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static
COPY --from=frontend-builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
