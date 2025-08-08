// 内贸首页模块
const DomesticHomeModule = {
    // 数据
    data: {
        domesticData: [],
        filteredData: [],
        currentPage: 1,
        pageSize: 10,
        sortColumn: '',
        sortDirection: 'asc',
        selectedItems: []
    },

    // 初始化
    init: function() {
        this.loadData();
        this.renderStats();
        this.renderTable();
        this.renderPagination();
        this.bindEvents();
    },

    // 加载数据
    loadData: function() {
        // 从本地存储加载数据，如果没有则使用默认数据
        this.data.domesticData = Utils.storage.get('domesticData', [
            {
                id: 1,
                shipment: "W168",
                contractNo: "LIPE-N-24380",
                receiveDate: "2025-07-18",
                loadingPort: "/",
                pibNo: "00038",
                ivPlNo: "WEB20250506YQKJ-2",
                materialCode: "/",
                priceTerm: "/",
                goodsName: "/",
                quantity: "/",
                unit: "RP",
                unitPrice: "10.000",
                amount: "/",
                chineseName: "/",
                hsCode: "/",
                exchangeRate: "/",
                status: "资料整理阶段"
            },
            {
                id: 2,
                shipment: "W169",
                contractNo: "LIPE-N-24381",
                receiveDate: "2025-07-19",
                loadingPort: "SURABAYA",
                pibNo: "00039",
                ivPlNo: "WEB20250506YQKJ-3",
                materialCode: "FERRO-NICKEL",
                priceTerm: "FOB",
                goodsName: "FERRO-NICKEL",
                quantity: "4026.22",
                unit: "MT",
                unitPrice: "110.00",
                amount: "442884.20",
                chineseName: "镍铁",
                hsCode: "72026000",
                exchangeRate: "3.2",
                status: "待装船许可"
            }
        ]);
        
        this.data.filteredData = [...this.data.domesticData];
    },

    // 渲染统计信息
    renderStats: function() {
        const total = this.data.domesticData.length;
        const pending = this.data.domesticData.filter(item => 
            ['资料整理阶段', '待装船许可', '待装船清单'].includes(item.status)
        ).length;
        const completed = this.data.domesticData.filter(item => 
            ['已生成结算单'].includes(item.status)
        ).length;
        const totalAmount = this.data.domesticData.reduce((sum, item) => {
            const amount = parseFloat(item.amount) || 0;
            return sum + amount;
        }, 0);

        const content = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-number">${total}</div>
                    <div class="stat-label">总内贸单数</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏳</div>
                    <div class="stat-number">${pending}</div>
                    <div class="stat-label">待处理</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-number">${completed}</div>
                    <div class="stat-label">已完成</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-number">¥${(totalAmount / 1000000).toFixed(1)}M</div>
                    <div class="stat-label">总金额(IDR)</div>
                </div>
            </div>
        `;

        const container = document.getElementById('domestic-home-content');
        if (container) {
            container.innerHTML = content + this.getTableHTML();
        }
    },

    // 获取表格HTML
    getTableHTML: function() {
        return `
            <div class="search-section">
                <div class="form-group">
                    <label>状态筛选</label>
                    <select id="domestic-status-filter">
                        <option value="">全部状态</option>
                        <option value="资料整理阶段">资料整理阶段</option>
                        <option value="待装船许可">待装船许可</option>
                        <option value="待装船清单">待装船清单</option>
                        <option value="待发票正本等文件">待发票正本等文件</option>
                        <option value="待LS与产品证文件">待LS与产品证文件</option>
                        <option value="待海关申报">待海关申报</option>
                        <option value="等待保函等资料">等待保函等资料</option>
                        <option value="待生成结算单">待生成结算单</option>
                        <option value="已生成结算单">已生成结算单</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>船名</label>
                    <input type="text" id="domestic-shipment-filter" placeholder="输入船名">
                </div>
                <div class="form-group">
                    <label>PIC号</label>
                    <input type="text" id="domestic-pic-filter" placeholder="输入PIC号">
                </div>
                <div class="form-group">
                    <button class="btn-primary" onclick="DomesticHomeModule.filterData()">查询</button>
                    <button class="btn-warning" onclick="DomesticHomeModule.resetFilter()">重置</button>
                </div>
            </div>

            <div class="action-bar">
                <button class="btn-primary" onclick="DomesticHomeModule.addRecord()">新增内贸</button>
                <button class="btn-success" onclick="DomesticHomeModule.exportData()">导出</button>
                <button class="btn-warning" onclick="DomesticHomeModule.batchProcess()">批量处理</button>
            </div>

            <div class="table-container">
                <table class="data-table" id="domestic-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="domestic-select-all" onclick="DomesticHomeModule.toggleSelectAll()"></th>
                            <th onclick="DomesticHomeModule.sortTable('shipment')">船号 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('contractNo')">合同号 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('receiveDate')">收到清关资料时间 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('loadingPort')">Loading Port ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('pibNo')">PIB号 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('ivPlNo')">IV&PL号 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('materialCode')">Material Code ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('priceTerm')">PRICE TERM ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('goodsName')">货物名称 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('quantity')">QUANTITY ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('unit')">单位 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('unitPrice')">UNIT PRICE ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('amount')">Amount ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('chineseName')">中文品名 ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('hsCode')">HS CODE ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('exchangeRate')">Exchange Rate ↕</th>
                            <th onclick="DomesticHomeModule.sortTable('status')">状态 ↕</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="domestic-table-body">
                        <!-- 数据将通过JavaScript动态填充 -->
                    </tbody>
                </table>
            </div>

            <div class="pagination" id="domestic-pagination">
                <!-- 分页将通过JavaScript动态生成 -->
            </div>
        `;
    },

    // 渲染表格
    renderTable: function() {
        const tbody = document.getElementById('domestic-table-body');
        if (!tbody) return;

        const startIndex = (this.data.currentPage - 1) * this.data.pageSize;
        const endIndex = startIndex + this.data.pageSize;
        const pageData = this.data.filteredData.slice(startIndex, endIndex);

        tbody.innerHTML = '';
        pageData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" value="${item.id}" onchange="DomesticHomeModule.toggleSelection(${item.id})"></td>
                <td>${item.shipment}</td>
                <td>${item.contractNo}</td>
                <td>${item.receiveDate}</td>
                <td>${item.loadingPort}</td>
                <td>${item.pibNo}</td>
                <td>${item.ivPlNo}</td>
                <td>${item.materialCode}</td>
                <td>${item.priceTerm}</td>
                <td>${item.goodsName}</td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>${item.unitPrice}</td>
                <td>${item.amount}</td>
                <td>${item.chineseName}</td>
                <td>${item.hsCode}</td>
                <td>${item.exchangeRate}</td>
                <td><span class="status-tag status-${this.getStatusClass(item.status)}">${item.status}</span></td>
                <td>
                    <button class="btn-primary" onclick="DomesticHomeModule.viewDetail(${item.id})">查看</button>
                    <button class="btn-success" onclick="DomesticHomeModule.editRecord(${item.id})">编辑</button>
                    <button class="btn-warning" onclick="DomesticHomeModule.advanceStatus(${item.id})">推进</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    },

    // 渲染分页
    renderPagination: function() {
        const pagination = document.getElementById('domestic-pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.data.filteredData.length / this.data.pageSize);
        
        let paginationHTML = '';
        if (totalPages > 1) {
            paginationHTML += `<button onclick="DomesticHomeModule.changePage(1)" ${this.data.currentPage === 1 ? 'disabled' : ''}>首页</button>`;
            paginationHTML += `<button onclick="DomesticHomeModule.changePage(${this.data.currentPage - 1})" ${this.data.currentPage === 1 ? 'disabled' : ''}>上一页</button>`;
            
            for (let i = Math.max(1, this.data.currentPage - 2); i <= Math.min(totalPages, this.data.currentPage + 2); i++) {
                paginationHTML += `<button onclick="DomesticHomeModule.changePage(${i})" ${i === this.data.currentPage ? 'class="active"' : ''}>${i}</button>`;
            }
            
            paginationHTML += `<button onclick="DomesticHomeModule.changePage(${this.data.currentPage + 1})" ${this.data.currentPage === totalPages ? 'disabled' : ''}>下一页</button>`;
            paginationHTML += `<button onclick="DomesticHomeModule.changePage(${totalPages})" ${this.data.currentPage === totalPages ? 'disabled' : ''}>末页</button>`;
        }
        
        paginationHTML += `<span class="page-info">第 ${this.data.currentPage} 页，共 ${totalPages} 页，总计 ${this.data.filteredData.length} 条记录</span>`;
        pagination.innerHTML = paginationHTML;
    },

    // 获取状态样式类
    getStatusClass: function(status) {
        const statusMap = {
            '资料整理阶段': 'pending',
            '待装船许可': 'processing',
            '待装船清单': 'processing',
            '待发票正本等文件': 'processing',
            '待LS与产品证文件': 'processing',
            '待海关申报': 'processing',
            '等待保函等资料': 'processing',
            '待生成结算单': 'processing',
            '已生成结算单': 'completed'
        };
        return statusMap[status] || 'pending';
    },

    // 筛选数据
    filterData: function() {
        const statusFilter = document.getElementById('domestic-status-filter').value;
        const shipmentFilter = document.getElementById('domestic-shipment-filter').value;
        const picFilter = document.getElementById('domestic-pic-filter').value;

        this.data.filteredData = this.data.domesticData.filter(item => {
            const statusMatch = !statusFilter || item.status === statusFilter;
            const shipmentMatch = !shipmentFilter || item.shipment.toLowerCase().includes(shipmentFilter.toLowerCase());
            const picMatch = !picFilter || item.pibNo.toLowerCase().includes(picFilter.toLowerCase());
            
            return statusMatch && shipmentMatch && picMatch;
        });

        this.data.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    },

    // 重置筛选
    resetFilter: function() {
        document.getElementById('domestic-status-filter').value = '';
        document.getElementById('domestic-shipment-filter').value = '';
        document.getElementById('domestic-pic-filter').value = '';
        
        this.data.filteredData = [...this.data.domesticData];
        this.data.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    },

    // 排序表格
    sortTable: function(column) {
        if (this.data.sortColumn === column) {
            this.data.sortDirection = this.data.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.data.sortColumn = column;
            this.data.sortDirection = 'asc';
        }

        this.data.filteredData = Utils.tableSort.sort(this.data.filteredData, column, this.data.sortDirection);
        this.renderTable();
    },

    // 切换页面
    changePage: function(page) {
        this.data.currentPage = page;
        this.renderTable();
        this.renderPagination();
    },

    // 切换全选
    toggleSelectAll: function() {
        const selectAll = document.getElementById('domestic-select-all');
        const checkboxes = document.querySelectorAll('#domestic-table-body input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
            if (selectAll.checked) {
                this.data.selectedItems.push(parseInt(checkbox.value));
            } else {
                this.data.selectedItems = [];
            }
        });
    },

    // 切换选择
    toggleSelection: function(id) {
        const index = this.data.selectedItems.indexOf(id);
        if (index > -1) {
            this.data.selectedItems.splice(index, 1);
        } else {
            this.data.selectedItems.push(id);
        }
    },

    // 查看详情
    viewDetail: function(id) {
        const item = this.data.domesticData.find(item => item.id === id);
        if (!item) return;

        Utils.showNotification(`查看详情: ${item.shipment} - ${item.contractNo}`, 'info');
    },

    // 编辑记录
    editRecord: function(id) {
        const item = this.data.domesticData.find(item => item.id === id);
        if (!item) return;

        Utils.showNotification(`编辑记录: ${item.shipment}`, 'info');
    },

    // 推进状态
    advanceStatus: function(id) {
        const item = this.data.domesticData.find(item => item.id === id);
        if (!item) return;

        const statusFlow = [
            '资料整理阶段', '待装船许可', '待装船清单', '待发票正本等文件',
            '待LS与产品证文件', '待海关申报', '等待保函等资料', '待生成结算单', '已生成结算单'
        ];

        const currentIndex = statusFlow.indexOf(item.status);
        if (currentIndex < statusFlow.length - 1) {
            item.status = statusFlow[currentIndex + 1];
            Utils.storage.set('domesticData', this.data.domesticData);
            this.renderTable();
            this.renderStats();
            Utils.showNotification(`状态已推进到: ${item.status}`, 'success');
        } else {
            Utils.showNotification('已经是最终状态', 'warning');
        }
    },

    // 新增记录
    addRecord: function() {
        Utils.showNotification('新增记录功能开发中...', 'info');
    },

    // 导出数据
    exportData: function() {
        Utils.exportCSV(this.data.filteredData, '内贸数据.csv');
    },

    // 批量处理
    batchProcess: function() {
        if (this.data.selectedItems.length === 0) {
            Utils.showNotification('请选择要处理的记录', 'warning');
            return;
        }

        Utils.showNotification(`批量处理 ${this.data.selectedItems.length} 条记录`, 'info');
    },

    // 绑定事件
    bindEvents: function() {
        // 可以在这里绑定其他事件
    }
};

// 初始化函数（供路由调用）
function initDomesticHome() {
    DomesticHomeModule.init();
}
