// ==========================================
// MC Connects - Navbar 组件
// 根据 Figma 设计稿: https://www.figma.com/design/RWgLdpjuX2GvEFkAmcUmnu/Design-Panel
// Node ID: 1171:5403
// ==========================================

console.log('[Navbar] 文件已加载 - v10');

// 路径工具函数
function getRelativePrefix() {
    const path = decodeURIComponent(window.location.pathname);
    const subPages = ['trading-system', 'crm', 'payment-solutions', 'risk-control', 'asset-management'];
    for (const page of subPages) {
        if (path.includes(page)) {
            return './';
        }
    }
    return './';
}

function getCurrentProject() {
    const path = window.location.pathname.toLowerCase();
    // SaaS Solutions pages
    if (path.includes('trading-system')) return 'trading-system';
    if (path.includes('crm')) return 'crm';
    if (path.includes('payment-solutions')) return 'payment-solutions';
    if (path.includes('risk-control')) return 'risk-control';
    if (path.includes('asset-management')) return 'asset-management';
    // Turnkey Solutions pages
    if (path.includes('market-maker-turnkey')) return 'market-maker-turnkey';
    if (path.includes('brokerage')) return 'brokerage';
    if (path.includes('exchanges')) return 'exchanges';
    if (path.includes('financial-institutions')) return 'financial-institutions';
    if (path.includes('hedge-funds')) return 'hedge-funds';
    if (path.includes('quantitative-teams')) return 'quantitative-teams';
    // Liquidity pages
    if (path.includes('liquidity-provider')) return 'liquidity-provider';
    if (path.includes('data-provider')) return 'data-provider';
    // News & Insights
    if (path.includes('news-insights')) return 'news-insights';
    if (path.includes('news-detail')) return 'news-insights';
    if (path.includes('news-tag')) return 'news-insights';
    // About Us
    if (path.includes('about-us')) return 'about-us';
    return 'home';
}

// 导航功能函数
function goToHome() {
    const prefix = getRelativePrefix();
    window.location.href = prefix + 'index.html';
}

function goHome() {
    goToHome();
}

function goToTopAndRefresh() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// 页面导航函数
function navigateToPage(pageName) {
    const prefix = getRelativePrefix();
    window.location.href = prefix + pageName + '.html';
}

// 下拉框管理
let activeDropdown = null;

function initDropdowns() {
    console.log('[Navbar] 初始化下拉框...');
    const dropdownTabs = document.querySelectorAll('[data-dropdown]');
    console.log('[Navbar] 找到', dropdownTabs.length, '个下拉框 tab');
    
    if (dropdownTabs.length === 0) {
        console.log('[Navbar] 未找到下拉框 tab，跳过初始化');
        return;
    }
    
    dropdownTabs.forEach(tab => {
        const dropdownName = tab.getAttribute('data-dropdown');
        const menu = document.querySelector(`[data-dropdown-menu="${dropdownName}"]`);
        
        console.log('[Navbar] 下拉框:', dropdownName, menu ? '找到菜单' : '未找到菜单');
        
        if (!menu) return;
        
        // 点击 tab 切换下拉框
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('[Navbar] 点击 tab:', dropdownName);
            
            // 如果当前下拉框已打开，则关闭
            if (activeDropdown === dropdownName) {
                closeDropdown(dropdownName);
                return;
            }
            
            // 关闭其他下拉框
            closeAllDropdowns();
            
            // 打开当前下拉框
            openDropdown(dropdownName);
        });
    });
    
    // 点击页面其他地方关闭下拉框
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });
    
    console.log('[Navbar] 下拉框初始化完成');
}

// ========== 更多按钮功能 ==========
let moreDropdownOpen = false;
let overflowTabs = [];

