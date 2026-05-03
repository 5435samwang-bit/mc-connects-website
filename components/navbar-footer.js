// ==========================================
// MC Connects - Footer 样式组件
// ==========================================

console.log('[Footer] 文件已加载 - v10');

// 注入 Footer 样式
function injectFooterStyles() {
    const oldStyles = document.getElementById('footer-unified-styles');
    if (oldStyles) {
        oldStyles.remove();
    }

    const styles = document.createElement('style');
    styles.id = 'footer-unified-styles';
    styles.textContent = `
        /* ========== Footer 样式 - 仅添加缺失的样式 ========== */
        .footer-logo img {
            width: 206px;
            height: 56px;
            object-fit: contain;
        }

        .footer-link-list li:hover {
            color: #0096ff;
            cursor: pointer;
        }
    `;

    document.head.appendChild(styles);
    console.log('[Footer] 样式已注入');
}

// 初始化 Footer 样式
function initFooter() {
    console.log('[Footer] 初始化开始...');
    injectFooterStyles();
    console.log('[Footer] 初始化完成');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}
