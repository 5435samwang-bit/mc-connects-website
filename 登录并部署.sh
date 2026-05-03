#!/bin/bash

echo "🚀 Vercel 登录并部署脚本"
echo "========================"
echo ""
echo "第 1 步：登录 Vercel"
echo "--------------------"
echo "执行后会打开浏览器，请用 GitHub 账号登录"
echo ""

npx vercel login

echo ""
echo "第 2 步：部署到生产环境"
echo "------------------------"

npx vercel --prod

echo ""
echo "✅ 完成！"
