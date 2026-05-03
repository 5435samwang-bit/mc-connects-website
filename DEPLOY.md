# 部署指南

## 快速部署步骤

### 第一步：在 GitHub 创建仓库

1. 打开 https://github.com/new
2. 填写信息：
   - Repository name: `mc-connects-website`
   - Description: MC Connects 官方网站
   - 选择 Public（公开）
   - 不要勾选 "Add a README file"
   - 点击 "Create repository"

### 第二步：推送代码到 GitHub

创建仓库后，GitHub 会显示类似下面的命令，在终端执行：

```bash
cd /Users/sam/Desktop/导出预览/其他/web
git remote add origin https://github.com/你的用户名/mc-connects-website.git
git branch -M main
git push -u origin main
```

### 第三步：部署到 Vercel

#### 方式 A：通过 Vercel 网站（推荐）

1. 打开 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 登录并授权 GitHub
4. 选择 `mc-connects-website` 仓库
5. 点击 "Deploy"
6. 等待部署完成，会获得类似 `mc-connects-website.vercel.app` 的域名

#### 方式 B：本地 CLI 部署

在本地终端执行：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录（会打开浏览器）
vercel login

# 进入项目目录
cd /Users/sam/Desktop/导出预览/其他/web

# 部署
vercel --prod
```

## 部署后配置

### 绑定自定义域名

1. 在 Vercel 控制台进入项目
2. 点击 "Settings" → "Domains"
3. 添加你的域名
4. 按提示配置 DNS

### 自动部署

- 每次推送到 `main` 分支会自动部署到生产环境
- 创建 Pull Request 会自动生成预览链接

## 项目信息

- **框架**: 纯静态 HTML/CSS/JS
- **入口文件**: `index.html`
- **配置**: `vercel.json`

## 需要帮助？

- Vercel 文档: https://vercel.com/docs
- GitHub 文档: https://docs.github.com
