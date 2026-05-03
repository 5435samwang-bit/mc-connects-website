# MC Connects 网站部署检查清单

## ✅ 项目状态

### 文件统计
- **HTML 页面**: 19 个
- **JavaScript 组件**: 2 个
- **CSS**: 内联样式（无需外部 CSS 文件）
- **图片资源**: 完整

### 页面列表
1. index.html - 首页
2. about-us.html - 关于我们
3. asset-management.html - 资产管理
4. brokerage.html - 经纪业务
5. crm.html - CRM
6. data-provider.html - 数据提供商
7. exchanges.html - 交易所
8. financial-institutions.html - 金融机构
9. hedge-funds.html - 对冲基金
10. liquidity-provider.html - 流动性提供商
11. market-maker-turnkey.html - 做市商方案
12. news-detail.html - 新闻详情
13. news-insights.html - 新闻洞察
14. news-tag.html - 新闻标签
15. payment-solutions.html - 支付解决方案
16. quantitative-teams.html - 量化团队
17. risk-control.html - 风险控制
18. trading-system.html - 交易系统
19. navbar-preview.html - 导航预览

### 资源目录
- web-home/ - 首页资源
- saas解决方案/ - SaaS 方案资源
- turnkey解决方案/ - Turnkey 方案资源
- components/ - 组件文件

## ✅ 配置文件

- [x] vercel.json - Vercel 部署配置
- [x] package.json - 项目配置
- [x] .gitignore - Git 忽略文件
- [x] README.md - 项目说明
- [x] DEPLOY.md - 部署指南
- [x] DEPLOY-LOCAL.md - 本地部署指南
- [x] 部署命令.txt - 快速部署命令

## ✅ 部署前检查

### 必需文件检查
- [x] index.html 存在
- [x] vercel.json 配置正确
- [x] 所有页面链接正常

### Git 状态
- [x] Git 仓库已初始化
- [x] 所有文件已提交
- [x] 远程仓库已配置

## 🚀 部署步骤

### 第一步：本地部署
```bash
cd /Users/sam/Desktop/导出预览/其他/web
npx vercel --prod
```

### 第二步：回答提示
- Set up and deploy? → Y
- Which scope? → 默认（回车）
- Link to existing project? → N
- Project name? → mc-connects-website
- Directory? → 回车

### 第三步：登录 Vercel
- 浏览器打开登录页面
- 使用 GitHub 账号登录
- 授权 Vercel

### 第四步：等待部署
- 部署时间：1-3 分钟
- 成功后会显示网站链接

## 📋 部署后检查

- [ ] 访问网站链接是否正常
- [ ] 首页是否显示正确
- [ ] 导航链接是否正常
- [ ] 图片是否正常加载
- [ ] 响应式布局是否正常

## 🔧 常见问题

### 部署失败
- 检查网络连接
- 重新运行部署命令
- 查看 Vercel 控制台日志

### 页面 404
- 检查 vercel.json 路由配置
- 确认文件路径正确

### 图片不显示
- 检查图片路径是否为相对路径
- 确认图片文件存在

## 📞 需要帮助

- Vercel 文档：https://vercel.com/docs
- Vercel 状态：https://status.vercel.com
