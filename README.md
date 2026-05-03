# MC Connects 网站

## 部署到 Vercel

### 方法一：通过 Git 部署（推荐）

1. 在 GitHub/GitLab 创建一个新仓库
2. 将代码推送到仓库：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```

3. 登录 [Vercel 控制台](https://vercel.com/dashboard)
4. 点击 "Add New Project"
5. 导入你的 Git 仓库
6. 点击 "Deploy"

### 方法二：使用 Vercel CLI（本地）

在你的本地机器上运行：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

## 项目结构

- `index.html` - 首页
- `about-us.html` - 关于我们
- `saas解决方案/` - SaaS 解决方案页面
- `turnkey解决方案/` - Turnkey 解决方案页面
- `web-home/` - 首页资源
- `components/` - 组件文件

## 配置

- `vercel.json` - Vercel 部署配置
- `package.json` - 项目配置