function initMoreButton() {
    console.log('[Navbar] 初始化更多按钮...');
    updateMoreButton();
    
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(updateMoreButton, 100));
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', (e) => {
        const moreButton = document.getElementById('moreButton');
        const moreDropdownMenu = document.getElementById('moreDropdownMenu');
        if (moreDropdownOpen && moreButton && moreDropdownMenu) {
            if (!moreButton.contains(e.target) && !moreDropdownMenu.contains(e.target)) {
                closeMoreDropdown();
            }
        }
    });
    
    console.log('[Navbar] 更多按钮初始化完成');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateMoreButton() {
    const navTabs = document.getElementById('navTabsLeft');
    const moreButton = document.getElementById('moreButton');
    const moreDropdownMenu = document.getElementById('moreDropdownMenu');

    if (!navTabs || !moreButton || !moreDropdownMenu) return;

    // 获取所有tab
    const allTabs = Array.from(navTabs.querySelectorAll('[data-nav-tab]'));

    // 先重置所有tab的显示状态
    allTabs.forEach(tab => {
        tab.classList.remove('tab--in-more');
    });

    // 计算哪些tab超出了容器
    overflowTabs = [];
    const navTabsRect = navTabs.getBoundingClientRect();
    const gap = 8;

    // 使用完整的左侧容器宽度
    const availableWidth = navTabsRect.width;
    let currentWidth = 0;

    for (let i = 0; i < allTabs.length; i++) {
        const tab = allTabs[i];
        const tabWidth = tab.offsetWidth + gap;

        if (currentWidth + tabWidth > availableWidth) {
            // 这个tab及之后的tab都需要收纳到更多菜单
            for (let j = i; j < allTabs.length; j++) {
                allTabs[j].classList.add('tab--in-more');
                overflowTabs.push(allTabs[j]);
            }
            break;
        }
        currentWidth += tabWidth;
    }

    // 更新更多按钮的显示状态
    if (overflowTabs.length > 0) {
        moreButton.classList.add('more-button--visible');
        updateMoreDropdownMenu();
    } else {
        moreButton.classList.remove('more-button--visible');
        closeMoreDropdown();
    }
}

function updateMoreDropdownMenu() {
    const moreDropdownMenu = document.getElementById('moreDropdownMenu');
    if (!moreDropdownMenu) return;
    
    // 清空现有内容
    moreDropdownMenu.innerHTML = '';
    
    // 为每个溢出的tab创建下拉菜单项
    overflowTabs.forEach(tab => {
        const menuItem = document.createElement('div');
        menuItem.className = 'more-dropdown-item';
        
        // 获取tab的文本
        const tabText = tab.querySelector('.tab-text');
        if (tabText) {
            menuItem.textContent = tabText.textContent;
        }
        
        // 复制tab的点击事件
        const tabOnclick = tab.getAttribute('onclick');
        const dropdownName = tab.querySelector('[data-dropdown]')?.getAttribute('data-dropdown');
        
        menuItem.addEventListener('click', () => {
            closeMoreDropdown();
            
            if (tabOnclick) {
                // 执行原tab的点击事件
                eval(tabOnclick);
            } else if (dropdownName) {
                // 如果是下拉菜单tab，打开对应的下拉菜单
                const dropdownTab = document.querySelector(`[data-dropdown="${dropdownName}"]`);
                if (dropdownTab) {
                    dropdownTab.click();
                }
            }
        });
        
        moreDropdownMenu.appendChild(menuItem);
    });
}

function toggleMoreDropdown(event) {
    event.stopPropagation();
    
    if (moreDropdownOpen) {
        closeMoreDropdown();
    } else {
        openMoreDropdown();
    }
}

function openMoreDropdown() {
    const moreButton = document.getElementById('moreButton');
    const moreDropdownMenu = document.getElementById('moreDropdownMenu');
    
    if (moreButton && moreDropdownMenu) {
        // 关闭其他下拉框
        closeAllDropdowns();
        
        moreButton.classList.add('more-button--open');
        moreDropdownMenu.classList.add('more-dropdown-menu--visible');
        moreDropdownOpen = true;
    }
}

function closeMoreDropdown() {
    const moreButton = document.getElementById('moreButton');
    const moreDropdownMenu = document.getElementById('moreDropdownMenu');
    
    if (moreButton && moreDropdownMenu) {
        moreButton.classList.remove('more-button--open');
        moreDropdownMenu.classList.remove('more-dropdown-menu--visible');
        moreDropdownOpen = false;
    }
}

