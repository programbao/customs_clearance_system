// 路由管理器
const Router = {
    // 路由配置
    routes: {
        // 首页
        'home': { title: '清关系统首页', module: 'home' },
        
        // 出口科
        'export-general-home': { title: '出口科-一般物资首页', module: 'export-general' },
        'export-shipping-list': { title: '待装船清单', module: 'export-shipping' },
        'export-invoice-files': { title: '待发票正本等文件', module: 'export-invoice' },
        'export-ls-certificate': { title: '待LS与产地证文件', module: 'export-ls' },
        'export-customs-declared': { title: '已报关(上传PEB&NPE)', module: 'export-customs' },
        'export-guarantee-docs': { title: '等待保函等资料', module: 'export-guarantee' },
        
        // 出口科-特殊物资
        'export-authorization-original': { title: '待上传授权信正本', module: 'export-auth-original' },
        'export-bill-of-lading': { title: '待上传提单草本', module: 'export-bill' },
        'export-permit-upload': { title: '上传出口批准函', module: 'export-permit' },
        
        // 进口科
        'import-approval-documents': { title: '待上传批复版资料', module: 'import-approval' },
        'import-docs-confirm': { title: '资料待确认', module: 'import-confirm' },
        'import-pib-draft-upload': { title: '待上传PIB核对草本', module: 'import-pib-draft' },
        'import-waiting-water': { title: '等待水单', module: 'import-water' },
        'import-pib-original': { title: '待上传PIB正本', module: 'import-pib-original' },
        'import-pib-formal-draft': { title: '待上传正式PIB草本', module: 'import-pib-formal' },
        'import-pib-check-draft': { title: '待上传PIB核对草本', module: 'import-pib-check' },
        'import-fee-reduction': { title: '费用减免', module: 'import-fee' },
        'import-settlement': { title: '进口结算', module: 'import-settlement' },
        'import-tax-audit': { title: '等待管理员审核税额', module: 'import-tax' },
        
        // 保税科-内贸
        'domestic-home': { title: '内贸首页', module: 'domestic-home' },
        'domestic-sppb1': { title: '待上传SPPB1', module: 'domestic-sppb1' },
        'domestic-sppb2': { title: '待上传SPPB2', module: 'sppb2-upload' },
        'domestic-bc40-stamped': { title: '待上传盖章版BC40', module: 'domestic-bc40-stamped' },
        'domestic-bc40-issued': { title: '待上传签发版BC40', module: 'domestic-bc40-issued' },
        'domestic-spjm': { title: '待上传SPJM', module: 'domestic-spjm' },
        
        // 保税科-外贸
        'foreign-home': { title: '外贸首页', module: 'foreign-home' },
        'foreign-sppb1': { title: '待上传SPPB1', module: 'foreign-sppb1' },
        'foreign-sppb2': { title: '待上传SPPB2', module: 'foreign-sppb2' },
        'foreign-bc40-stamped': { title: '待上传盖章版BC40', module: 'foreign-bc40-stamped' },
        'foreign-bc40-issued': { title: '待上传签发版BC40', module: 'foreign-bc40-issued' },
        'foreign-bc23-stamped': { title: '待上传盖章版BC2.3', module: 'foreign-bc23-stamped' },
        'foreign-bc23-issued': { title: '待上传签发版BC2.3', module: 'foreign-bc23-issued' },
        'foreign-spjm': { title: '待上传SPJM', module: 'foreign-spjm' },
        
        // 运营科
        'ops-export-declaration': { title: '出口申报', module: 'ops-export-declaration' },
        'ops-import-declaration': { title: '进口申报', module: 'ops-import-declaration' },
        'ops-domestic-declaration': { title: '内贸申报', module: 'ops-domestic-declaration' },
        'ops-foreign-declaration': { title: '外贸申报', module: 'ops-foreign-declaration' },
        'ops-export-settlement': { title: '出口结算单', module: 'ops-export-settlement' },
        'ops-import-settlement': { title: '进口结算单', module: 'ops-import-settlement' },
        
        // 查验科
        'inspection-import': { title: '进口查验', module: 'inspection-import' },
        'inspection-export': { title: '出口查验', module: 'inspection-export' },
        'inspection-import-spjm': { title: 'SPJM文件上传', module: 'inspection-spjm' },
        
        // 基础数据
        'company-management': { title: '公司管理', module: 'company-management' },
        'company-basic-info': { title: '新增公司-基本信息', module: 'company-basic' },
        'company-legal-docs': { title: '新增公司-进出口法律文件', module: 'company-legal' },
        'company-bank-info': { title: '新增公司-银行信息', module: 'company-bank' },
        'company-complete': { title: '新增公司-完成', module: 'company-complete' },
        'material-management': { title: '物资管理首页', module: 'material-management' },
        'material-code-update': { title: '待更新物资代码', module: 'material-code' },
        'export-finished-products': { title: '出口成品管理', module: 'export-finished' },
        'template-library': { title: '模版库管理', module: 'template-library' }
    },

    // 当前路由
    currentRoute: 'home',

    // 路由历史
    history: [],

    // 初始化路由
    init: function() {
        this.bindEvents();
        this.loadModule('home');
    },

    // 绑定事件
    bindEvents: function() {
        // 监听浏览器前进后退
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigate(e.state.route, false);
            }
        });
    },

    // 导航到指定路由
    navigate: function(route, updateHistory = true) {
        if (!this.routes[route]) {
            console.error('路由不存在:', route);
            return;
        }

        // 更新当前路由
        this.currentRoute = route;
        
        // 更新浏览器历史
        if (updateHistory) {
            this.history.push(route);
            window.history.pushState({ route: route }, '', `#${route}`);
        }

        // 加载模块
        this.loadModule(route);
        
        // 更新页面标题
        document.title = this.routes[route].title + ' - 清关系统';
        
        // 更新面包屑
        this.updateBreadcrumb(route);
    },

    // 加载模块
    loadModule: function(route) {
        const routeConfig = this.routes[route];
        if (!routeConfig) return;

        // 隐藏所有页面
        this.hideAllPages();
        
        // 显示目标页面
        const targetPage = document.getElementById(route);
        if (targetPage) {
            targetPage.style.display = 'block';
            
            // 初始化模块
            this.initModule(routeConfig.module);
        } else {
            console.error('页面不存在:', route);
        }
    },

    // 隐藏所有页面
    hideAllPages: function() {
        document.querySelectorAll('.page-section').forEach(page => {
            page.style.display = 'none';
        });
    },

    // 初始化模块
    initModule: function(moduleName) {
        // 根据模块名调用对应的初始化函数
        const initFunction = window[`init${this.capitalizeFirst(moduleName)}`];
        if (typeof initFunction === 'function') {
            initFunction();
        }
    },

    // 更新面包屑
    updateBreadcrumb: function(route) {
        const routeConfig = this.routes[route];
        if (!routeConfig) return;

        // 这里可以根据需要更新面包屑导航
        console.log('导航到:', routeConfig.title);
    },

    // 首字母大写
    capitalizeFirst: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // 获取当前路由信息
    getCurrentRoute: function() {
        return {
            route: this.currentRoute,
            config: this.routes[this.currentRoute]
        };
    },

    // 获取路由列表
    getRoutes: function() {
        return this.routes;
    },

    // 获取模块列表
    getModules: function() {
        const modules = {};
        for (const [route, config] of Object.entries(this.routes)) {
            modules[route] = config.module;
        }
        return modules;
    }
};

// 页面导航函数（供HTML调用）
function openBusinessPage(pageId) {
    Router.navigate(pageId);
}

// 返回首页
function goHome() {
    Router.navigate('home');
}

// 返回上一页
function goBack() {
    if (Router.history.length > 1) {
        Router.history.pop(); // 移除当前页
        const previousRoute = Router.history[Router.history.length - 1];
        Router.navigate(previousRoute, false);
    } else {
        Router.navigate('home');
    }
}
