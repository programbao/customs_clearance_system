/**
 * SPPB2文件上传页面模块
 * 保税区SPPB2文件上传和管理
 */

class SPPB2UploadPage {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.totalPages = 0;
        this.selectedFiles = new Set();
        this.uploadQueue = [];
        this.isUploading = false;
        
        this.init();
    }

    init() {
        this.renderPage();
        this.bindEvents();
        this.loadData();
    }

    renderPage() {
        const container = document.getElementById('app');
        if (!container) return;

        container.innerHTML = `
            <div class="sppb2-upload-page">
                <!-- 页面头部 -->
                <div class="page-header">
                    <div class="header-content">
                        <h1 class="page-title">
                            <i class="fas fa-upload"></i>
                            SPPB2文件上传管理
                        </h1>
                        <div class="header-actions">
                            <button class="btn btn-primary" id="addFilesBtn">
                                <i class="fas fa-plus"></i>
                                添加文件
                            </button>
                            <button class="btn btn-secondary" id="exportBtn">
                                <i class="fas fa-download"></i>
                                导出数据
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 统计卡片 -->
                <div class="stats-section">
                    <div class="stats-grid">
                        <div class="stat-card stat-total">
                            <div class="stat-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number" id="totalFiles">0</div>
                                <div class="stat-label">总文件数</div>
                            </div>
                        </div>
                        <div class="stat-card stat-pending">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number" id="pendingFiles">0</div>
                                <div class="stat-label">待上传</div>
                            </div>
                        </div>
                        <div class="stat-card stat-uploaded">
                            <div class="stat-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number" id="uploadedFiles">0</div>
                                <div class="stat-label">已上传</div>
                            </div>
                        </div>
                        <div class="stat-card stat-failed">
                            <div class="stat-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number" id="failedFiles">0</div>
                                <div class="stat-label">上传失败</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 搜索和筛选 -->
                <div class="filter-section">
                    <div class="filter-row">
                        <div class="filter-group">
                            <label for="statusFilter">文件状态</label>
                            <select id="statusFilter" class="form-select">
                                <option value="">全部状态</option>
                                <option value="待上传">待上传</option>
                                <option value="上传中">上传中</option>
                                <option value="已上传">已上传</option>
                                <option value="上传失败">上传失败</option>
                                <option value="已审核">已审核</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label for="shipmentFilter">船号</label>
                            <input type="text" id="shipmentFilter" class="form-input" placeholder="输入船号">
                        </div>
                        <div class="filter-group">
                            <label for="contractFilter">合同号</label>
                            <input type="text" id="contractFilter" class="form-input" placeholder="输入合同号">
                        </div>
                        <div class="filter-actions">
                            <button class="btn btn-primary" id="searchBtn">
                                <i class="fas fa-search"></i>
                                搜索
                            </button>
                            <button class="btn btn-secondary" id="resetBtn">
                                <i class="fas fa-redo"></i>
                                重置
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 文件上传区域 -->
                <div class="upload-section" id="uploadSection" style="display: none;">
                    <div class="upload-area">
                        <div class="upload-content">
                            <div class="upload-icon">
                                <i class="fas fa-cloud-upload-alt"></i>
                            </div>
                            <div class="upload-text">
                                <h3>拖拽文件到此处或点击选择文件</h3>
                                <p>支持 PDF、DOC、DOCX、XLS、XLSX 格式，单个文件最大 50MB</p>
                            </div>
                            <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" style="display: none;">
                            <button class="btn btn-primary" id="selectFilesBtn">
                                <i class="fas fa-folder-open"></i>
                                选择文件
                            </button>
                        </div>
                    </div>
                    <div class="upload-progress" id="uploadProgress" style="display: none;">
                        <div class="progress-header">
                            <h4>上传进度</h4>
                            <button class="btn btn-sm btn-secondary" id="cancelUploadBtn">
                                <i class="fas fa-times"></i>
                                取消
                            </button>
                        </div>
                        <div class="progress-list" id="progressList"></div>
                    </div>
                </div>

                <!-- 文件列表 -->
                <div class="files-section">
                    <div class="section-header">
                        <h3>文件列表</h3>
                        <div class="header-actions">
                            <button class="btn btn-sm btn-secondary" id="selectAllBtn">
                                <i class="fas fa-check-square"></i>
                                全选
                            </button>
                            <button class="btn btn-sm btn-danger" id="deleteSelectedBtn" disabled>
                                <i class="fas fa-trash"></i>
                                删除选中
                            </button>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="data-table" id="filesTable">
                            <thead>
                                <tr>
                                    <th width="40">
                                        <input type="checkbox" id="selectAllCheckbox">
                                    </th>
                                    <th width="120">船号</th>
                                    <th width="150">合同号</th>
                                    <th width="200">文件名</th>
                                    <th width="100">文件大小</th>
                                    <th width="150">上传时间</th>
                                    <th width="100">状态</th>
                                    <th width="100">上传人</th>
                                    <th width="100">文件类型</th>
                                    <th width="150">备注</th>
                                    <th width="120">操作</th>
                                </tr>
                            </thead>
                            <tbody id="filesTableBody">
                                <!-- 数据将通过JavaScript动态加载 -->
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 分页 -->
                    <div class="pagination-section">
                        <div class="pagination-info">
                            显示 <span id="startRecord">1</span> - <span id="endRecord">10</span> 条，
                            共 <span id="totalRecords">0</span> 条记录
                        </div>
                        <div class="pagination-controls">
                            <button class="btn btn-sm btn-secondary" id="prevPageBtn" disabled>
                                <i class="fas fa-chevron-left"></i>
                                上一页
                            </button>
                            <div class="page-numbers" id="pageNumbers"></div>
                            <button class="btn btn-sm btn-secondary" id="nextPageBtn">
                                下一页
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // 文件上传相关事件
        document.getElementById('addFilesBtn')?.addEventListener('click', () => this.showUploadSection());
        document.getElementById('selectFilesBtn')?.addEventListener('click', () => document.getElementById('fileInput')?.click());
        document.getElementById('fileInput')?.addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('cancelUploadBtn')?.addEventListener('click', () => this.cancelUpload());

        // 搜索和筛选事件
        document.getElementById('searchBtn')?.addEventListener('click', () => this.searchFiles());
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetFilters());

        // 表格操作事件
        document.getElementById('selectAllCheckbox')?.addEventListener('change', (e) => this.toggleSelectAll(e));
        document.getElementById('selectAllBtn')?.addEventListener('click', () => this.selectAllFiles());
        document.getElementById('deleteSelectedBtn')?.addEventListener('click', () => this.deleteSelectedFiles());

        // 分页事件
        document.getElementById('prevPageBtn')?.addEventListener('click', () => this.prevPage());
        document.getElementById('nextPageBtn')?.addEventListener('click', () => this.nextPage());

        // 导出事件
        document.getElementById('exportBtn')?.addEventListener('click', () => this.exportData());

        // 拖拽上传
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const uploadArea = document.querySelector('.upload-area');
        if (!uploadArea) return;

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });
    }

    showUploadSection() {
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.style.display = 'block';
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleFileSelect(event) {
        const files = Array.from(event.target.files);
        this.handleFiles(files);
    }

    handleFiles(files) {
        const validFiles = files.filter(file => {
            const validTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            const isValidType = validTypes.includes(fileExtension);
            const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB

            if (!isValidType) {
                this.showMessage('错误', '不支持的文件格式', 'error');
                return false;
            }
            if (!isValidSize) {
                this.showMessage('错误', '文件大小超过50MB限制', 'error');
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            this.addToUploadQueue(validFiles);
        }
    }

    addToUploadQueue(files) {
        files.forEach(file => {
            const uploadItem = {
                id: Date.now() + Math.random(),
                file: file,
                fileName: file.name,
                fileSize: this.formatFileSize(file.size),
                progress: 0,
                status: 'pending'
            };
            this.uploadQueue.push(uploadItem);
        });

        this.showUploadProgress();
        this.startUpload();
    }

    showUploadProgress() {
        const progressSection = document.getElementById('uploadProgress');
        if (progressSection) {
            progressSection.style.display = 'block';
        }
        this.updateProgressList();
    }

    updateProgressList() {
        const progressList = document.getElementById('progressList');
        if (!progressList) return;

        progressList.innerHTML = this.uploadQueue.map(item => `
            <div class="progress-item" data-id="${item.id}">
                <div class="progress-info">
                    <div class="file-name">${item.fileName}</div>
                    <div class="file-size">${item.fileSize}</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${item.progress}%"></div>
                </div>
                <div class="progress-status">
                    <span class="status-text">${this.getStatusText(item.status)}</span>
                    <span class="progress-percent">${item.progress}%</span>
                </div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'pending': '等待中',
            'uploading': '上传中',
            'completed': '已完成',
            'failed': '失败'
        };
        return statusMap[status] || status;
    }

    async startUpload() {
        if (this.isUploading) return;
        this.isUploading = true;

        for (let item of this.uploadQueue) {
            if (item.status === 'pending') {
                item.status = 'uploading';
                this.updateProgressList();

                try {
                    await this.simulateUpload(item);
                    item.status = 'completed';
                    item.progress = 100;
                } catch (error) {
                    item.status = 'failed';
                    console.error('Upload failed:', error);
                }

                this.updateProgressList();
            }
        }

        this.isUploading = false;
        this.loadData(); // 重新加载数据
    }

    async simulateUpload(item) {
        return new Promise((resolve, reject) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    resolve();
                }
                item.progress = Math.round(progress);
                this.updateProgressList();
            }, 200);
        });
    }

    cancelUpload() {
        this.uploadQueue = [];
        this.isUploading = false;
        const progressSection = document.getElementById('uploadProgress');
        if (progressSection) {
            progressSection.style.display = 'none';
        }
    }

    loadData() {
        // 模拟数据加载
        const mockData = this.generateMockData();
        this.renderTable(mockData);
        this.updateStats(mockData);
        this.updatePagination(mockData.length);
    }

    generateMockData() {
        const statuses = ['待上传', '上传中', '已上传', '上传失败', '已审核'];
        const fileTypes = ['SPPB2'];
        const uploaders = ['张三', '李四', '王五'];
        const shipments = ['W168', 'W169', 'W170', 'W171'];
        const contracts = ['LIPE-N-24380', 'LIPE-N-24381', 'LIPE-N-24382'];

        return Array.from({ length: 25 }, (_, index) => ({
            id: index + 1,
            shipment: shipments[Math.floor(Math.random() * shipments.length)],
            contractNo: contracts[Math.floor(Math.random() * contracts.length)],
            fileName: `SPPB2_${shipments[Math.floor(Math.random() * shipments.length)]}_${Date.now()}.pdf`,
            fileSize: `${(Math.random() * 10 + 1).toFixed(1)}MB`,
            uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            uploader: uploaders[Math.floor(Math.random() * uploaders.length)],
            fileType: fileTypes[0],
            remark: `标准SPPB2文件 - ${index + 1}`
        }));
    }

    renderTable(data) {
        const tbody = document.getElementById('filesTableBody');
        if (!tbody) return;

        tbody.innerHTML = data.map(item => `
            <tr data-id="${item.id}">
                <td>
                    <input type="checkbox" class="file-checkbox" data-id="${item.id}">
                </td>
                <td>${item.shipment}</td>
                <td>${item.contractNo}</td>
                <td>${item.fileName}</td>
                <td>${item.fileSize}</td>
                <td>${item.uploadDate}</td>
                <td>
                    <span class="status-badge status-${this.getStatusClass(item.status)}">
                        ${item.status}
                    </span>
                </td>
                <td>${item.uploader}</td>
                <td>${item.fileType}</td>
                <td>${item.remark}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary" onclick="this.viewFile(${item.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="this.downloadFile(${item.id})">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="this.deleteFile(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // 绑定复选框事件
        document.querySelectorAll('.file-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleFileSelection(e));
        });
    }

    getStatusClass(status) {
        const statusMap = {
            '待上传': 'pending',
            '上传中': 'uploading',
            '已上传': 'uploaded',
            '上传失败': 'failed',
            '已审核': 'approved'
        };
        return statusMap[status] || 'default';
    }

    updateStats(data) {
        const stats = {
            total: data.length,
            pending: data.filter(item => item.status === '待上传').length,
            uploaded: data.filter(item => item.status === '已上传').length,
            failed: data.filter(item => item.status === '上传失败').length
        };

        document.getElementById('totalFiles').textContent = stats.total;
        document.getElementById('pendingFiles').textContent = stats.pending;
        document.getElementById('uploadedFiles').textContent = stats.uploaded;
        document.getElementById('failedFiles').textContent = stats.failed;
    }

    updatePagination(totalRecords) {
        this.totalPages = Math.ceil(totalRecords / this.pageSize);
        
        document.getElementById('totalRecords').textContent = totalRecords;
        document.getElementById('startRecord').textContent = (this.currentPage - 1) * this.pageSize + 1;
        document.getElementById('endRecord').textContent = Math.min(this.currentPage * this.pageSize, totalRecords);

        document.getElementById('prevPageBtn').disabled = this.currentPage <= 1;
        document.getElementById('nextPageBtn').disabled = this.currentPage >= this.totalPages;

        this.renderPageNumbers();
    }

    renderPageNumbers() {
        const pageNumbers = document.getElementById('pageNumbers');
        if (!pageNumbers) return;

        let html = '';
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="btn btn-sm ${i === this.currentPage ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="this.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        pageNumbers.innerHTML = html;
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadData();
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadData();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadData();
        }
    }

    searchFiles() {
        // 实现搜索逻辑
        this.loadData();
    }

    resetFilters() {
        document.getElementById('statusFilter').value = '';
        document.getElementById('shipmentFilter').value = '';
        document.getElementById('contractFilter').value = '';
        this.loadData();
    }

    toggleSelectAll(event) {
        const checkboxes = document.querySelectorAll('.file-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked;
            this.handleFileSelection({ target: checkbox });
        });
    }

    selectAllFiles() {
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = true;
            this.toggleSelectAll({ target: selectAllCheckbox });
        }
    }

    handleFileSelection(event) {
        const checkbox = event.target;
        const fileId = checkbox.dataset.id;

        if (checkbox.checked) {
            this.selectedFiles.add(fileId);
        } else {
            this.selectedFiles.delete(fileId);
        }

        const deleteBtn = document.getElementById('deleteSelectedBtn');
        if (deleteBtn) {
            deleteBtn.disabled = this.selectedFiles.size === 0;
        }
    }

    deleteSelectedFiles() {
        if (this.selectedFiles.size === 0) return;

        if (confirm(`确定要删除选中的 ${this.selectedFiles.size} 个文件吗？`)) {
            // 实现删除逻辑
            this.selectedFiles.clear();
            this.loadData();
            this.showMessage('成功', '文件删除成功', 'success');
        }
    }

    viewFile(fileId) {
        // 实现文件预览逻辑
        this.showMessage('信息', `预览文件 ID: ${fileId}`, 'info');
    }

    downloadFile(fileId) {
        // 实现文件下载逻辑
        this.showMessage('信息', `下载文件 ID: ${fileId}`, 'info');
    }

    deleteFile(fileId) {
        if (confirm('确定要删除这个文件吗？')) {
            // 实现删除逻辑
            this.loadData();
            this.showMessage('成功', '文件删除成功', 'success');
        }
    }

    exportData() {
        // 实现数据导出逻辑
        this.showMessage('成功', '数据导出成功', 'success');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showMessage(title, message, type = 'info') {
        // 实现消息提示
        console.log(`${title}: ${message}`);
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SPPB2UploadPage;
} else {
    window.SPPB2UploadPage = SPPB2UploadPage;
}