// 清除所有 tab 的选中状态
function clearAllTabActiveStates() {
    // 清除所有 tab 的选中状态
    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(t => {
        t.classList.remove('tab--active');
        t.classList.add('tab--default');
    });
}

function openDropdown(dropdownName) {
    console.log('[Navbar] 打开下拉框:', dropdownName);
    const tab = document.querySelector(`[data-dropdown="${dropdownName}"]`);
    const menu = document.querySelector(`[data-dropdown-menu="${dropdownName}"]`);

    console.log('[Navbar] tab:', tab, 'menu:', menu);

    if (tab && menu) {
        // 先清除所有 tab 的选中状态（实现单选）
        clearAllTabActiveStates();

        // 添加下拉框打开状态样式（箭头旋转）
        tab.classList.add('tab--dropdown-open');
        // 添加选中状态样式（白色背景）
        tab.classList.remove('tab--default');
        tab.classList.add('tab--active');
        menu.classList.add('dropdown-menu--visible');
        activeDropdown = dropdownName;
        console.log('[Navbar] 下拉框已打开');
    } else {
        console.log('[Navbar] 未找到 tab 或 menu');
    }
}

function closeDropdown(dropdownName) {
    const tab = document.querySelector(`[data-dropdown="${dropdownName}"]`);
    const menu = document.querySelector(`[data-dropdown-menu="${dropdownName}"]`);

    if (tab && menu) {
        // 移除下拉框打开状态样式
        tab.classList.remove('tab--dropdown-open');
        // 移除选中状态样式，恢复默认状态
        tab.classList.remove('tab--active');
        tab.classList.add('tab--default');
        menu.classList.remove('dropdown-menu--visible');
        activeDropdown = null;

        // 恢复当前页面的选中状态
        restoreCurrentPageTabState();
    }
}

function closeAllDropdowns() {
    if (activeDropdown) {
        closeDropdown(activeDropdown);
    }
}

// 恢复当前页面的 tab 选中状态
function restoreCurrentPageTabState() {
    const currentProject = getCurrentProject();
    const isHome = currentProject === 'home';

    // 清除所有 tab 的选中状态
    clearAllTabActiveStates();

    // 根据当前页面设置对应的 tab 为选中状态
    if (isHome) {
        const homeTab = document.querySelector('.tab[onclick="goHome()"]');
        if (homeTab) {
            homeTab.classList.remove('tab--default');
            homeTab.classList.add('tab--active');
        }
    } else if (['trading-system', 'crm', 'payment-solutions', 'risk-control', 'asset-management'].includes(currentProject)) {
        // SaaS Solutions 页面，Services tab 选中
        const servicesTab = document.querySelector('[data-dropdown="services"]');
        if (servicesTab) {
            servicesTab.classList.remove('tab--default');
            servicesTab.classList.add('tab--active');
        }
    } else if (['market-maker-turnkey', 'brokerage', 'exchanges', 'financial-institutions', 'hedge-funds', 'quantitative-teams'].includes(currentProject)) {
        // Turnkey Solutions 页面，Solutions tab 选中
        const solutionsTab = document.querySelector('[data-dropdown="solutions"]');
        if (solutionsTab) {
            solutionsTab.classList.remove('tab--default');
            solutionsTab.classList.add('tab--active');
        }
    } else if (['liquidity-provider', 'data-provider'].includes(currentProject)) {
        // Liquidity 页面，Liquidity tab 选中
        const liquidityTab = document.querySelector('[data-dropdown="liquidity"]');
        if (liquidityTab) {
            liquidityTab.classList.remove('tab--default');
            liquidityTab.classList.add('tab--active');
        }
    } else if (currentProject === 'news-insights') {
        // News & Insights 页面，Intelligence tab 选中
        const intelligenceTab = document.querySelector('[data-nav-tab="intelligence"]');
        if (intelligenceTab) {
            intelligenceTab.classList.remove('tab--default');
            intelligenceTab.classList.add('tab--active');
        }
    } else if (currentProject === 'about-us') {
        // About Us 页面，About Us tab 选中
        const aboutTab = document.querySelector('[data-nav-tab="about"]');
        if (aboutTab) {
            aboutTab.classList.remove('tab--default');
            aboutTab.classList.add('tab--active');
        }
    }
}

