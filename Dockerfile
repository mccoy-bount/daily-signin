

FROM node:20-alpine
ENV TZ=Asia/Shanghai

RUN apk add --no-cache tzdata

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 复制包管理文件
COPY package.json pnpm-lock.yaml ./

# 安装所有依赖（包括开发依赖）
RUN pnpm fetch
RUN pnpm install -r --offline

# 或者明确安装 Nest CLI
RUN pnpm add -D @nestjs/cli

# 复制源代码
COPY . .

# 现在可以正常构建
RUN pnpm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
