#!/bin/bash

# MC Connects 网站部署脚本
# 使用方式: ./deploy.sh

echo "🚀 MC Connects 网站部署脚本"
echo "================================"

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ 错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查 Git 是否初始化
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git 未初始化，正在初始化...${NC}"
    git init
    git add .
    git commit -m "Initial commit"
fi

echo ""
echo "📋 部署选项:"
echo "1) 部署到 Vercel (推荐)"
echo "2) 仅推送到 GitHub"
echo "3) 退出"
echo ""
read -p "请选择 (1-3): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}📝 准备部署到 Vercel...${NC}"
        
        # 检查是否已关联远程仓库
        if ! git remote -v > /dev/null 2>&1; then
            echo ""
            echo "⚠️  未关联远程仓库"
            echo "请在 GitHub 创建仓库后，输入仓库地址:"
            echo "示例: https://github.com/username/mc-connects-website.git"
            read -p "仓库地址: " repo_url
            
            if [ -z "$repo_url" ]; then
                echo -e "${RED}❌ 仓库地址不能为空${NC}"
                exit 1
            fi
            
            git remote add origin "$repo_url"
        fi
        
        # 推送代码
        echo ""
        echo -e "${YELLOW}📤 推送代码到 GitHub...${NC}"
        git branch -M main
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ 代码已推送到 GitHub${NC}"
            echo ""
            echo "🌐 请在浏览器中访问: https://vercel.com/new"
            echo "   导入你的仓库并点击 Deploy"
            echo ""
            echo -e "${YELLOW}💡 提示: 你也可以安装 Vercel CLI 后运行 'vercel --prod' 直接部署${NC}"
        else
            echo -e "${RED}❌ 推送失败，请检查网络连接或仓库权限${NC}"
        fi
        ;;
        
    2)
        echo ""
        echo -e "${YELLOW}📤 推送到 GitHub...${NC}"
        
        if ! git remote -v > /dev/null 2>&1; then
            echo ""
            echo "⚠️  未关联远程仓库"
            echo "请输入 GitHub 仓库地址:"
            read -p "仓库地址: " repo_url
            git remote add origin "$repo_url"
        fi
        
        git branch -M main
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ 推送成功！${NC}"
        else
            echo -e "${RED}❌ 推送失败${NC}"
        fi
        ;;
        
    3)
        echo "退出"
        exit 0
        ;;
        
    *)
        echo -e "${RED}❌ 无效选项${NC}"
        exit 1
        ;;
esac