// 注入 Navbar 样式 - 严格按照 Figma 设计稿 Node 1171:5403
function injectNavbarStyles() {
    const oldStyles = document.getElementById('navbar-unified-styles');
    if (oldStyles) {
        oldStyles.remove();
    }
    
    const styles = document.createElement('style');
    styles.id = 'navbar-unified-styles';
    styles.textContent = `
        /* ========== Navbar 外层容器 ========== */
        /* Node: 1171:5403 - backdrop-blur-[6px] content-stretch flex flex-col items-start px-[120px] */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0 120px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-sizing: border-box;
        }
        
        /* ========== Navbar 内层容器 ========== */
        /* Node: 1171:5404 - border-[rgba(255,255,255,0.5)] border-b border-solid content-stretch flex gap-[24px] items-center */
        .navbar-container {
            display: flex;
            gap: 24px;
            align-items: center;
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
            box-sizing: border-box;
        }
        
        /* ========== Logo 区域 ========== */
        /* Node: 1171:5405 - h-[80px] overflow-clip relative shrink-0 w-[207px] */
        .logo-section {
            width: 207px;
            height: 80px;
            overflow: hidden;
            position: relative;
            flex-shrink: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Logo 图片 */
        .logo-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        /* ========== 导航 Tabs 外层容器 ========== */
        .nav-tabs-container {
            display: flex;
            flex: 1 0 0;
            min-width: 0;
            background: rgba(0, 0, 0, 0.15);
            border-radius: 16px;
            padding: 8px;
            position: relative;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
        }

        /* ========== 导航 Tabs 左侧区域 ========== */
        /* Node: 1171:5416 - bg-[rgba(0,0,0,0.1)] content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px p-[8px] rounded-[16px] */
        .nav-tabs {
            display: flex;
            gap: 8px;
            align-items: center;
            flex: 1 0 0;
            min-width: 0;
            overflow: visible;
        }

        /* 被收纳的tab隐藏 */
        .tab--in-more {
            display: none !important;
        }

        /* ========== 导航 Tabs 右侧区域（More按钮） ========== */
        .nav-tabs-right {
            position: relative;
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
        
        /* ========== Tab 按钮基础样式 ========== */
        /* Node: 1171:5417 - default tab content-stretch flex gap-[4px] items-center px-[16px] py-[12px] rounded-[8px] shrink-0 */
        .tab {
            display: flex;
            gap: 4px;
            align-items: center;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            flex-shrink: 0;
        }
        
        /* Node: I1171:5417;39:56 - font-['Onest:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[16px] text-white */
        .tab-text {
            font-family: 'Onest', 'Noto Sans JP', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: normal;
            color: white;
            white-space: nowrap;
        }
        
        /* Tab icon - size-[16px] */
        .tab-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
        }
        
        /* ========== Tab 激活状态 - Services 选中状态 ========== */
        /* Node: 1171:5418 - bg-white content-stretch flex gap-[4px] items-center justify-center px-[16px] py-[12px] rounded-[8px] shrink-0 */
        .tab--active {
            background: white;
            justify-content: center;
        }
        
        /* Node: I1171:5418;39:51 - font-['Onest:SemiBold','Noto_Sans_JP:Bold',sans-serif] font-semibold text-[#333] */
        .tab--active .tab-text {
            font-family: 'Onest', 'Noto Sans JP', sans-serif;
            font-weight: 600;
            color: #333;
        }
        
        /* Active tab icon stroke color */
        .tab--active .tab-icon path {
            stroke: #333;
        }
        
        /* ========== Tab 默认状态 ========== */
        .tab--default {
            background: transparent;
            transition: background 0.2s ease;
        }
        
        .tab--default .tab-text {
            font-weight: 400;
            color: white;
            transition: font-weight 0.2s ease;
        }
        
        /* ========== Tab Hover 状态 ========== */
        /* Node: 1171:5419 - bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[4px] items-center px-[16px] py-[12px] rounded-[8px] shrink-0 */
        .tab--default:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        /* Node: I1171:5419;39:61 - font-['Onest:SemiBold','Noto_Sans_JP:Bold',sans-serif] font-semibold text-[16px] text-white */
        .tab--default:hover .tab-text {
            font-weight: 600;
        }
        
        /* ========== 右侧区域 ========== */
        /* Node: 1171:5423 - content-stretch flex gap-[16px] items-center justify-end shrink-0 */
        .nav-right {
            display: flex;
            gap: 16px;
            align-items: center;
            justify-content: flex-end;
            flex-shrink: 0;
        }
        
        /* ========== Contact Us 按钮容器 ========== */
        /* Node: 1171:5424 - bg-[rgba(0,0,0,0.1)] content-stretch flex flex-col items-center p-[8px] rounded-[16px] shrink-0 */
        .contact-wrapper {
            background: rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px;
            border-radius: 16px;
            flex-shrink: 0;
        }
        
        .contact-section {
            cursor: pointer;
        }
        
        /* Node: 1171:5425 - content-stretch flex gap-[4px] items-center px-[16px] py-[12px] rounded-[8px] shrink-0 */
        .contact-tab {
            display: flex;
            gap: 4px;
            align-items: center;
            padding: 12px 16px;
            border-radius: 8px;
        }
        
        /* Node: I1171:5425;39:55 - call icon size-[16px] */
        .contact-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
        }
        
        /* Node: I1171:5425;39:56 - font-['Onest:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[16px] text-white */
        .contact-text {
            font-family: 'Onest', 'Noto Sans JP', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: normal;
            color: white;
            white-space: nowrap;
        }
        
        /* ========== 分隔线 ========== */
        /* Node: 1171:5426 - h-[48px] relative shrink-0 w-0 */
        .divider {
            height: 48px;
            position: relative;
            flex-shrink: 0;
            width: 1px;
        }
        
        .divider-line {
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
        }
        
        /* ========== 图标按钮 ========== */
        /* Node: 1171:5427, 1171:5428 - size-[24px] */
        .action-icon {
            width: 24px;
            height: 24px;
            cursor: pointer;
            flex-shrink: 0;
        }
        
        /* ========== 下拉框容器 ========== */
        .tab-dropdown-wrapper {
            position: relative;
        }
        
        /* ========== 下拉框样式 ========== */
        /* Node: 1171:5500 - card bg-[#202121] border border-[#363737] */
        .dropdown-menu {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            min-width: 220px;
            background: #202121;
            border: 1px solid #363737;
            border-radius: 16px;
            padding: 4px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            pointer-events: none;
        }
        
        .dropdown-menu--visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
        }

        /* ========== 更多按钮 ========== */
        .more-button {
            display: none;
            gap: 4px;
            align-items: center;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            flex-shrink: 0;
            background: transparent;
            border: none;
            color: white;
            font-family: 'Onest', 'Noto Sans JP', sans-serif;
            font-weight: 400;
            font-size: 16px;
        }

        .more-button--visible {
            display: flex;
        }

        .more-button:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .more-button .tab-icon {
            transition: transform 0.2s ease;
        }

        .more-button--open .tab-icon {
            transform: rotate(180deg);
        }

        /* 更多按钮下拉菜单 */
        .more-dropdown-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            min-width: 180px;
            background: #202121;
            border: 1px solid #363737;
            border-radius: 16px;
            padding: 4px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            pointer-events: none;
        }

        .more-dropdown-menu--visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
        }

        .more-dropdown-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s ease;
            font-family: 'Onest', sans-serif;
            font-weight: 400;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
            white-space: nowrap;
        }

        .more-dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #0096ff;
        }

        /* ========== 下拉框选项 ========== */
        /* Node: 1171:5497 - active tab bg-[rgba(255,255,255,0.1)] */
        .dropdown-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        
        .dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        /* Node: 1171:5496 - active text font-['Onest:SemiBold',sans-serif] text-[#0096ff] */
        .dropdown-item--active {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .dropdown-item--active .dropdown-item-text {
            font-weight: 600;
            color: #0096ff;
        }
        
        /* Node: 1171:5499, 1171:5502, 1171:5505, 1171:5508 - default text font-['Onest:Regular',sans-serif] text-[rgba(255,255,255,0.6)] */
        .dropdown-item-text {
            font-family: 'Onest', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: normal;
            color: rgba(255, 255, 255, 0.6);
            white-space: nowrap;
        }
        
        .dropdown-item:hover .dropdown-item-text {
            color: #0096ff;
        }
        
        /* Tab 箭头旋转动画 */
        .tab--dropdown-open .tab-icon {
            transform: rotate(180deg);
            transition: transform 0.2s ease;
        }
        
        .tab-icon {
            transition: transform 0.2s ease;
        }
    `;
    
    document.head.appendChild(styles);
    console.log('[Navbar] 样式已注入');
}

