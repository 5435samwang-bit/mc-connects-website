#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import shutil

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    # 读取映射
    with open(os.path.join(base_path, 'folder_rename_map.json'), 'r', encoding='utf-8') as f:
        rename_map = json.load(f)
    
    print("🚀 开始重命名文件夹...")
    print("=" * 60)
    
    success = 0
    failed = 0
    
    # 按路径长度降序排序（先处理深层目录）
    for old_path, new_path in sorted(rename_map.items(), key=lambda x: len(x[0]), reverse=True):
        if os.path.exists(old_path):
            try:
                # 如果目标已存在，先删除
                if os.path.exists(new_path):
                    shutil.rmtree(new_path)
                
                shutil.move(old_path, new_path)
                print(f"✅ {os.path.basename(old_path)} -> {os.path.basename(new_path)}")
                success += 1
            except Exception as e:
                print(f"❌ {os.path.basename(old_path)}: {e}")
                failed += 1
    
    print("=" * 60)
    print(f"✅ 成功: {success}")
    print(f"❌ 失败: {failed}")
    print("\n📝 现在需要更新HTML文件中的引用...")
    print("运行: python3 update_all_refs.py")

if __name__ == '__main__':
    main()
