# Vercel 本地部署指南

## 最快部署方式（推荐）

### 方式 1：使用 npx 直接部署（无需安装）

打开你的 Mac 终端，执行以下命令：

```bash
# 进入项目目录
cd /Users/sam/Desktop/导出预览/其他/web

# 直接部署到 Vercel
npx vercel --prod
```

**首次部署会提示：**
1. `Set up and deploy "~/Desktop/导出预览/其他/web"?` → 输入 `y`
2. `Which scope do you want to deploy to?` → 选择你的账号
3. `Link to existing project?` → 输入 `n`
4. `What's your project name?` → 输入 `mc-connects-website`
5. `In which directory is your code located?` → 直接回车（当前目录）

然后会打开浏览器让你登录 Vercel，登录后即可完成部署。

---

### 方式 2：安装 Vercel CLI 后部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel（会打开浏览器）
vercel login

# 3. 进入项目目录
cd /Users/sam/Desktop/导出预览/其他/web

# 4. 部署
vercel --prod
```

---

### 方式 3：GitHub + Vercel（推荐，有自动部署）

```bash
# 1. 进入项目目录
cd /Users/sam/Desktop/导出预览/其他/web

# 2. 配置 Git
git config user.name "5435samwang-bit"
git config user.email "你的邮箱@example.com"

# 3. 强制推送到 GitHub
git push -u origin main --force

# 如果提示输入密码，使用 Personal Access Token
# 创建 Token: https://github.com/settings/tokens
```

推送成功后：
1. 访问 https://vercel.com/new
2. 导入 `mc-connects-website` 仓库
3. 点击 Deploy

---

## 部署后配置

### 绑定自定义域名

1. 在 Vercel 控制台进入项目
2. 点击 Settings → Domains
3. 添加你的域名
4. 按提示配置 DNS

### 自动部署

- GitHub 方式：每次推送到 `main` 分支会自动部署
- CLI 方式：需要手动运行 `vercel --prod`

---

## 常见问题

### Q: 部署失败怎么办？
A: 检查 `vercel.json` 配置是否正确，或尝试重新部署

### Q: 如何更新网站？
A: 
- GitHub 方式：修改代码后 `git push`
- CLI 方式：运行 `vercel --prod`

### Q: 如何删除部署？
A: 在 Vercel 控制台进入项目 → Settings → General → Delete Project

---

## 需要帮助？

- Vercel 文档：https://vercel.com/docs
- 查看部署日志：在 Vercel 控制台点击部署记录