// 生成统一 Navbar HTML - 严格按照 Figma 设计稿
function generateNavbar() {
    const currentProject = getCurrentProject();
    const isHome = currentProject === 'home';
    const prefix = getRelativePrefix();
    
    // 判断当前选中的 tab
    const getTabClass = (tabName) => {
        if (isHome && tabName === 'home') return 'tab tab--active';
        if (['trading-system', 'crm', 'payment-solutions', 'risk-control', 'asset-management'].includes(currentProject) && tabName === 'services') return 'tab tab--active';
        if (['market-maker-turnkey', 'brokerage', 'exchanges', 'financial-institutions', 'hedge-funds', 'quantitative-teams'].includes(currentProject) && tabName === 'solutions') return 'tab tab--active';
        if (['liquidity-provider', 'data-provider'].includes(currentProject) && tabName === 'liquidity') return 'tab tab--active';
        if (currentProject === 'news-insights' && tabName === 'intelligence') return 'tab tab--active';
        if (currentProject === 'about-us' && tabName === 'about') return 'tab tab--active';
        return 'tab tab--default';
    };
    
    const navbarHTML = `
    <nav class="navbar">
        <div class="navbar-container">
            <!-- Logo - Node: 1171:5405 -->
            <div class="logo-section" onclick="${isHome ? 'goToTopAndRefresh()' : 'goHome()'}">
                <img src="${prefix}web-home/head/logo/logo.svg" alt="MC Connects" class="logo-image">
            </div>

            <!-- Navigation Tabs Container - Node: 1171:5416 -->
            <div class="nav-tabs-container">
                <!-- 左侧 Tabs 区域 -->
                <div class="nav-tabs" id="navTabsLeft">
                    <!-- Home - Node: 1171:5417 -->
                    <div class="${getTabClass('home')}" onclick="goHome()" data-nav-tab="home">
                        <span class="tab-text" data-i18n="nav_home">Home</span>
                    </div>

                    <!-- Services - Node: 1171:5418 -->
                    <div class="tab-dropdown-wrapper" data-nav-tab="services">
                        <div class="${getTabClass('services')}" data-dropdown="services">
                            <span class="tab-text" data-i18n="nav_services">Services</span>
                            <svg class="tab-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="dropdown-menu" data-dropdown-menu="services">
                            <div class="dropdown-item ${currentProject === 'trading-system' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('trading-system')">
                                <span class="dropdown-item-text">Trading System</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'crm' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('crm')">
                                <span class="dropdown-item-text">CRM</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'payment-solutions' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('payment-solutions')">
                                <span class="dropdown-item-text">Payment Solutions</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'risk-control' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('risk-control')">
                                <span class="dropdown-item-text">Risk Control</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'asset-management' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('asset-management')">
                                <span class="dropdown-item-text">Asset Management</span>
                            </div>
                        </div>
                    </div>

                    <!-- Solutions - Node: 1171:5419 -->
                    <div class="tab-dropdown-wrapper" data-nav-tab="solutions">
                        <div class="${getTabClass('solutions')}" data-dropdown="solutions">
                            <span class="tab-text" data-i18n="nav_solutions">Solutions</span>
                            <svg class="tab-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="dropdown-menu" data-dropdown-menu="solutions">
                            <div class="dropdown-item ${currentProject === 'market-maker-turnkey' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('market-maker-turnkey')">
                                <span class="dropdown-item-text">Market Maker Turnkey</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'brokerage' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('brokerage')">
                                <span class="dropdown-item-text">Brokerage</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'exchanges' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('exchanges')">
                                <span class="dropdown-item-text">Exchanges</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'financial-institutions' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('financial-institutions')">
                                <span class="dropdown-item-text">Financial Institutions</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'hedge-funds' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('hedge-funds')">
                                <span class="dropdown-item-text">Hedge Funds</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'quantitative-teams' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('quantitative-teams')">
                                <span class="dropdown-item-text">Quantitative Teams</span>
                            </div>
                        </div>
                    </div>

                    <!-- Liquidity - Node: 1171:5420 -->
                    <div class="tab-dropdown-wrapper" data-nav-tab="liquidity">
                        <div class="${getTabClass('liquidity')}" data-dropdown="liquidity">
                            <span class="tab-text" data-i18n="nav_liquidity">Liquidity</span>
                            <svg class="tab-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="dropdown-menu" data-dropdown-menu="liquidity">
                            <div class="dropdown-item ${currentProject === 'liquidity-provider' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('liquidity-provider')">
                                <span class="dropdown-item-text">Liquidity Provider</span>
                            </div>
                            <div class="dropdown-item ${currentProject === 'data-provider' ? 'dropdown-item--active' : ''}" onclick="navigateToPage('data-provider')">
                                <span class="dropdown-item-text">Data Provider</span>
                            </div>
                        </div>
                    </div>

                    <!-- Intelligence - Node: 1171:5421 -->
                    <div class="${getTabClass('intelligence')}" data-nav-tab="intelligence" onclick="navigateToPage('news-insights')">
                        <span class="tab-text" data-i18n="nav_intelligence">Intelligence</span>
                    </div>

                    <!-- About Us - Node: 1171:5422 -->
                    <div class="${getTabClass('about')}" data-nav-tab="about" onclick="navigateToPage('about-us')">
                        <span class="tab-text" data-i18n="nav_about">About Us</span>
                    </div>
                </div>

                <!-- 右侧 More 按钮区域 -->
                <div class="nav-tabs-right">
                    <button class="more-button" id="moreButton" onclick="toggleMoreDropdown(event)">
                        <span class="tab-text">More</span>
                        <svg class="tab-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <!-- 更多按钮下拉菜单 -->
                    <div class="more-dropdown-menu" id="moreDropdownMenu">
                        <!-- 动态填充被收纳的tab -->
                    </div>
                </div>
            </div>

            <!-- Right Section - Node: 1171:5423 -->
            <div class="nav-right">
                <!-- Contact Us - Node: 1171:5424 -->
                <div class="contact-wrapper">
                    <div class="contact-section" onclick="scrollToContact()">
                        <div class="contact-tab">
                            <svg class="contact-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6463 12.2199C14.6463 12.4599 14.593 12.7066 14.4797 12.9466C14.3663 13.1866 14.2197 13.4133 14.0263 13.6266C13.6997 13.9866 13.3397 14.2466 12.933 14.4133C12.533 14.5799 12.0997 14.6666 11.633 14.6666C10.953 14.6666 10.2263 14.5066 9.45967 14.1799C8.69301 13.8533 7.92634 13.4133 7.16634 12.8599C6.39967 12.2999 5.67301 11.6799 4.97967 10.9933C4.29301 10.2999 3.67301 9.57325 3.11967 8.81325C2.57301 8.05325 2.13301 7.29325 1.81301 6.53992C1.49301 5.77992 1.33301 5.05325 1.33301 4.35992C1.33301 3.90659 1.41301 3.47325 1.57301 3.07325C1.73301 2.66659 1.98634 2.29325 2.33967 1.95992C2.76634 1.53992 3.23301 1.33325 3.72634 1.33325C3.91301 1.33325 4.09967 1.37325 4.26634 1.45325C4.43967 1.53325 4.59301 1.65325 4.71301 1.82659L6.25967 4.00659C6.37967 4.17325 6.46634 4.32659 6.52634 4.47325C6.58634 4.61325 6.61967 4.75325 6.61967 4.87992C6.61967 5.03992 6.57301 5.19992 6.47967 5.35325C6.39301 5.50659 6.26634 5.66659 6.10634 5.82659L5.59967 6.35325C5.52634 6.42659 5.49301 6.51325 5.49301 6.61992C5.49301 6.67325 5.49967 6.71992 5.51301 6.77325C5.53301 6.82659 5.55301 6.86659 5.56634 6.90659C5.68634 7.12659 5.89301 7.41325 6.18634 7.75992C6.48634 8.10659 6.80634 8.45992 7.15301 8.81325C7.51301 9.16659 7.85967 9.49325 8.21301 9.79325C8.55967 10.0866 8.84634 10.2866 9.07301 10.4066C9.10634 10.4199 9.14634 10.4399 9.19301 10.4599C9.24634 10.4799 9.29967 10.4866 9.35967 10.4866C9.47301 10.4866 9.55967 10.4466 9.63301 10.3733L10.1397 9.87325C10.3063 9.70659 10.4663 9.57992 10.6197 9.49992C10.773 9.40659 10.9263 9.35992 11.093 9.35992C11.2197 9.35992 11.353 9.38659 11.4997 9.44659C11.6463 9.50659 11.7997 9.59325 11.9663 9.70659L14.173 11.2733C14.3463 11.3933 14.4663 11.5333 14.5397 11.6999C14.6063 11.8666 14.6463 12.0333 14.6463 12.2199Z" stroke="white" stroke-miterlimit="10"/>
                            </svg>
                            <span class="contact-text" data-i18n="nav_contact">Contact Us</span>
                        </div>
                    </div>
                </div>

                <!-- Divider - Node: 1171:5426 -->
                <div class="divider">
                    <div class="divider-line"></div>
                </div>

                <!-- Presention Chart Icon - Node: 1171:5427 -->
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.90024 17H18.0902C19.9902 17 20.9902 16 20.9902 14.1V2H2.99023V14.1C3.00023 16 4.00024 17 5.90024 17Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 2H22" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 22L12 20V17" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 22L12 20" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 11L10.65 8.37C10.9 8.16 11.23 8.22 11.4 8.5L12.6 10.5C12.77 10.78 13.1 10.83 13.35 10.63L16.5 8" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <!-- Global Icon - Node: 1171:5428 -->
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.99961 3H8.99961C7.04961 8.84 7.04961 15.16 8.99961 21H7.99961" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 8.99961C8.84 7.04961 15.16 7.04961 21 8.99961" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    </nav>
    `;
    
    return navbarHTML;
}

