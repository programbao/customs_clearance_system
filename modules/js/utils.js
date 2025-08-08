// 通用工具函数
const Utils = {
    // 显示通知
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // 根据类型设置背景色
        const colors = {
            success: '#52c41a',
            error: '#ff4d4f',
            warning: '#faad14',
            info: '#1890ff'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    // 格式化日期
    formatDate: function(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN');
    },

    // 格式化文件大小
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // 生成唯一ID
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // 深拷贝对象
    deepClone: function(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    // 验证邮箱
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // 验证手机号
    validatePhone: function(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    },

    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 导出CSV
    exportCSV: function(data, filename) {
        if (!data || data.length === 0) {
            this.showNotification('没有数据可导出', 'warning');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename || 'export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // 本地存储
    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('存储失败:', e);
            }
        },
        get: function(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('读取失败:', e);
                return defaultValue;
            }
        },
        remove: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('删除失败:', e);
            }
        }
    },

    // 分页工具
    pagination: {
        getPageData: function(data, currentPage, pageSize) {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return data.slice(startIndex, endIndex);
        },
        getTotalPages: function(totalItems, pageSize) {
            return Math.ceil(totalItems / pageSize);
        },
        renderPagination: function(container, currentPage, totalPages, onPageChange) {
            let html = '';
            
            if (totalPages > 1) {
                html += `<button onclick="onPageChange(1)" ${currentPage === 1 ? 'disabled' : ''}>首页</button>`;
                html += `<button onclick="onPageChange(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>`;
                
                for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                    html += `<button onclick="onPageChange(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
                }
                
                html += `<button onclick="onPageChange(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>`;
                html += `<button onclick="onPageChange(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>末页</button>`;
            }
            
            html += `<span class="page-info">第 ${currentPage} 页，共 ${totalPages} 页</span>`;
            container.innerHTML = html;
        }
    },

    // 表格排序
    tableSort: {
        sort: function(data, column, direction = 'asc') {
            return data.sort((a, b) => {
                let aValue = a[column];
                let bValue = b[column];

                // 处理数字
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return direction === 'asc' ? aValue - bValue : bValue - aValue;
                }

                // 处理日期
                if (aValue instanceof Date && bValue instanceof Date) {
                    return direction === 'asc' ? aValue - bValue : bValue - aValue;
                }

                // 处理字符串
                aValue = String(aValue || '').toLowerCase();
                bValue = String(bValue || '').toLowerCase();
                
                if (aValue < bValue) return direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
    },

    // 文件上传工具
    fileUpload: {
        validateFile: function(file, options = {}) {
            const { maxSize = 50 * 1024 * 1024, allowedTypes = [] } = options;
            
            if (file.size > maxSize) {
                return { valid: false, message: `文件大小不能超过 ${this.formatFileSize(maxSize)}` };
            }
            
            if (allowedTypes.length > 0) {
                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (!allowedTypes.includes(fileExtension)) {
                    return { valid: false, message: `不支持的文件类型: ${fileExtension}` };
                }
            }
            
            return { valid: true };
        },

        createUploadProgress: function(container) {
            const progressHTML = `
                <div class="upload-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
            `;
            container.innerHTML = progressHTML;
            return {
                update: function(percent) {
                    const progressFill = container.querySelector('.progress-fill');
                    const progressText = container.querySelector('.progress-text');
                    progressFill.style.width = percent + '%';
                    progressText.textContent = percent + '%';
                },
                complete: function() {
                    setTimeout(() => {
                        container.innerHTML = '';
                    }, 1000);
                }
            };
        }
    }
};

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
