#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import shutil

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    # 读取映射关系
    with open(os.path.join(base_path, 'rename_map.json'), 'r', encoding='utf-8') as f:
        rename_map = json.load(f)
    
    print("🚀 开始重命名...")
    print("=" * 50)
    
    # 按路径长度降序排序，确保先处理深层目录
    sorted_items = sorted(rename_map.items(), key=lambda x: len(x[0]), reverse=True)
    
    # 执行重命名
    for old_path, new_path in sorted_items:
        if os.path.exists(old_path):
            try:
                shutil.move(old_path, new_path)
                print(f"✅ {os.path.basename(old_path)}")
            except Exception as e:
                print(f"❌ {os.path.basename(old_path)}: {e}")
    
    print("\n" + "=" * 50)
    print("✅ 重命名完成！")
    print("\n现在需要更新HTML文件中的引用...")

if __name__ == '__main__':
    main()
