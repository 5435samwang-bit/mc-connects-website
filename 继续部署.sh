#!/bin/bash

echo "✅ Vercel 登录成功！"
echo ""
echo "现在开始部署..."
echo ""

cd /Users/sam/Desktop/导出预览/其他/web

echo "🚀 部署到 Vercel 生产环境"
echo "========================="
echo ""

npx vercel --prod

echo ""
echo "🎉 部署完成！"
