#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import shutil

# 中文到英文的映射
chinese_map = {
    '部署检查清单': 'deployment-checklist',
    '立即部署': 'deploy-now',
    '登录并部署': 'login-and-deploy',
    '继续部署': 'continue-deploy',
    '快速部署': 'quick-deploy',
    '部署命令': 'deploy-commands',
}

def translate_filename(filename):
    """翻译文件名"""
    result = filename
    for cn, en in chinese_map.items():
        result = result.replace(cn, en)
    return result

def find_chinese_files(base_path):
    """查找所有中文文件"""
    chinese_files = []
    for root, dirs, files in os.walk(base_path):
        if 'node_modules' in root or '.git' in root:
            continue
        for f in files:
            if re.search(r'[\u4e00-\u9fff]', f):
                chinese_files.append(os.path.join(root, f))
    return chinese_files

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    print("🔍 扫描中文文件...")
    chinese_files = find_chinese_files(base_path)
    
    print(f"找到 {len(chinese_files)} 个中文文件")
    print("=" * 60)
    
    for old_path in chinese_files:
        dir_name = os.path.dirname(old_path)
        old_name = os.path.basename(old_path)
        new_name = translate_filename(old_name)
        new_path = os.path.join(dir_name, new_name)
        
        if old_path != new_path and not os.path.exists(new_path):
            try:
                shutil.move(old_path, new_path)
                print(f"✅ {old_name} -> {new_name}")
            except Exception as e:
                print(f"❌ {old_name}: {e}")
    
    print("\n✅ 修复完成！")

if __name__ == '__main__':
    main()
