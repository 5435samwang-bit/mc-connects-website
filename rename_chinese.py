#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json

# 定义中文到英文的映射
chinese_to_english = {
    '模块': 'module',
    '首页': 'homepage',
    '白标': 'white-label',
    '网格': 'grid',
    '样机': 'mockup',
    '做市商': 'market-maker',
    '笔记本': 'notebook',
    '平板': 'tablet',
    '关于品牌': 'about-brand',
    '关于我们': 'about-us',
    '线': 'line',
    '视频': 'video',
    '情报': 'intelligence',
    '流动性': 'liquidity',
    '图标': 'icon',
    '图片': 'image',
    '背景': 'bg',
    '按钮': 'button',
    '卡片': 'card',
    '容器': 'container',
    '框架': 'frame',
    '组': 'group',
    '遮罩': 'mask',
    '矢量': 'vector',
    '分割': 'divider',
    '默认': 'default',
    '悬停': 'hover',
    '电话': 'phone',
    '链接': 'link',
    '提示': 'tips',
    '演示': 'presention',
    '图表': 'chart',
    '转换': 'convert',
    '刷新': 'refresh',
    '发送': 'send',
    '播放': 'play',
    '音乐': 'music',
    '箭头': 'arrow',
    '左': 'left',
    '右': 'right',
    '上': 'up',
    '下': 'down',
    '减': 'minus',
    '加': 'plus',
    '圆': 'circle',
    '减号': 'minus',
    '加号': 'plus',
    '状态': 'status',
    '向上': 'up',
    '趋势': 'trend',
    '家': 'home',
    '标签': 'tag',
    '哈希': 'hashtag',
    '监视器': 'monitor',
    '移动': 'mobile',
    '滑块': 'slider',
    '水平': 'horizontal',
    '计时器': 'timer',
    '交易': 'trade',
    '3D': '3d',
    '旋转': 'rotate',
    '盒子': 'box',
    '添加': 'add',
    '类别': 'category',
    '立方体': 'cube',
    '主页': 'home',
    '图像': 'image',
    '手机': 'phone',
    '减圆形': 'minus-circle',
    '添加圆形': 'add-circle',
    '减去': 'subtract',
    '地图': 'map',
    '视频1': 'video1',
    '视频2': 'video2',
    '（改）': '-alt',
    '（划线）': '-stroke',
}

def translate_filename(filename):
    """将中文文件名翻译成英文"""
    result = filename
    
    # 按长度降序排序，避免部分匹配
    for chinese, english in sorted(chinese_to_english.items(), key=lambda x: len(x[0]), reverse=True):
        result = result.replace(chinese, english)
    
    # 移除括号
    result = result.replace('（', '-').replace('）', '')
    result = result.replace('(', '-').replace(')', '')
    
    # 将空格替换为连字符
    result = result.replace(' ', '-')
    
    # 移除多余的连字符
    result = re.sub(r'-+', '-', result)
    result = result.strip('-')
    
    return result

def scan_and_rename(base_path):
    """扫描并重命名所有文件"""
    rename_map = {}
    
    for root, dirs, files in os.walk(base_path):
        # 跳过 node_modules 和 .git
        if 'node_modules' in root or '.git' in root:
            continue
            
        # 处理文件
        for filename in files:
            # 检查是否包含中文字符
            if re.search(r'[\u4e00-\u9fff]', filename):
                old_path = os.path.join(root, filename)
                new_filename = translate_filename(filename)
                new_path = os.path.join(root, new_filename)
                
                # 如果新文件名已存在，添加数字后缀
                counter = 1
                original_new_path = new_path
                while os.path.exists(new_path) and new_path != old_path:
                    name, ext = os.path.splitext(original_new_path)
                    new_path = f"{name}-{counter}{ext}"
                    counter += 1
                
                rename_map[old_path] = new_path
                print(f"文件: {filename} -> {new_filename}")
        
        # 处理文件夹（从深到浅）
        for dirname in dirs[:]:  # 使用切片复制列表
            if re.search(r'[\u4e00-\u9fff]', dirname):
                old_path = os.path.join(root, dirname)
                new_dirname = translate_filename(dirname)
                new_path = os.path.join(root, new_dirname)
                
                # 如果新文件夹名已存在
                counter = 1
                original_new_path = new_path
                while os.path.exists(new_path) and new_path != old_path:
                    new_path = f"{original_new_path}-{counter}"
                    counter += 1
                
                rename_map[old_path] = new_path
                print(f"文件夹: {dirname} -> {new_dirname}")
    
    return rename_map

def main():
    base_path = '/Users/sam/Desktop/导出预览/其他/web'
    
    print("🔍 扫描中文文件名...")
    print("=" * 50)
    
    rename_map = scan_and_rename(base_path)
    
    print("\n" + "=" * 50)
    print(f"找到 {len(rename_map)} 个需要重命名的项目")
    
    # 保存映射关系
    with open(os.path.join(base_path, 'rename_map.json'), 'w', encoding='utf-8') as f:
        json.dump(rename_map, f, ensure_ascii=False, indent=2)
    
    print("\n映射关系已保存到 rename_map.json")
    print("\n要执行重命名，请运行: python3 do_rename.py")

if __name__ == '__main__':
    main()
