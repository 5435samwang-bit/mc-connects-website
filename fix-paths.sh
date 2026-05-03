#!/bin/bash

echo "🔧 修复中文路径问题"
echo "===================="
echo ""

# 进入项目目录
cd /Users/sam/Desktop/导出预览/其他/web

# 1. 重命名文件夹
echo "📁 重命名文件夹..."

# 重命名 saas解决方案 -> saas-solutions
if [ -d "saas解决方案" ]; then
    mv "saas解决方案" "saas-solutions"
    echo "✅ saas解决方案 -> saas-solutions"
fi

# 重命名 turnkey解决方案 -> turnkey-solutions
if [ -d "turnkey解决方案" ]; then
    mv "turnkey解决方案" "turnkey-solutions"
    echo "✅ turnkey解决方案 -> turnkey-solutions"
fi

# 重命名 流动性 -> liquidity
if [ -d "流动性" ]; then
    mv "流动性" "liquidity"
    echo "✅ 流动性 -> liquidity"
fi

# 重命名 情报 -> intelligence
if [ -d "情报" ]; then
    mv "情报" "intelligence"
    echo "✅ 情报 -> intelligence"
fi

echo ""
echo "📝 更新HTML文件中的路径..."

# 2. 更新HTML文件中的路径
find . -name "*.html" -type f -exec sed -i '' 's/saas解决方案/saas-solutions/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/turnkey解决方案/turnkey-solutions/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/流动性/liquidity/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/情报/intelligence/g' {} \;

# 3. 更新JS文件中的路径
find . -name "*.js" -type f -exec sed -i '' 's/saas解决方案/saas-solutions/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/turnkey解决方案/turnkey-solutions/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/流动性/liquidity/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/情报/intelligence/g' {} \;

echo "✅ 路径更新完成"
echo ""
echo "🚀 现在可以提交并重新部署了"
echo ""
echo "执行以下命令："
echo "  git add ."
echo "  git commit -m 'Fix Chinese folder names'"
echo "  git push"
echo ""
echo "然后在Vercel控制台重新部署"
