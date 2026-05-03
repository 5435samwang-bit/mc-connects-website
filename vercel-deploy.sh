#!/bin/bash

# Vercel 直接部署脚本（无需 GitHub）
# 使用 Vercel CLI 直接部署本地项目

echo "🚀 Vercel 直接部署脚本"
echo "======================"
echo ""

# 检查 vercel 是否安装
if ! command -v npx &> /dev/null; then
    echo "❌ 请先安装 Node.js"
    exit 1
fi

echo "📦 使用 npx vercel 进行部署..."
echo ""
echo "💡 首次部署会提示："
echo "   1. 登录 Vercel（会打开浏览器）"
echo "   2. 选择项目配置"
echo "   3. 确认部署"
echo ""
echo "⚠️  注意：这种方式不会关联 Git 仓库"
echo "   建议后续将代码推送到 GitHub 以获得自动部署功能"
echo ""
read -p "按回车键开始部署..."

# 使用 npx 运行 vercel
npx vercel --prod

echo ""
echo "✅ 部署完成！"
echo ""
echo "📌 后续建议："
echo "   1. 将代码推送到 GitHub"
echo "   2. 在 Vercel 控制台关联 Git 仓库"
echo "   3. 这样每次推送代码会自动重新部署"
