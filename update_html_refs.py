#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

# 定义替换规则
replacements = {
    '做市商.png': 'market-maker.png',
    '关于品牌.mp4': 'about-brand.mp4',
    '网格.svg': 'grid.svg',
    '线.svg': 'line.svg',
    '平板.png': 'tablet.png',
    '笔记本.png': 'notebook.png',
    '关于我们（改）.png': 'about-us-alt.png',
}

def update_file(file_path):
    """更新单个文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # 执行替换
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # 如果有变化，写回文件
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"❌ 更新失败 {file_path}: {e}")
        return False

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    print("📝 更新HTML文件中的引用...")
    print("=" * 60)
    
    updated = 0
    
    # 遍历所有HTML文件
    for root, dirs, files in os.walk(base_path):
        if 'node_modules' in root or '.git' in root:
            continue
        
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if update_file(file_path):
                    print(f"✅ 已更新: {file}")
                    updated += 1
    
    # 同时更新JS文件
    for root, dirs, files in os.walk(base_path):
        if 'node_modules' in root or '.git' in root:
            continue
        
        for file in files:
            if file.endswith('.js'):
                file_path = os.path.join(root, file)
                if update_file(file_path):
                    print(f"✅ 已更新: {file}")
                    updated += 1
    
    print("=" * 60)
    print(f"✅ 共更新 {updated} 个文件")
    print("\n🚀 现在可以提交并推送了！")

if __name__ == '__main__':
    main()
