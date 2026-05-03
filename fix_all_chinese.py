#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json

# 中文到英文的映射表
chinese_map = {
    '网格': 'grid',
    '线': 'line',
    '关于品牌': 'about-brand',
    '关于我们': 'about-us',
    '视频': 'video',
    '视频1': 'video1',
    '视频2': 'video2',
    '笔记本': 'notebook',
    '平板': 'tablet',
    '做市商': 'market-maker',
    '提示': 'tips',
    '演示': 'presentation',
    '链接': 'link',
    '（改）': '-alt',
    '（划线）': '-stroke',
}

def translate_filename(filename):
    """翻译文件名"""
    result = filename
    
    # 按长度降序替换，避免部分匹配
    for cn, en in sorted(chinese_map.items(), key=lambda x: len(x[0]), reverse=True):
        result = result.replace(cn, en)
    
    # 处理括号
    result = result.replace('（', '-').replace('）', '')
    result = result.replace('(', '-').replace(')', '')
    
    # 清理多余的连字符
    result = re.sub(r'-+', '-', result)
    result = result.strip('-')
    
    return result

def find_chinese_files(base_path):
    """查找所有包含中文的文件"""
    chinese_files = []
    chinese_dirs = []
    
    for root, dirs, files in os.walk(base_path):
        # 跳过不需要的目录
        if 'node_modules' in root or '.git' in root:
            continue
        
        # 检查文件夹
        for d in dirs:
            if re.search(r'[\u4e00-\u9fff]', d):
                chinese_dirs.append(os.path.join(root, d))
        
        # 检查文件
        for f in files:
            if re.search(r'[\u4e00-\u9fff]', f):
                chinese_files.append(os.path.join(root, f))
    
    return chinese_files, chinese_dirs

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    print("🔍 扫描中文文件...")
    chinese_files, chinese_dirs = find_chinese_files(base_path)
    
    print(f"找到 {len(chinese_files)} 个中文文件")
    print(f"找到 {len(chinese_dirs)} 个中文文件夹")
    
    # 创建重命名映射
    rename_map = {}
    
    # 先处理文件（从深到浅）
    for old_path in sorted(chinese_files, key=len, reverse=True):
        dir_name = os.path.dirname(old_path)
        file_name = os.path.basename(old_path)
        new_name = translate_filename(file_name)
        new_path = os.path.join(dir_name, new_name)
        
        # 避免重名
        counter = 1
        original_new = new_path
        while os.path.exists(new_path) and new_path != old_path:
            name, ext = os.path.splitext(original_new)
            new_path = f"{name}-{counter}{ext}"
            counter += 1
        
        rename_map[old_path] = new_path
        print(f"文件: {file_name} -> {os.path.basename(new_path)}")
    
    # 保存映射
    with open(os.path.join(base_path, 'rename_all_map.json'), 'w', encoding='utf-8') as f:
        json.dump(rename_map, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ 映射已保存到 rename_all_map.json")
    print("运行 python3 do_rename_all.py 执行重命名")

if __name__ == '__main__':
    main()
