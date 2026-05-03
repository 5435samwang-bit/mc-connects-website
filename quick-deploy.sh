#!/bin/bash

echo "🚀 Vercel 快速部署"
echo "=================="
echo ""
echo "由于 CLI 登录有问题，我们使用网页直接部署"
echo ""
echo "步骤："
echo "1. 确保代码已推送到 GitHub"
echo "2. 访问 https://vercel.com/new"
echo "3. 导入 mc-connects-website 仓库"
echo "4. 点击 Deploy"
echo ""

# 先尝试推送代码到 GitHub
echo "📤 推送代码到 GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码已推送到 GitHub"
    echo ""
    echo "🌐 请在浏览器中访问："
    echo "   https://vercel.com/new"
    echo ""
    echo "然后："
    echo "1. 点击 'Import Git Repository'"
    echo "2. 选择 'mc-connects-website'"
    echo "3. 点击 'Import'"
    echo "4. 点击 'Deploy'"
else
    echo ""
    echo "⚠️  推送失败，请检查 GitHub 仓库"
    echo "仓库地址：https://github.com/5435samwang-bit/mc-connects-website"
fi
