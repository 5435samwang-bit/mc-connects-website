#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import shutil

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    # 读取映射
    with open(os.path.join(base_path, 'rename_all_map.json'), 'r', encoding='utf-8') as f:
        rename_map = json.load(f)
    
    print("🚀 开始重命名...")
    print("=" * 60)
    
    success = 0
    failed = 0
    
    # 按路径长度降序排序（先处理深层文件）
    for old_path, new_path in sorted(rename_map.items(), key=lambda x: len(x[0]), reverse=True):
        if os.path.exists(old_path):
            try:
                # 确保目标目录存在
                new_dir = os.path.dirname(new_path)
                if not os.path.exists(new_dir):
                    os.makedirs(new_dir, exist_ok=True)
                
                shutil.move(old_path, new_path)
                print(f"✅ {os.path.basename(old_path)}")
                success += 1
            except Exception as e:
                print(f"❌ {os.path.basename(old_path)}: {e}")
                failed += 1
    
    print("=" * 60)
    print(f"✅ 成功: {success}")
    print(f"❌ 失败: {failed}")
    print("\n📝 现在需要更新HTML文件中的引用...")
    print("运行: python3 update_html_refs.py")

if __name__ == '__main__':
    main()
