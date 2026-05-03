# 🚀 MC Connects 网站 - 立即部署

## 📋 部署前确认

✅ **所有文件已准备就绪**
- 19 个 HTML 页面
- 完整的图片和资源文件
- Vercel 配置文件
- Git 仓库已初始化

---

## 🎯 部署步骤（3分钟完成）

### 第 1 步：打开终端
在你的 Mac 上打开「终端」应用程序

### 第 2 步：执行部署命令
```bash
cd /Users/sam/Desktop/导出预览/其他/web
npx vercel --prod
```

### 第 3 步：回答提示
```
? Set up and deploy "~/Desktop/.../web"? (Y/n) → 输入 Y
? Which scope do you want to deploy to? → 按回车
? Link to existing project? (y/N) → 输入 N
? What's your project name? (web) → 输入 mc-connects-website
? In which directory is your code located? (./) → 按回车
```

### 第 4 步：登录 Vercel
- 浏览器会自动打开
- 点击 "Continue with GitHub"
- 使用你的 GitHub 账号 (5435samwang-bit) 登录
- 授权 Vercel 访问

### 第 5 步：等待部署
- 部署时间：1-3 分钟
- 看到 ✅ Production: https://... 即表示成功

---

## 🎉 部署成功

你会看到类似输出：
```
🔍  Inspect: https://vercel.com/5435samwang-bit/mc-connects-website/xxxxxx
✅  Production: https://mc-connects-website-xxxx.vercel.app
```

**访问 Production 链接即可查看你的网站！**

---

## 📱 分享网站

将链接分享给其他人：
```
https://mc-connects-website-xxxx.vercel.app
```

⚠️ **注意**：国内访问可能需要开外网，建议后续绑定自定义域名

---

## 🔄 更新网站

修改代码后，再次运行：
```bash
cd /Users/sam/Desktop/导出预览/其他/web
npx vercel --prod
```

---

## ❓ 遇到问题？

### 部署失败
1. 检查网络连接
2. 重新运行部署命令
3. 查看错误信息

### 需要帮助
- 查看 `DEPLOY-LOCAL.md` 详细指南
- 访问 https://vercel.com/docs

---

## 📝 相关文件

- `部署命令.txt` - 快速命令参考
- `部署检查清单.md` - 详细检查清单
- `DEPLOY.md` - 完整部署指南
- `vercel.json` - Vercel 配置文件

---

**现在就可以开始部署了！祝部署顺利！🎊**