// 替换 navbar 占位符
function replaceNavbarPlaceholder() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.outerHTML = generateNavbar();
        console.log('[Navbar] 已替换占位符');
        return true;
    }
    return false;
}

// 初始化 Navbar
function initNavbar() {
    console.log('[Navbar] 初始化开始...');
    
    // 检查占位符是否存在
    const placeholder = document.getElementById('navbar-placeholder');
    console.log('[Navbar] 占位符检查:', placeholder ? '找到' : '未找到');
    
    // 注入样式
    injectNavbarStyles();
    console.log('[Navbar] 样式已注入');
    
    // 替换占位符
    const replaced = replaceNavbarPlaceholder();
    console.log('[Navbar] 占位符替换:', replaced ? '成功' : '失败');
    
    if (replaced) {
        // 再次检查 navbar 是否存在
        const navbar = document.querySelector('.navbar');
        console.log('[Navbar] navbar 元素检查:', navbar ? '找到' : '未找到');
        
        // 添加 visible 类触发动画（针对 index.html）
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.add('visible');
                console.log('[Navbar] 已添加 visible 类');
            }
        }, 100);
        
        // 初始化下拉框
        initDropdowns();
        console.log('[Navbar] 下拉框已初始化');
        
        // 初始化更多按钮
        initMoreButton();
        console.log('[Navbar] 更多按钮已初始化');
        
        // 恢复当前页面的 tab 选中状态
        restoreCurrentPageTabState();
        console.log('[Navbar] 已恢复当前页面 tab 状态');
        
        console.log('[Navbar] 初始化完成');
    } else {
        console.log('[Navbar] 未找到占位符，跳过初始化');
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
