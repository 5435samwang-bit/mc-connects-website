#!/bin/bash

echo "🔧 修复所有中文文件名"
echo "====================="
echo ""

cd /Users/sam/Desktop/导出预览/其他/web

# 定义文件名映射
declare -A rename_map=(
    ["首页.mp4"]="homepage.mp4"
    ["白标.gif"]="white-label.gif"
    ["网格.svg"]="grid.svg"
    ["iPhone样机.png"]="iphone-mockup.png"
    ["image-phone.png"]="image-phone.png"
    ["做市商.png"]="market-maker.png"
    ["笔记本.png"]="notebook.png"
    ["平板.png"]="tablet.png"
    ["关于品牌.mp4"]="about-brand.mp4"
    ["线.svg"]="line.svg"
    ["视频.mp4"]="video.mp4"
    ["video1.mp4"]="video1.mp4"
)

# 遍历并重命名文件
echo "📁 重命名文件..."
for old_name in "${!rename_map[@]}"; do
    new_name="${rename_map[$old_name]}"
    # 使用 find 查找并重命名
    find . -name "$old_name" -type f 2>/dev/null | while read file; do
        dir=$(dirname "$file")
        if [ -f "$file" ]; then
            mv "$file" "$dir/$new_name" 2>/dev/null && echo "✅ $old_name -> $new_name"
        fi
    done
done

echo ""
echo "📝 更新HTML文件中的引用..."

# 更新HTML中的引用
sed -i '' 's/首页\.mp4/homepage.mp4/g' *.html 2>/dev/null
sed -i '' 's/白标\.gif/white-label.gif/g' *.html 2>/dev/null
sed -i '' 's/网格\.svg/grid.svg/g' *.html 2>/dev/null
sed -i '' 's/iPhone样机\.png/iphone-mockup.png/g' *.html 2>/dev/null
sed -i '' 's/做市商\.png/market-maker.png/g' *.html 2>/dev/null
sed -i '' 's/笔记本\.png/notebook.png/g' *.html 2>/dev/null
sed -i '' 's/平板\.png/tablet.png/g' *.html 2>/dev/null
sed -i '' 's/关于品牌\.mp4/about-brand.mp4/g' *.html 2>/dev/null
sed -i '' 's/线\.svg/line.svg/g' *.html 2>/dev/null

echo "✅ 修复完成"
echo ""
