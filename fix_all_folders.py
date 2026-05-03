#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
import json

def find_chinese_folders(base_path):
    """查找所有中文文件夹"""
    chinese_folders = []
    
    for root, dirs, files in os.walk(base_path):
        if 'node_modules' in root or '.git' in root:
            continue
        
        for d in dirs:
            if any('\u4e00' <= c <= '\u9fff' for c in d):
                full_path = os.path.join(root, d)
                chinese_folders.append(full_path)
    
    return sorted(chinese_folders, key=len, reverse=True)

def translate_folder_name(name):
    """翻译文件夹名"""
    translations = {
        '模块1': 'module1',
        '模块2': 'module2',
        '模块3': 'module3',
        '模块4': 'module4',
        '模块5': 'module5',
    }
    return translations.get(name, name)

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    print("🔍 扫描中文文件夹...")
    chinese_folders = find_chinese_folders(base_path)
    
    print(f"找到 {len(chinese_folders)} 个中文文件夹")
    print("=" * 60)
    
    rename_map = {}
    
    for old_path in chinese_folders:
        parent = os.path.dirname(old_path)
        old_name = os.path.basename(old_path)
        new_name = translate_folder_name(old_name)
        new_path = os.path.join(parent, new_name)
        
        # 避免重名
        counter = 1
        original_new = new_path
        while os.path.exists(new_path) and new_path != old_path:
            new_path = f"{original_new}-{counter}"
            counter += 1
        
        rename_map[old_path] = new_path
        print(f"{old_name} -> {os.path.basename(new_path)}")
    
    # 保存映射
    with open(os.path.join(base_path, 'folder_rename_map.json'), 'w', encoding='utf-8') as f:
        json.dump(rename_map, f, ensure_ascii=False, indent=2)
    
    print("\n✅ 映射已保存到 folder_rename_map.json")
    print("运行 python3 do_rename_folders.py 执行重命名")

if __name__ == '__main__':
    main()
