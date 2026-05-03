#!/bin/bash

echo "🔧 修复 web-home 中的中文文件夹"
echo "================================"
echo ""

cd /Users/sam/Desktop/导出预览/其他/web/web-home

# 重命名中文文件夹
if [ -d "模块1" ]; then
    mv "模块1" "module1"
    echo "✅ 模块1 -> module1"
fi

if [ -d "模块2" ]; then
    mv "模块2" "module2"
    echo "✅ 模块2 -> module2"
fi

if [ -d "模块3" ]; then
    mv "模块3" "module3"
    echo "✅ 模块3 -> module3"
fi

if [ -d "模块4" ]; then
    mv "模块4" "module4"
    echo "✅ 模块4 -> module4"
fi

if [ -d "模块5" ]; then
    mv "模块5" "module5"
    echo "✅ 模块5 -> module5"
fi

cd /Users/sam/Desktop/导出预览/其他/web

echo ""
echo "📝 更新HTML文件中的路径..."

# 更新所有HTML文件中的路径
find . -name "*.html" -type f -exec sed -i '' 's/模块1/module1/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/模块2/module2/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/模块3/module3/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/模块4/module4/g' {} \;
find . -name "*.html" -type f -exec sed -i '' 's/模块5/module5/g' {} \;

# 更新JS文件
find . -name "*.js" -type f -exec sed -i '' 's/模块1/module1/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/模块2/module2/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/模块3/module3/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/模块4/module4/g' {} \;
find . -name "*.js" -type f -exec sed -i '' 's/模块5/module5/g' {} \;

echo "✅ 修复完成"
echo ""
echo "🚀 请提交并重新部署"
