# 清关系统详细设计Prompt

## 项目概述
基于CustomsDeclaration原型文件分析，设计一个完整的清关系统，涵盖进出口贸易的全流程管理。

## 系统架构设计

### 前端技术栈
- **框架**: Vue 3 + TypeScript + Vite
- **UI组件库**: Element Plus / Ant Design Vue
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP客户端**: Axios
- **构建工具**: Vite
- **代码规范**: ESLint + Prettier

### 后端技术栈
- **框架**: Spring Boot 3.x
- **数据库**: MySQL 9.0 (账号: root, 密码: aaa123456)
- **ORM**: MyBatis Plus
- **安全**: Spring Security + JWT
- **文档**: Swagger 3
- **缓存**: Redis
- **消息队列**: RabbitMQ
- **文件存储**: MinIO / 阿里云OSS

## 核心业务模块分析

### 1. 组织架构模块
基于原型分析，系统包含以下部门：

#### 1.1 出口科
- **一般物资出口流程**
  - 资料整理阶段
  - 装船许可申请
  - 装船清单管理
  - 发票正本等文件处理
  - LS与产地证文件管理
  - 海关申报
  - 保函等资料处理
  - 结算单生成

- **特殊物资出口流程**
  - 授权信正本上传
  - 提单草本处理
  - 出口批准函管理
  - 特殊物资代码更新

#### 1.2 进口科
- **资料管理流程**
  - 批复版资料上传
  - 资料确认流程
  - PIB核对草本处理
  - 水单等待处理
  - 税额审核管理

- **进口申报流程**
  - 费用减免申请
  - PIB核对草本上传
  - 正式PIB草本处理
  - 管理员税额审核
  - PIB正本上传
  - SPJM文件处理
  - SPPB文件管理

#### 1.3 保税区管理科
- **内贸业务**
  - 内贸首页管理
  - SPPB1文件上传
  - SPPB2文件处理
  - 盖章版BC40管理

- **外贸业务**
  - 外贸首页管理
  - 物资代码更新
  - BC2.3相关文件处理

#### 1.4 运营科
- **出口申报**
  - 装船许可(一般物资)
  - 出口批准函(特殊物资)
  - PEB&NPE文件上传

- **进口申报**
  - 各类PIB文件处理
  - SPJM/SPPB文件管理

- **内贸/外贸申报**
  - BC40签发版处理
  - BC2.3草本确认

#### 1.5 查验科
- **出口查验**
  - 海关查验确认
  - 第三方查验处理

- **进口查验**
  - SPJM文件上传处理

#### 1.6 基础数据管理
- **公司管理**
  - 基本信息维护
  - 银行信息管理
  - 进出口法律文件
  - 公司注册流程

- **物资管理**
  - 物资基础信息
  - 出口成品管理
  - 模版库管理

### 2. 结算管理模块
- **出口结算单**
  - WBN出口服务费结算
  - 结算单生成与管理

- **进口结算单**
  - 进口费用结算
  - 查看与编辑功能

## 页面功能关系图

### 主要页面及其关系（功能和页面关联）

#### 导航层级结构
```
清关系统首页
├── 出口科
│   ├── 一般物资
│   │   ├── 首页(资料整理阶段)-总表
│   │   ├── 首页-明细页面
│   │   ├── 待装船清单
│   │   ├── 待发票正本等文件
│   │   ├── 待LS与产地证文件
│   │   ├── 已报关(上传PEB&NPE)
│   │   ├── 等待保函等资料
│   │   ├── 资料已邮寄
│   │   └── 详情页面
│   └── 特殊物资
│       ├── 首页(资料整理阶段)
│       ├── 待上传授权信正本
│       ├── 待上传提单草本
│       ├── 上传出口批准函
│       ├── 废弃-上传授权信草本
│       └── 相关备份页面
├── 进口科
│   ├── 资料管理
│   │   ├── 首页(资料整理)
│   │   ├── 待上传批复版资料
│   │   ├── 资料待确认
│   │   ├── 待确认PIB核对草本
│   │   ├── 等待水单
│   │   ├── 待上传PIB核对草本
│   │   ├── 待上传PIB正本
│   │   ├── 待上传正式PIB草本
│   │   ├── 等待管理员审核税额
│   │   ├── 待上传现场查验照片
│   │   ├── 费用减免
│   │   └── 进口结算
│   └── 出口备案
│       ├── 备案申请
│       ├── 备案审核
│       ├── 备案查询
│       └── 备案变更
├── 保税科
│   ├── 内贸
│   │   ├── 内贸首页
│   │   ├── 待上传SPPB1
│   │   ├── 待上传SPPB2
│   │   ├── 待上传盖章版BC40
│   │   ├── 待上传签发版BC40
│   │   └── 待上传SPJM
│   └── 外贸
│       ├── 外贸首页
│       ├── 待更新物资代码
│       ├── 待上传盖章版BC2.3
│       ├── 待上传签发版BC2.3
│       └── BC业务管理
├── 运营科
│   ├── 出口申报
│   │   ├── 装船许可申请
│   │   ├── 出口申报单制作
│   │   ├── 申报状态跟踪
│   │   └── 申报单查询
│   ├── 进口申报
│   │   ├── 进口申报单制作
│   │   ├── 申报状态跟踪
│   │   ├── 税额计算
│   │   └── 申报单查询
│   ├── 内贸申报
│   │   ├── 内贸申报单制作
│   │   ├── 申报状态跟踪
│   │   └── 申报单查询
│   ├── 外贸申报
│   │   ├── 外贸申报单制作
│   │   ├── 申报状态跟踪
│   │   └── 申报单查询
│   ├── 出口自理单
│   │   ├── 自理单制作
│   │   ├── 自理单审核
│   │   └── 自理单查询
│   └── 进口自理单
│       ├── 自理单制作
│       ├── 自理单审核
│       └── 自理单查询
├── 查验科
│   ├── 出口查验
│   │   ├── 查验计划
│   │   ├── 现场查验
│   │   ├── 查验结果录入
│   │   └── 查验报告
│   └── 进口查验
│       ├── 查验计划
│       ├── 现场查验
│       ├── 查验结果录入
│       ├── SPJM文件上传
│       └── 查验报告
└── 基础数据
    ├── 公司管理
    │   ├── 新增公司-基本信息
    │   ├── 新增公司-银行信息
    │   ├── 新增公司-进出口法律文件
    │   ├── 新增公司-完成
    │   ├── 公司列表查询
    │   └── 公司信息维护
    ├── 物资管理
    │   ├── 物资基础信息
    │   ├── 物资分类管理
    │   ├── HS编码管理
    │   └── 物资价格管理
    ├── 出口成品管理
    │   ├── 成品信息录入
    │   ├── 成品规格管理
    │   ├── 成品质检标准
    │   └── 成品库存管理
    └── 模版库管理
        ├── CI/PL模版
        ├── PIB模版
        ├── 申报单模版
        └── 结算单模版
```

## 数据库设计

### 核心表结构设计

#### 1. 用户权限相关表
```sql
-- 用户表
CREATE TABLE sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    real_name VARCHAR(50) COMMENT '真实姓名',
    email VARCHAR(100) COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '手机号',
    department_id BIGINT COMMENT '部门ID',
    status TINYINT DEFAULT 1 COMMENT '状态:1启用,0禁用',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department_id),
    INDEX idx_username (username)
) COMMENT '用户表';

-- 部门表
CREATE TABLE sys_department (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(50) NOT NULL COMMENT '部门名称',
    dept_code VARCHAR(20) UNIQUE COMMENT '部门编码',
    parent_id BIGINT DEFAULT 0 COMMENT '父部门ID',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_parent (parent_id)
) COMMENT '部门表';

-- 角色表
CREATE TABLE sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
    role_code VARCHAR(20) UNIQUE COMMENT '角色编码',
    description VARCHAR(200) COMMENT '描述',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
) COMMENT '角色表';

-- 用户角色关联表
CREATE TABLE sys_user_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_user_role (user_id, role_id)
) COMMENT '用户角色关联表';
```

#### 2. 公司管理相关表
```sql
-- 公司信息表
CREATE TABLE company_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(200) NOT NULL COMMENT '公司名称',
    company_code VARCHAR(50) UNIQUE COMMENT '公司编码',
    legal_person VARCHAR(50) COMMENT '法人代表',
    registration_number VARCHAR(50) COMMENT '注册号',
    tax_number VARCHAR(50) COMMENT '税号',
    address VARCHAR(500) COMMENT '地址',
    contact_person VARCHAR(50) COMMENT '联系人',
    contact_phone VARCHAR(20) COMMENT '联系电话',
    contact_email VARCHAR(100) COMMENT '联系邮箱',
    business_scope TEXT COMMENT '经营范围',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_company_code (company_code),
    INDEX idx_company_name (company_name)
) COMMENT '公司信息表';

-- 公司银行信息表
CREATE TABLE company_bank_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL COMMENT '公司ID',
    bank_name VARCHAR(100) NOT NULL COMMENT '银行名称',
    account_number VARCHAR(50) NOT NULL COMMENT '账号',
    account_name VARCHAR(100) COMMENT '账户名',
    swift_code VARCHAR(20) COMMENT 'SWIFT代码',
    is_default TINYINT DEFAULT 0 COMMENT '是否默认账户',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_company (company_id)
) COMMENT '公司银行信息表';

-- 公司法律文件表
CREATE TABLE company_legal_document (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL COMMENT '公司ID',
    document_type VARCHAR(50) NOT NULL COMMENT '文件类型',
    document_name VARCHAR(200) COMMENT '文件名称',
    document_number VARCHAR(100) COMMENT '文件编号',
    issue_date DATE COMMENT '签发日期',
    expire_date DATE COMMENT '到期日期',
    file_path VARCHAR(500) COMMENT '文件路径',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_company (company_id),
    INDEX idx_type (document_type)
) COMMENT '公司法律文件表';
```

#### 3. 物资管理相关表
```sql
-- 物资基础信息表
CREATE TABLE material_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    material_code VARCHAR(50) UNIQUE NOT NULL COMMENT '物资编码',
    material_name VARCHAR(200) NOT NULL COMMENT '物资名称',
    material_type TINYINT NOT NULL COMMENT '物资类型:1一般物资,2特殊物资',
    category_id BIGINT COMMENT '分类ID',
    specification VARCHAR(500) COMMENT '规格',
    unit VARCHAR(20) COMMENT '单位',
    hs_code VARCHAR(20) COMMENT 'HS编码',
    customs_code VARCHAR(50) COMMENT '海关商品编码',
    origin_country VARCHAR(50) COMMENT '原产国',
    brand VARCHAR(100) COMMENT '品牌',
    model VARCHAR(100) COMMENT '型号',
    description TEXT COMMENT '描述',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (material_code),
    INDEX idx_type (material_type),
    INDEX idx_hs_code (hs_code)
) COMMENT '物资基础信息表';

-- 物资分类表
CREATE TABLE material_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL COMMENT '分类名称',
    category_code VARCHAR(50) UNIQUE COMMENT '分类编码',
    parent_id BIGINT DEFAULT 0 COMMENT '父分类ID',
    level TINYINT DEFAULT 1 COMMENT '层级',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_parent (parent_id),
    INDEX idx_code (category_code)
) COMMENT '物资分类表';
```

#### 4. 清关业务核心表
```sql
-- 清关申报主表
CREATE TABLE customs_declaration (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    declaration_no VARCHAR(50) UNIQUE NOT NULL COMMENT '申报单号',
    company_id BIGINT NOT NULL COMMENT '公司ID',
    declaration_type TINYINT NOT NULL COMMENT '申报类型:1出口,2进口',
    material_type TINYINT NOT NULL COMMENT '物资类型:1一般物资,2特殊物资',
    business_type VARCHAR(20) COMMENT '业务类型:内贸/外贸',
    current_stage VARCHAR(50) COMMENT '当前阶段',
    current_status VARCHAR(50) COMMENT '当前状态',
    ship_name VARCHAR(100) COMMENT '船名',
    voyage_no VARCHAR(50) COMMENT '航次',
    pic_number VARCHAR(50) COMMENT 'PIC号',
    port_of_loading VARCHAR(100) COMMENT '装货港',
    port_of_discharge VARCHAR(100) COMMENT '卸货港',
    estimated_departure DATE COMMENT '预计开船日期',
    actual_departure DATE COMMENT '实际开船日期',
    total_amount DECIMAL(15,2) COMMENT '总金额',
    currency VARCHAR(10) COMMENT '币种',
    operator_id BIGINT COMMENT '操作员ID',
    department_id BIGINT COMMENT '所属部门ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_declaration_no (declaration_no),
    INDEX idx_company (company_id),
    INDEX idx_type (declaration_type, material_type),
    INDEX idx_status (current_status),
    INDEX idx_stage (current_stage)
) COMMENT '清关申报主表';

-- 清关申报明细表
CREATE TABLE customs_declaration_detail (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    declaration_id BIGINT NOT NULL COMMENT '申报主表ID',
    material_id BIGINT NOT NULL COMMENT '物资ID',
    quantity DECIMAL(15,3) NOT NULL COMMENT '数量',
    unit VARCHAR(20) COMMENT '单位',
    unit_price DECIMAL(15,4) COMMENT '单价',
    total_price DECIMAL(15,2) COMMENT '总价',
    currency VARCHAR(10) COMMENT '币种',
    weight DECIMAL(15,3) COMMENT '重量',
    volume DECIMAL(15,3) COMMENT '体积',
    package_count INT COMMENT '包装件数',
    package_type VARCHAR(50) COMMENT '包装方式',
    remarks TEXT COMMENT '备注',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_declaration (declaration_id),
    INDEX idx_material (material_id)
) COMMENT '清关申报明细表';

-- 文件管理表
CREATE TABLE document_file (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    declaration_id BIGINT COMMENT '申报单ID',
    file_name VARCHAR(200) NOT NULL COMMENT '文件名',
    file_type VARCHAR(50) COMMENT '文件类型',
    file_category VARCHAR(50) COMMENT '文件分类',
    file_path VARCHAR(500) NOT NULL COMMENT '文件路径',
    file_size BIGINT COMMENT '文件大小',
    file_extension VARCHAR(10) COMMENT '文件扩展名',
    upload_user_id BIGINT COMMENT '上传用户ID',
    upload_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1 COMMENT '状态:1正常,0删除',
    version_no INT DEFAULT 1 COMMENT '版本号',
    is_latest TINYINT DEFAULT 1 COMMENT '是否最新版本',
    INDEX idx_declaration (declaration_id),
    INDEX idx_type (file_type),
    INDEX idx_category (file_category)
) COMMENT '文件管理表';

-- 工作流状态表
CREATE TABLE workflow_status (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    declaration_id BIGINT NOT NULL COMMENT '申报单ID',
    stage_code VARCHAR(50) NOT NULL COMMENT '阶段代码',
    stage_name VARCHAR(100) NOT NULL COMMENT '阶段名称',
    status_code VARCHAR(50) NOT NULL COMMENT '状态代码',
    status_name VARCHAR(100) NOT NULL COMMENT '状态名称',
    operator_id BIGINT COMMENT '操作员ID',
    operation_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    remarks TEXT COMMENT '备注',
    is_current TINYINT DEFAULT 0 COMMENT '是否当前状态',
    INDEX idx_declaration (declaration_id),
    INDEX idx_stage (stage_code),
    INDEX idx_status (status_code)
) COMMENT '工作流状态表';

-- 结算单表
CREATE TABLE settlement_bill (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bill_no VARCHAR(50) UNIQUE NOT NULL COMMENT '结算单号',
    declaration_id BIGINT NOT NULL COMMENT '申报单ID',
    bill_type TINYINT NOT NULL COMMENT '结算类型:1出口,2进口',
    company_id BIGINT NOT NULL COMMENT '公司ID',
    total_amount DECIMAL(15,2) NOT NULL COMMENT '总金额',
    currency VARCHAR(10) NOT NULL COMMENT '币种',
    service_fee DECIMAL(15,2) COMMENT '服务费',
    customs_fee DECIMAL(15,2) COMMENT '关税',
    other_fee DECIMAL(15,2) COMMENT '其他费用',
    bill_status VARCHAR(20) DEFAULT 'DRAFT' COMMENT '单据状态',
    create_user_id BIGINT COMMENT '创建人ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    approve_user_id BIGINT COMMENT '审批人ID',
    approve_time DATETIME COMMENT '审批时间',
    INDEX idx_bill_no (bill_no),
    INDEX idx_declaration (declaration_id),
    INDEX idx_company (company_id),
    INDEX idx_status (bill_status)
) COMMENT '结算单表';

-- 业务流程状态配置表
CREATE TABLE workflow_stage_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    business_type VARCHAR(20) NOT NULL COMMENT '业务类型:EXPORT_GENERAL,EXPORT_SPECIAL,IMPORT',
    stage_code VARCHAR(50) NOT NULL COMMENT '阶段代码',
    stage_name VARCHAR(100) NOT NULL COMMENT '阶段名称',
    stage_order INT NOT NULL COMMENT '阶段顺序',
    next_stage_code VARCHAR(50) COMMENT '下一阶段代码',
    is_required TINYINT DEFAULT 1 COMMENT '是否必经阶段',
    description TEXT COMMENT '阶段描述',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_business_type (business_type),
    INDEX idx_stage_code (stage_code)
) COMMENT '业务流程阶段配置表';

-- 文件类型配置表
CREATE TABLE document_type_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type_code VARCHAR(50) NOT NULL COMMENT '文件类型代码',
    type_name VARCHAR(100) NOT NULL COMMENT '文件类型名称',
    business_type VARCHAR(20) COMMENT '适用业务类型',
    stage_code VARCHAR(50) COMMENT '适用阶段',
    is_required TINYINT DEFAULT 0 COMMENT '是否必需文件',
    allowed_extensions VARCHAR(200) COMMENT '允许的文件扩展名',
    max_file_size BIGINT COMMENT '最大文件大小(字节)',
    description TEXT COMMENT '文件描述',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type_code (type_code),
    INDEX idx_business_type (business_type)
) COMMENT '文件类型配置表';

-- 商品HS编码表
CREATE TABLE hs_code_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    hs_code VARCHAR(20) NOT NULL COMMENT 'HS编码',
    commodity_name VARCHAR(200) NOT NULL COMMENT '商品名称',
    commodity_name_en VARCHAR(200) COMMENT '英文商品名称',
    unit VARCHAR(20) COMMENT '计量单位',
    tax_rate DECIMAL(5,2) COMMENT '税率',
    regulatory_conditions VARCHAR(500) COMMENT '监管条件',
    inspection_quarantine VARCHAR(500) COMMENT '检验检疫要求',
    parent_code VARCHAR(20) COMMENT '上级编码',
    level TINYINT DEFAULT 1 COMMENT '层级',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_hs_code (hs_code),
    INDEX idx_commodity_name (commodity_name),
    INDEX idx_parent_code (parent_code)
) COMMENT 'HS编码信息表';

-- 港口信息表
CREATE TABLE port_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    port_code VARCHAR(20) NOT NULL COMMENT '港口代码',
    port_name VARCHAR(100) NOT NULL COMMENT '港口名称',
    port_name_en VARCHAR(100) COMMENT '英文港口名称',
    country_code VARCHAR(10) COMMENT '国家代码',
    country_name VARCHAR(50) COMMENT '国家名称',
    port_type TINYINT COMMENT '港口类型:1海港,2空港,3陆港',
    customs_code VARCHAR(20) COMMENT '海关代码',
    status TINYINT DEFAULT 1 COMMENT '状态',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_port_code (port_code),
    INDEX idx_country_code (country_code),
    INDEX idx_port_type (port_type)
) COMMENT '港口信息表';

-- 汇率信息表
CREATE TABLE exchange_rate (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    base_currency VARCHAR(10) NOT NULL COMMENT '基础货币',
    target_currency VARCHAR(10) NOT NULL COMMENT '目标货币',
    exchange_rate DECIMAL(15,6) NOT NULL COMMENT '汇率',
    rate_date DATE NOT NULL COMMENT '汇率日期',
    rate_source VARCHAR(50) COMMENT '汇率来源',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_currency_date (base_currency, target_currency, rate_date),
    INDEX idx_rate_date (rate_date)
) COMMENT '汇率信息表';

-- 操作日志表
CREATE TABLE operation_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '操作用户ID',
    operation_type VARCHAR(50) NOT NULL COMMENT '操作类型',
    business_type VARCHAR(50) COMMENT '业务类型',
    business_id BIGINT COMMENT '业务ID',
    operation_desc TEXT COMMENT '操作描述',
    request_params TEXT COMMENT '请求参数',
    response_result TEXT COMMENT '响应结果',
    ip_address VARCHAR(50) COMMENT 'IP地址',
    user_agent VARCHAR(500) COMMENT '用户代理',
    operation_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    execution_time INT COMMENT '执行时间(毫秒)',
    INDEX idx_user_id (user_id),
    INDEX idx_operation_type (operation_type),
    INDEX idx_business_id (business_id),
    INDEX idx_operation_time (operation_time)
) COMMENT '操作日志表';
```

## 详细页面功能分析

### 核心业务流程页面（基于原型分析）

#### 1. 出口科业务页面

##### 1.1 首页(资料整理阶段)-总表
**页面功能**: 出口业务总览和CI/PL草本制作
**主要内容**:
- **搜索筛选区域**:
  - 状态筛选: 全部/资料整理阶段/待装船许可/待装船清单/待发票正本等文件/待LS与产品证文件/待海关申报/等待保函等资料/待生成结算单/已生成结算单
  - 船名搜索、PIC号搜索、申报编号搜索
  - 物资类型筛选: 全部/镍铁/高冰镍/风淬镍/其他
  - 操作员筛选: vi vi/zhang san/li si/gua gua

- **CI/PL草本制作表单**:
  - 公司名称选择: weda bay nickel / PT ETERNAL NICKEL INDUSTRY
  - Buyer信息: HONG KONG RUI PU CO.,LIMITED
  - Address: UNIT 2,LG 1,MIRROR TOWER,61 MODY ROAD,TSIM SHA TSUI KOWLOON,HONG KONG
  - 镍点 NI (PCT): 12.2
  - 重量 NET WEIGHT (T): 4000
  - 单价 UNIT PRICE: 110.00
  - 币种选择: USD/CNY
  - 合同号 Contract No: WBN25/FN16224
  - Invoice To、Invoice No、Invoice Date、Payment terms等字段

- **商品明细表格**:
  - Commodity: FERRO-NICKEL
  - INDEX、HS CODE: 72026000
  - NI(PCT): 11.09
  - NET WEIGHT(MT): 4,026.22
  - UNIT PRICE(USD/PCT/MT): 110.00
  - AMOUNT(USD): 4,911,585.78

##### 1.2 待装船清单页面
**页面功能**: 装船清单管理和跟踪
**表格字段**:
- 船次 Shipment: W858, W859, W860, W861, W862, W864, W868, W869, W870
- 船名航次 Vessel Name: MV.OSC PINE VOY.0319B
- 预计开船日期 ETD: May 06 2025
- 发票号 INV NO.: 018/CI/WEB/FeNi/V/25(16224)
- 单价 Unit Price (USD/CNY/MT): 110.00(USD)
- 装船重量 Actual Loading Weight(MT): 4026.22
- 镍含量 (Ni): 11.9
- 状态跟踪和操作按钮

##### 1.3 出口业务流程状态
**完整流程链**:
1. 资料整理阶段
2. 待装船许可
3. 待装船清单
4. 待发票正本等文件
5. 待LS与产地证文件
6. 已报关(上传PEB&NPE)
7. 等待保函等资料
8. 待生成结算单
9. 已生成结算单
10. 待归档
11. 归档

#### 2. 进口科业务页面

##### 2.1 进口业务完整流程状态
**详细流程链**:
1. 资料整理阶段
2. 资料待确认
3. 资料已确认
4. 待上传PIB核对草本
5. 待确认PIB核对草本
6. 待上传正式PIB草本
7. 等待管理员审核税额
8. 待上传PIB正本
9. 待上传现场查验照片
10. 待上传SPJM
11. 待上传SPPB
12. 待结算
13. 结算中
14. 已结算

##### 2.2 进口申报页面功能
**主要表单字段**:
- 费用减免申请管理
- PIB相关文件上传和确认
- 税额审核流程
- 现场查验照片上传
- SPJM/SPPB文件管理

##### 2.3 进口结算页面
**页面功能**: 进口费用结算单管理
**表格字段**:
- 结算单标题: ACC清关费用结算单 - NMI / Rincian Perhitungan Biaya Custom Clearance - NMI
- ACC确认 (Diverifikasi ACC)
- NMI确认 (Diverifikasi NMI)
- 公司信息: PT. AWAN CUSTOMS CLEARANCE / PT.NICOLE METAL INDUSTRY
- 地址: Sopo Del Office Tower A LT.21 ,Jl. Mega Kuningan Barat III LOT 10 1-6, Kuningan Timur, Setiabudi, Jakarta Selatan-DKI Jakarta
- 单号: NMI-N-25131 / ACC-QGI-25040-005
- 日期: 2025/5/5
- 金额明细:
  - 基础费用: IDR 333,841,500.00
  - 附加费用: IDR 36,722,565.00
  - 减免金额: (IDR 6,676,830.00)
  - 总计: IDR 363,887,235.00
- 审批状态: Dibuat oleh / Diverifikasi ACC / Diverifikasi LAN
- 结算类型: 大宗结算单 / 小宗结算单
- 状态: 草稿 / 待结算 / 已结算

#### 3. 保税区管理页面
- **内贸首页**: 内贸业务总览和管理
- **外贸首页**: 外贸业务总览和管理
- **待上传SPPB1/SPPB2**: SPPB文件的分类上传管理
- **待上传盖章版BC40**: BC40文件的盖章版本上传
- **待更新物资代码**: 物资代码更新管理
- **待上传签发版BC40**: BC40文件的签发版本处理
- **待上传盖章版BC2.3**: BC2.3文件的盖章版本管理

#### 4. 运营科业务页面
- **首页(装船许可-一般物资)**: 一般物资装船许可管理
- **上传出口批准函(特殊物资)**: 特殊物资出口批准函处理
- **首页(待上传BC2.3草本确认)**: BC2.3草本确认流程

#### 5. 查验科业务页面
- **首页(确认海关和第三方查验)**: 海关和第三方查验确认
- **上传SPJM**: 查验相关的SPJM文件上传

#### 6. 基础数据管理页面

##### 6.1 新增公司-基本信息页面
**页面功能**: 公司基本信息录入
**表单字段**:
- 公司全名: WEDA BAY COMPANY FULL NAME (必填)
- 公司简称: Company Sample Name (必填)
- Company LOGO（Title）: 支持文件上传，扩展名 .jpg，.png
- 步骤导航: 1.基本信息 → 2.银行账户管理 → 3.进出口法律文件 → 4.完成

##### 6.2 新增公司-银行信息页面
**页面功能**: 公司银行账户信息管理
**表单字段**:
- 银行名称
- 账户号码
- 账户名称
- SWIFT代码
- 是否默认账户
- 支持多个银行账户添加

##### 6.3 新增公司-进出口法律文件页面
**页面功能**: 进出口相关法律文件管理
**文件类型**:
- 营业执照
- 进出口许可证
- 税务登记证
- 组织机构代码证
- 海关注册证书
- 其他法律文件
**文件信息**:
- 文件名称
- 文件编号
- 签发日期
- 到期日期
- 文件上传

##### 6.4 物资管理功能
**页面功能**: 物资基础数据管理
**主要功能**:
- 物资分类管理
- 物资基础信息维护
- HS编码管理
- 海关商品编码
- 原产国信息
- 品牌型号管理

## 详细业务流程配置

### 1. 出口业务流程配置

#### 1.1 一般物资出口流程
```
资料整理阶段 → 待装船许可 → 待装船清单 → 待发票正本等文件 → 待LS与产地证文件 → 已报关(上传PEB&NPE) → 等待保函等资料 → 待生成结算单 → 已生成结算单 → 待归档 → 归档
```

**各阶段详细说明**:
1. **资料整理阶段**: 制作CI/PL草本，录入基础贸易信息
2. **待装船许可**: 申请装船许可证
3. **待装船清单**: 确认装船清单和实际装船重量
4. **待发票正本等文件**: 上传发票正本、装箱单等文件
5. **待LS与产地证文件**: 上传LS证书和产地证明文件
6. **已报关(上传PEB&NPE)**: 完成海关申报，上传PEB和NPE文件
7. **等待保函等资料**: 等待银行保函等担保资料
8. **待生成结算单**: 生成出口服务费结算单
9. **已生成结算单**: 结算单已生成，等待确认
10. **待归档**: 所有文件整理完毕，等待归档
11. **归档**: 业务流程完成，文件归档保存

#### 1.2 特殊物资出口流程
```
资料整理阶段 → 待上传授权信正本 → 待上传提单草本 → 上传出口批准函 → 待装船许可 → 其他流程同一般物资
```

### 2. 进口业务流程配置

#### 2.1 进口申报完整流程
```
资料整理阶段 → 资料待确认 → 资料已确认 → 待上传PIB核对草本 → 待确认PIB核对草本 → 待上传正式PIB草本 → 等待管理员审核税额 → 待上传PIB正本 → 待上传现场查验照片 → 待上传SPJM → 待上传SPPB → 待结算 → 结算中 → 已结算
```

**各阶段详细说明**:
1. **资料整理阶段**: 整理进口相关基础资料
2. **资料待确认**: 资料已上传，等待相关部门确认
3. **资料已确认**: 资料确认完成，进入下一阶段
4. **待上传PIB核对草本**: 上传PIB核对草本文件
5. **待确认PIB核对草本**: PIB核对草本等待确认
6. **待上传正式PIB草本**: 上传正式的PIB草本文件
7. **等待管理员审核税额**: 税额计算等待管理员审核
8. **待上传PIB正本**: 上传PIB正本文件
9. **待上传现场查验照片**: 上传海关现场查验照片
10. **待上传SPJM**: 上传SPJM相关文件
11. **待上传SPPB**: 上传SPPB放行文件
12. **待结算**: 准备费用结算
13. **结算中**: 费用结算处理中
14. **已结算**: 费用结算完成

### 3. 保税区管理流程

#### 3.1 内贸业务流程
- SPPB1文件上传和处理
- SPPB2文件上传和处理
- BC40盖章版文件管理

#### 3.2 外贸业务流程
- 物资代码更新管理
- BC40签发版处理
- BC2.3草本确认流程

## 核心功能模块详细设计

### 1. 文件管理系统

#### 1.1 支持的文件类型
- **CI/PL文件**: 商业发票和装箱单
- **PIB文件**: 进口申报单相关文件
- **SPJM文件**: 海关查验相关文件
- **SPPB文件**: 海关放行文件
- **PEB/NPE文件**: 出口申报相关文件
- **LS证书**: 装船证明文件
- **产地证**: 原产地证明文件
- **保函文件**: 银行担保文件
- **查验照片**: 现场查验照片
- **BC40/BC2.3文件**: 保税区相关文件

#### 1.2 文件操作功能
- 文件上传（支持拖拽上传）
- 文件预览（PDF、图片、Office文档）
- 文件下载和批量下载
- 文件版本管理
- 文件权限控制
- 文件审批流程

### 2. 表单设计规范

#### 2.1 CI/PL草本制作表单
**必填字段**:
- 公司名称 (Company Name)
- 买方信息 (Buyer)
- 买方地址 (Address)
- 镍点含量 (NI PCT)
- 净重量 (NET WEIGHT)
- 单价 (UNIT PRICE)
- 币种 (Currency)
- 合同号 (Contract No)

**商品明细表格字段**:
- 商品名称 (Commodity)
- 序号 (INDEX)
- HS编码 (HS CODE)
- 镍含量百分比 (NI PCT)
- 净重量 (NET WEIGHT MT)
- 单价 (UNIT PRICE USD/PCT/MT)
- 总金额 (AMOUNT USD)

#### 2.2 装船清单表格字段
- 船次 (Shipment)
- 船名航次 (Vessel Name)
- 预计开船日期 (ETD)
- 发票号 (INV NO.)
- 单价 (Unit Price)
- 装船重量 (Actual Loading Weight)
- 镍含量 (Ni)
- 操作状态

#### 2.3 进口结算单表格字段
- 结算单标题 (中英文对照)
- ACC确认状态
- NMI确认状态
- 公司信息
- 地址信息
- 单号
- 日期
- 金额明细 (基础费用、附加费用、减免金额、总计)
- 审批状态
- 结算类型
- 当前状态

### 3. 状态管理系统

#### 3.1 业务状态定义
```typescript
enum BusinessStatus {
  MATERIAL_ORGANIZATION = 'MATERIAL_ORGANIZATION',      // 资料整理阶段
  PENDING_SHIP_PERMIT = 'PENDING_SHIP_PERMIT',         // 待装船许可
  PENDING_SHIP_LIST = 'PENDING_SHIP_LIST',             // 待装船清单
  PENDING_INVOICE_ORIGINAL = 'PENDING_INVOICE_ORIGINAL', // 待发票正本等文件
  PENDING_LS_CERTIFICATE = 'PENDING_LS_CERTIFICATE',    // 待LS与产地证文件
  CUSTOMS_DECLARED = 'CUSTOMS_DECLARED',                // 已报关
  PENDING_GUARANTEE = 'PENDING_GUARANTEE',              // 等待保函等资料
  PENDING_SETTLEMENT = 'PENDING_SETTLEMENT',            // 待生成结算单
  SETTLEMENT_GENERATED = 'SETTLEMENT_GENERATED',        // 已生成结算单
  PENDING_ARCHIVE = 'PENDING_ARCHIVE',                  // 待归档
  ARCHIVED = 'ARCHIVED'                                 // 归档
}
```

#### 3.2 状态流转规则
- 每个状态只能流转到指定的下一状态
- 支持状态回退（需要权限控制）
- 状态变更需要记录操作日志
- 某些状态需要上传指定文件才能流转
- 支持并行状态处理

### 4. 页面交互设计规范

#### 4.1 列表页面交互
- **搜索筛选区域**:
  - 状态下拉选择
  - 关键字搜索（船名、PIC号、申报编号）
  - 物资类型筛选
  - 操作员筛选
  - 日期范围选择
- **操作按钮**: 查询、重置、展开/收起、导出
- **表格功能**: 排序、分页、列显示控制
- **行操作**: 查看详情、编辑、删除、状态变更

#### 4.2 表单页面交互
- **步骤导航**: 显示当前步骤和完成状态
- **表单验证**: 实时验证和提交验证
- **文件上传**: 拖拽上传、进度显示、格式限制
- **数据联动**: 下拉选项联动、自动计算
- **保存机制**: 自动保存草稿、手动保存

#### 4.3 工作流页面交互
- **流程图显示**: 可视化流程进度
- **状态指示**: 当前状态高亮、已完成状态标记
- **操作按钮**: 根据当前状态动态显示可执行操作
- **审批功能**: 审批意见、审批历史查看

### 5. API接口设计规范

#### 5.1 清关申报相关接口
```typescript
// 获取申报列表
GET /api/customs/declarations
Query: {
  page: number,
  size: number,
  status?: string,
  shipName?: string,
  picNumber?: string,
  materialType?: string,
  operatorId?: number,
  startDate?: string,
  endDate?: string
}

// 创建申报单
POST /api/customs/declarations
Body: {
  companyId: number,
  declarationType: 'EXPORT' | 'IMPORT',
  materialType: 'GENERAL' | 'SPECIAL',
  businessType: string,
  shipName: string,
  voyageNo: string,
  picNumber: string,
  details: DeclarationDetail[]
}

// 更新申报状态
PUT /api/customs/declarations/{id}/status
Body: {
  newStatus: string,
  remarks?: string,
  attachments?: string[]
}

// 上传文件
POST /api/customs/declarations/{id}/files
FormData: {
  file: File,
  fileType: string,
  category: string
}
```

#### 5.2 公司管理相关接口
```typescript
// 创建公司
POST /api/companies
Body: {
  companyName: string,
  companyCode: string,
  legalPerson: string,
  registrationNumber: string,
  taxNumber: string,
  address: string,
  contactPerson: string,
  contactPhone: string,
  contactEmail: string,
  businessScope: string
}

// 添加银行信息
POST /api/companies/{id}/banks
Body: {
  bankName: string,
  accountNumber: string,
  accountName: string,
  swiftCode?: string,
  isDefault: boolean
}

// 上传法律文件
POST /api/companies/{id}/documents
FormData: {
  file: File,
  documentType: string,
  documentName: string,
  documentNumber: string,
  issueDate: string,
  expireDate?: string
}
```

#### 5.3 结算管理相关接口
```typescript
// 获取结算单列表
GET /api/settlements
Query: {
  page: number,
  size: number,
  billType?: 'EXPORT' | 'IMPORT',
  status?: string,
  companyId?: number,
  startDate?: string,
  endDate?: string
}

// 创建结算单
POST /api/settlements
Body: {
  declarationId: number,
  billType: 'EXPORT' | 'IMPORT',
  companyId: number,
  totalAmount: number,
  currency: string,
  serviceFee: number,
  customsFee: number,
  otherFee: number,
  details: SettlementDetail[]
}

// 审批结算单
PUT /api/settlements/{id}/approve
Body: {
  approved: boolean,
  remarks?: string
}
```

### 6. 系统集成接口设计

#### 6.1 海关系统对接
```typescript
// 海关申报接口
POST /api/customs/declare
Body: {
  declarationData: CustomsDeclarationData,
  attachments: FileInfo[]
}

// 查询申报状态
GET /api/customs/status/{declarationNo}

// 获取海关回执
GET /api/customs/receipt/{declarationNo}
```

#### 6.2 银行系统对接
```typescript
// 查询水单信息
GET /api/bank/receipts
Query: {
  accountNumber: string,
  startDate: string,
  endDate: string
}

// 汇率查询
GET /api/bank/exchange-rates
Query: {
  baseCurrency: string,
  targetCurrency: string,
  date: string
}
```

#### 6.3 物流系统对接
```typescript
// 船期查询
GET /api/logistics/schedules
Query: {
  portOfLoading: string,
  portOfDischarge: string,
  departureDate: string
}

// 货物跟踪
GET /api/logistics/tracking/{trackingNo}
```

## 数据初始化脚本

### 1. 基础数据初始化
```sql
-- 插入部门数据
INSERT INTO sys_department (dept_name, dept_code, parent_id, sort_order) VALUES
('出口科', 'EXPORT', 0, 1),
('进口科', 'IMPORT', 0, 2),
('保税区管理科', 'BONDED', 0, 3),
('运营科', 'OPERATION', 0, 4),
('查验科', 'INSPECTION', 0, 5),
('基础数据管理', 'BASIC_DATA', 0, 6);

-- 插入角色数据
INSERT INTO sys_role (role_name, role_code, description) VALUES
('系统管理员', 'ADMIN', '系统管理员角色'),
('出口科操作员', 'EXPORT_OPERATOR', '出口科业务操作员'),
('进口科操作员', 'IMPORT_OPERATOR', '进口科业务操作员'),
('财务人员', 'FINANCE', '财务结算人员'),
('审核人员', 'AUDITOR', '业务审核人员');

-- 插入工作流阶段配置
INSERT INTO workflow_stage_config (business_type, stage_code, stage_name, stage_order, next_stage_code) VALUES
('EXPORT_GENERAL', 'MATERIAL_ORGANIZATION', '资料整理阶段', 1, 'PENDING_SHIP_PERMIT'),
('EXPORT_GENERAL', 'PENDING_SHIP_PERMIT', '待装船许可', 2, 'PENDING_SHIP_LIST'),
('EXPORT_GENERAL', 'PENDING_SHIP_LIST', '待装船清单', 3, 'PENDING_INVOICE_ORIGINAL'),
('EXPORT_GENERAL', 'PENDING_INVOICE_ORIGINAL', '待发票正本等文件', 4, 'PENDING_LS_CERTIFICATE'),
('EXPORT_GENERAL', 'PENDING_LS_CERTIFICATE', '待LS与产地证文件', 5, 'CUSTOMS_DECLARED'),
('EXPORT_GENERAL', 'CUSTOMS_DECLARED', '已报关(上传PEB&NPE)', 6, 'PENDING_GUARANTEE'),
('EXPORT_GENERAL', 'PENDING_GUARANTEE', '等待保函等资料', 7, 'PENDING_SETTLEMENT'),
('EXPORT_GENERAL', 'PENDING_SETTLEMENT', '待生成结算单', 8, 'SETTLEMENT_GENERATED'),
('EXPORT_GENERAL', 'SETTLEMENT_GENERATED', '已生成结算单', 9, 'PENDING_ARCHIVE'),
('EXPORT_GENERAL', 'PENDING_ARCHIVE', '待归档', 10, 'ARCHIVED'),
('EXPORT_GENERAL', 'ARCHIVED', '归档', 11, NULL);

-- 插入文件类型配置
INSERT INTO document_type_config (type_code, type_name, business_type, stage_code, is_required, allowed_extensions, max_file_size) VALUES
('CI_PL', 'CI/PL草本', 'EXPORT', 'MATERIAL_ORGANIZATION', 1, '.pdf,.doc,.docx', 10485760),
('INVOICE_ORIGINAL', '发票正本', 'EXPORT', 'PENDING_INVOICE_ORIGINAL', 1, '.pdf,.jpg,.png', 10485760),
('LS_CERTIFICATE', 'LS证书', 'EXPORT', 'PENDING_LS_CERTIFICATE', 1, '.pdf,.jpg,.png', 10485760),
('ORIGIN_CERTIFICATE', '产地证', 'EXPORT', 'PENDING_LS_CERTIFICATE', 1, '.pdf,.jpg,.png', 10485760),
('PEB_NPE', 'PEB&NPE文件', 'EXPORT', 'CUSTOMS_DECLARED', 1, '.pdf,.doc,.docx', 10485760),
('GUARANTEE', '保函文件', 'EXPORT', 'PENDING_GUARANTEE', 1, '.pdf,.doc,.docx', 10485760),
('PIB_DRAFT', 'PIB核对草本', 'IMPORT', 'PENDING_PIB_DRAFT', 1, '.pdf,.doc,.docx', 10485760),
('PIB_ORIGINAL', 'PIB正本', 'IMPORT', 'PENDING_PIB_ORIGINAL', 1, '.pdf,.doc,.docx', 10485760),
('SPJM', 'SPJM文件', 'IMPORT', 'PENDING_SPJM', 1, '.pdf,.doc,.docx', 10485760),
('SPPB', 'SPPB文件', 'IMPORT', 'PENDING_SPPB', 1, '.pdf,.doc,.docx', 10485760),
('INSPECTION_PHOTO', '查验照片', 'IMPORT', 'PENDING_INSPECTION_PHOTO', 1, '.jpg,.png,.jpeg', 5242880);
```

## 系统监控和运维

### 1. 性能监控指标
- **系统性能**: CPU使用率、内存使用率、磁盘IO
- **数据库性能**: 连接数、查询响应时间、慢查询
- **应用性能**: 接口响应时间、错误率、并发数
- **业务指标**: 日处理申报单数量、文件上传成功率

### 2. 日志管理
- **应用日志**: 业务操作日志、错误日志、性能日志
- **访问日志**: 用户访问记录、API调用记录
- **系统日志**: 系统启动、关闭、异常日志
- **审计日志**: 敏感操作记录、数据变更记录

### 3. 备份策略
- **数据库备份**: 每日全量备份、每小时增量备份
- **文件备份**: 重要文件异地备份
- **配置备份**: 系统配置文件备份
- **恢复测试**: 定期进行备份恢复测试

## 详细UI交互功能点

### 1. 筛选和搜索功能

#### 1.1 多维度筛选组件
**状态筛选下拉框**:
```typescript
// 出口业务状态选项
const exportStatusOptions = [
  { value: 'ALL', label: '全部' },
  { value: 'MATERIAL_ORGANIZATION', label: '资料整理阶段' },
  { value: 'PENDING_SHIP_PERMIT', label: '待装船许可' },
  { value: 'PENDING_SHIP_LIST', label: '待装船清单' },
  { value: 'PENDING_INVOICE_ORIGINAL', label: '待发票正本等文件' },
  { value: 'PENDING_LS_CERTIFICATE', label: '待LS与产品证文件' },
  { value: 'CUSTOMS_DECLARED', label: '待海关申报' },
  { value: 'PENDING_GUARANTEE', label: '等待保函等资料' },
  { value: 'PENDING_SETTLEMENT', label: '待生成结算单' },
  { value: 'SETTLEMENT_GENERATED', label: '已生成结算单' }
];

// 物资类型筛选选项
const materialTypeOptions = [
  { value: 'ALL', label: '全部' },
  { value: 'NICKEL_IRON', label: '镍铁' },
  { value: 'HIGH_ICE_NICKEL', label: '高冰镍' },
  { value: 'WIND_QUENCHED_NICKEL', label: '风淬镍' },
  { value: 'OTHER', label: '其他' }
];

// 操作员筛选选项
const operatorOptions = [
  { value: 'ALL', label: '全部' },
  { value: 'vi_vi', label: 'vi vi' },
  { value: 'zhang_san', label: 'zhang san' },
  { value: 'li_si', label: 'li si' },
  { value: 'gua_gua', label: 'gua gua' }
];
```

#### 1.2 搜索输入框功能
- **船名搜索**: 支持模糊搜索，实时提示
- **PIC号搜索**: 精确匹配搜索
- **申报编号搜索**: 支持部分匹配
- **物资编号/HS CODE搜索**: 支持编码和描述搜索

#### 1.3 搜索操作按钮
- **查询按钮**: 执行搜索操作
- **重置按钮**: 清空所有筛选条件
- **展开/收起按钮**: 展开或收起高级搜索选项
- **导出按钮**: 导出当前筛选结果

### 2. 表格操作功能

#### 2.1 表格列管理
**物资管理表格列配置**:
```typescript
const materialTableColumns = [
  { key: 'hsCode', title: 'HS CODE', width: 120, sortable: true },
  { key: 'descriptionEn', title: 'Description（en）', width: 200, sortable: true },
  { key: 'bm', title: 'BM', width: 80, sortable: true },
  { key: 'ppn', title: 'PPN', width: 80, sortable: true },
  { key: 'pphApi', title: 'PPH（API）', width: 100, sortable: true },
  { key: 'pphNonApi', title: 'PPH（NON-API）', width: 120, sortable: true },
  { key: 'importUnit', title: '进口单位', width: 100 },
  { key: 'exportUnit', title: '出口单位', width: 100 },
  { key: 'tradeAgreementCount', title: '贸易协定总数', width: 120 },
  { key: 'updateDate', title: '更新日期', width: 120, sortable: true },
  { key: 'actions', title: '操作', width: 150, fixed: 'right' }
];
```

#### 2.2 行操作功能
- **查看贸易协定列表**: 点击查看详细的贸易协定信息
- **编辑**: 编辑物资基础信息
- **删除**: 删除物资记录（需要确认）
- **复制**: 复制物资信息创建新记录
- **导出**: 导出单条记录信息

#### 2.3 批量操作功能
- **批量选择**: 支持全选、反选、跨页选择
- **批量删除**: 批量删除选中记录
- **批量导出**: 批量导出选中记录
- **批量更新**: 批量更新某些字段

### 3. 表单交互功能

#### 3.1 下拉选择组件
**公司名称选择下拉框**:
```typescript
const companyOptions = [
  { value: 'weda_bay_nickel', label: 'weda bay nickel' },
  { value: 'pt_eternal_nickel', label: 'PT ETERNAL NICKEL INDUSTRY' }
];
```

**币种选择下拉框**:
```typescript
const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'CNY', label: 'CNY' },
  { value: 'IDR', label: 'IDR' }
];
```

#### 3.2 模版管理功能
**CI/PL模版下拉选择**:
```typescript
const templateOptions = [
  { value: 'template_1', label: 'CI模版-镍铁标准版' },
  { value: 'template_2', label: 'CI模版-高冰镍标准版' },
  { value: 'template_3', label: 'PL模版-标准装箱单' },
  { value: 'custom', label: '自定义模版' }
];
```

**模版操作功能**:
- **选择模版**: 从预设模版中选择
- **保存为模版**: 将当前表单保存为新模版
- **编辑模版**: 修改现有模版
- **删除模版**: 删除不需要的模版
- **导入模版**: 从文件导入模版
- **导出模版**: 导出模版文件

#### 3.3 动态表单功能
**商品明细动态添加**:
- **添加行**: 动态添加新的商品明细行
- **删除行**: 删除指定的明细行
- **复制行**: 复制现有行创建新行
- **排序**: 拖拽调整行的顺序
- **批量导入**: 从Excel导入商品明细

#### 3.4 表单验证功能
**实时验证规则**:
```typescript
const validationRules = {
  companyName: { required: true, message: '请选择公司名称' },
  invoiceTo: { required: true, message: '请输入Invoice To' },
  niPct: {
    required: true,
    type: 'number',
    min: 0,
    max: 100,
    message: '镍点含量必须在0-100之间'
  },
  netWeight: {
    required: true,
    type: 'number',
    min: 0,
    message: '净重量必须大于0'
  },
  unitPrice: {
    required: true,
    type: 'number',
    min: 0,
    message: '单价必须大于0'
  }
};
```

### 4. 文件操作功能

#### 4.1 文件上传组件
**多种上传方式**:
- **拖拽上传**: 支持拖拽文件到指定区域
- **点击上传**: 点击按钮选择文件
- **批量上传**: 一次选择多个文件上传
- **断点续传**: 大文件支持断点续传

**文件类型限制**:
```typescript
const fileTypeConfig = {
  'CI_PL': {
    accept: '.pdf,.doc,.docx',
    maxSize: 10 * 1024 * 1024, // 10MB
    description: '支持PDF、Word文档，最大10MB'
  },
  'INVOICE_ORIGINAL': {
    accept: '.pdf,.jpg,.png,.jpeg',
    maxSize: 10 * 1024 * 1024,
    description: '支持PDF、图片格式，最大10MB'
  },
  'INSPECTION_PHOTO': {
    accept: '.jpg,.png,.jpeg',
    maxSize: 5 * 1024 * 1024, // 5MB
    description: '支持图片格式，最大5MB'
  }
};
```

#### 4.2 文件管理功能
- **文件预览**: 在线预览PDF、图片、Office文档
- **文件下载**: 单个或批量下载文件
- **文件重命名**: 修改文件名称
- **文件替换**: 上传新文件替换旧文件
- **版本管理**: 保留文件历史版本
- **文件分类**: 按类型自动分类管理

### 5. 数据展示功能

#### 5.1 分页组件
```typescript
const paginationConfig = {
  current: 1,
  pageSize: 20,
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
  onChange: (page, pageSize) => handlePageChange(page, pageSize)
};
```

#### 5.2 数据统计组件
**统计卡片**:
- **总数统计**: 显示各状态的业务总数
- **进度统计**: 显示业务处理进度
- **金额统计**: 显示金额汇总信息
- **时间统计**: 显示平均处理时间

#### 5.3 图表展示功能
- **状态分布饼图**: 显示各状态业务分布
- **趋势折线图**: 显示业务量趋势
- **柱状图**: 显示月度/季度统计
- **仪表盘**: 显示关键指标

### 6. 操作反馈功能

#### 6.1 消息提示
```typescript
const messageTypes = {
  success: '操作成功',
  error: '操作失败',
  warning: '警告信息',
  info: '提示信息',
  loading: '处理中...'
};
```

#### 6.2 确认对话框
- **删除确认**: 删除操作前的确认提示
- **状态变更确认**: 重要状态变更的确认
- **批量操作确认**: 批量操作的风险提示
- **数据保存确认**: 重要数据保存前的确认

#### 6.3 进度指示器
- **上传进度**: 文件上传进度条
- **处理进度**: 后台处理进度显示
- **步骤指示器**: 多步骤流程的进度指示
- **加载状态**: 数据加载时的loading状态

### 7. 快捷操作功能

#### 7.1 键盘快捷键
```typescript
const shortcuts = {
  'Ctrl+S': '保存',
  'Ctrl+N': '新增',
  'Ctrl+F': '搜索',
  'Ctrl+E': '导出',
  'Esc': '取消/关闭',
  'Enter': '确认/提交'
};
```

#### 7.2 右键菜单
- **复制**: 复制选中内容
- **粘贴**: 粘贴内容
- **编辑**: 快速编辑
- **删除**: 快速删除
- **查看详情**: 查看详细信息

#### 7.3 工具栏功能
- **刷新**: 刷新当前页面数据
- **全屏**: 全屏显示表格
- **列设置**: 自定义显示列
- **密度设置**: 调整表格行高
- **主题切换**: 切换明暗主题

这个详细的设计prompt现在包含了：
1. 基于原型分析的页面详细功能
2. 完整的业务流程配置和状态管理
3. 详细的表单字段和表格结构
4. 完整的数据库设计（包含业务表和配置表）
5. API接口设计规范
6. 系统集成方案
7. 数据初始化脚本
8. 监控和运维方案
9. **详细的UI交互功能点**（新增）
10. **筛选、搜索、表格操作等具体功能**（新增）
11. **模版管理、文件操作等交互细节**（新增）

这个prompt为开发团队提供了完整的技术实施指导，确保系统能够准确实现原型中的所有功能和业务流程，包括每一个交互细节。

## 详细业务流程配置

### 1. 出口业务流程配置

#### 1.1 一般物资出口流程
```
资料整理阶段 → 待装船许可 → 待装船清单 → 待发票正本等文件 → 待LS与产地证文件 → 已报关(上传PEB&NPE) → 等待保函等资料 → 待生成结算单 → 已生成结算单 → 待归档 → 归档
```

**各阶段详细说明**:
1. **资料整理阶段**: 制作CI/PL草本，录入基础贸易信息
2. **待装船许可**: 申请装船许可证
3. **待装船清单**: 确认装船清单和实际装船重量
4. **待发票正本等文件**: 上传发票正本、装箱单等文件
5. **待LS与产地证文件**: 上传LS证书和产地证明文件
6. **已报关(上传PEB&NPE)**: 完成海关申报，上传PEB和NPE文件
7. **等待保函等资料**: 等待银行保函等担保资料
8. **待生成结算单**: 生成出口服务费结算单
9. **已生成结算单**: 结算单已生成，等待确认
10. **待归档**: 所有文件整理完毕，等待归档
11. **归档**: 业务流程完成，文件归档保存

#### 1.2 特殊物资出口流程
```
资料整理阶段 → 待上传授权信正本 → 待上传提单草本 → 上传出口批准函 → 待装船许可 → 其他流程同一般物资
```

### 2. 进口业务流程配置

#### 2.1 进口申报完整流程
```
资料整理阶段 → 资料待确认 → 资料已确认 → 待上传PIB核对草本 → 待确认PIB核对草本 → 待上传正式PIB草本 → 等待管理员审核税额 → 待上传PIB正本 → 待上传现场查验照片 → 待上传SPJM → 待上传SPPB → 待结算 → 结算中 → 已结算
```

**各阶段详细说明**:
1. **资料整理阶段**: 整理进口相关基础资料
2. **资料待确认**: 资料已上传，等待相关部门确认
3. **资料已确认**: 资料确认完成，进入下一阶段
4. **待上传PIB核对草本**: 上传PIB核对草本文件
5. **待确认PIB核对草本**: PIB核对草本等待确认
6. **待上传正式PIB草本**: 上传正式的PIB草本文件
7. **等待管理员审核税额**: 税额计算等待管理员审核
8. **待上传PIB正本**: 上传PIB正本文件
9. **待上传现场查验照片**: 上传海关现场查验照片
10. **待上传SPJM**: 上传SPJM相关文件
11. **待上传SPPB**: 上传SPPB放行文件
12. **待结算**: 准备费用结算
13. **结算中**: 费用结算处理中
14. **已结算**: 费用结算完成

### 3. 保税区管理流程

#### 3.1 内贸业务流程
- SPPB1文件上传和处理
- SPPB2文件上传和处理
- BC40盖章版文件管理

#### 3.2 外贸业务流程
- 物资代码更新管理
- BC40签发版处理
- BC2.3草本确认流程

## 核心功能模块详细设计

### 1. 文件管理系统

#### 1.1 支持的文件类型
- **CI/PL文件**: 商业发票和装箱单
- **PIB文件**: 进口申报单相关文件
- **SPJM文件**: 海关查验相关文件
- **SPPB文件**: 海关放行文件
- **PEB/NPE文件**: 出口申报相关文件
- **LS证书**: 装船证明文件
- **产地证**: 原产地证明文件
- **保函文件**: 银行担保文件
- **查验照片**: 现场查验照片
- **BC40/BC2.3文件**: 保税区相关文件

#### 1.2 文件操作功能
- 文件上传（支持拖拽上传）
- 文件预览（PDF、图片、Office文档）
- 文件下载和批量下载
- 文件版本管理
- 文件权限控制
- 文件审批流程

#### 7. 结算管理页面
- **进口结算**: 进口业务费用结算
- **出口服务费结算单-WBN出口**: WBN出口服务费结算
- **查看**: 结算单查看功能
- **编辑**: 结算单编辑功能

## 前端目录结构设计

```
src/
├── api/                    # API接口
│   ├── auth.ts            # 认证相关
│   ├── company.ts         # 公司管理
│   ├── material.ts        # 物资管理
│   ├── customs.ts         # 清关业务
│   ├── settlement.ts      # 结算管理
│   ├── document.ts        # 文件管理
│   └── common.ts          # 通用接口
├── assets/                # 静态资源
│   ├── images/           # 图片资源
│   ├── icons/            # 图标资源
│   └── styles/           # 全局样式
├── components/            # 公共组件
│   ├── common/           # 通用组件
│   │   ├── PageHeader.vue
│   │   ├── SearchForm.vue
│   │   └── DataTable.vue
│   ├── form/             # 表单组件
│   │   ├── CustomForm.vue
│   │   ├── FileUpload.vue
│   │   └── FormItem.vue
│   ├── table/            # 表格组件
│   └── workflow/         # 工作流组件
├── layouts/              # 布局组件
│   ├── DefaultLayout.vue
│   ├── AuthLayout.vue
│   └── components/
├── pages/                # 页面组件
│   ├── auth/             # 认证页面
│   │   ├── Login.vue
│   │   └── Register.vue
│   ├── dashboard/        # 仪表板
│   │   └── Dashboard.vue
│   ├── export/           # 出口科
│   │   ├── general/      # 一般物资
│   │   │   ├── MaterialStageList.vue
│   │   │   ├── MaterialDetail.vue
│   │   │   ├── ShipmentList.vue
│   │   │   ├── InvoiceFiles.vue
│   │   │   ├── LSCertFiles.vue
│   │   │   ├── CustomsDeclaration.vue
│   │   │   ├── GuaranteeFiles.vue
│   │   │   └── MaterialShipped.vue
│   │   └── special/      # 特殊物资
│   │       ├── SpecialMaterialStage.vue
│   │       ├── AuthorizationUpload.vue
│   │       ├── BillOfLadingDraft.vue
│   │       └── ExportPermit.vue
│   ├── import/           # 进口科
│   │   ├── material/     # 资料管理
│   │   │   ├── MaterialOrganization.vue
│   │   │   ├── ApprovalDocuments.vue
│   │   │   ├── DocumentConfirmation.vue
│   │   │   ├── PIBDraftConfirm.vue
│   │   │   └── BankReceipt.vue
│   │   ├── declaration/  # 进口申报
│   │   │   ├── FeeReduction.vue
│   │   │   ├── PIBDraftUpload.vue
│   │   │   ├── PIBFormalDraft.vue
│   │   │   ├── TaxAudit.vue
│   │   │   ├── PIBOriginal.vue
│   │   │   ├── SPJMUpload.vue
│   │   │   └── SPPBUpload.vue
│   │   └── ImportSummary.vue
│   ├── bonded/           # 保税区管理
│   │   ├── domestic/     # 内贸
│   │   │   ├── DomesticHome.vue
│   │   │   ├── SPPB1Upload.vue
│   │   │   ├── SPPB2Upload.vue
│   │   │   └── BC40Stamped.vue
│   │   └── foreign/      # 外贸
│   │       ├── ForeignHome.vue
│   │       ├── MaterialCodeUpdate.vue
│   │       ├── BC40Issued.vue
│   │       └── BC23Draft.vue
│   ├── operation/        # 运营科
│   │   ├── export/       # 出口申报
│   │   ├── import/       # 进口申报
│   │   ├── domestic/     # 内贸申报
│   │   └── foreign/      # 外贸申报
│   ├── inspection/       # 查验科
│   │   ├── export/       # 出口查验
│   │   │   └── CustomsInspection.vue
│   │   └── import/       # 进口查验
│   │       └── SPJMInspection.vue
│   ├── basic/            # 基础数据管理
│   │   ├── company/      # 公司管理
│   │   │   ├── CompanyList.vue
│   │   │   ├── CompanyBasicInfo.vue
│   │   │   ├── CompanyBankInfo.vue
│   │   │   ├── CompanyLegalDocs.vue
│   │   │   └── CompanyComplete.vue
│   │   ├── material/     # 物资管理
│   │   │   ├── MaterialHome.vue
│   │   │   ├── MaterialList.vue
│   │   │   └── MaterialCategory.vue
│   │   ├── product/      # 出口成品管理
│   │   └── template/     # 模版库管理
│   └── settlement/       # 结算管理
│       ├── export/       # 出口结算
│       │   └── ExportSettlement.vue
│       └── import/       # 进口结算
│           ├── ImportSettlement.vue
│           ├── SettlementView.vue
│           └── SettlementEdit.vue
├── router/               # 路由配置
│   ├── index.ts
│   ├── modules/
│   └── guards.ts
├── stores/               # 状态管理
│   ├── auth.ts
│   ├── user.ts
│   ├── customs.ts
│   └── common.ts
├── types/                # TypeScript类型定义
│   ├── api.ts
│   ├── customs.ts
│   ├── user.ts
│   └── common.ts
├── utils/                # 工具函数
│   ├── request.ts
│   ├── auth.ts
│   ├── format.ts
│   └── validate.ts
└── styles/               # 样式文件
    ├── index.scss
    ├── variables.scss
    └── mixins.scss
```

## 后端目录结构设计

```
src/main/java/com/customs/
├── config/               # 配置类
│   ├── SecurityConfig.java
│   ├── MybatisPlusConfig.java
│   ├── RedisConfig.java
│   ├── SwaggerConfig.java
│   └── WebConfig.java
├── controller/           # 控制器
│   ├── auth/            # 认证控制器
│   │   ├── AuthController.java
│   │   └── UserController.java
│   ├── company/         # 公司管理
│   │   ├── CompanyController.java
│   │   ├── CompanyBankController.java
│   │   └── CompanyDocumentController.java
│   ├── material/        # 物资管理
│   │   ├── MaterialController.java
│   │   └── MaterialCategoryController.java
│   ├── customs/         # 清关业务
│   │   ├── DeclarationController.java
│   │   ├── WorkflowController.java
│   │   └── DocumentController.java
│   ├── settlement/      # 结算管理
│   │   ├── SettlementController.java
│   │   └── BillController.java
│   └── system/          # 系统管理
│       ├── DepartmentController.java
│       ├── RoleController.java
│       └── MenuController.java
├── service/             # 服务层
│   ├── auth/
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   └── impl/
│   ├── company/
│   │   ├── CompanyService.java
│   │   ├── CompanyBankService.java
│   │   └── impl/
│   ├── material/
│   │   ├── MaterialService.java
│   │   └── impl/
│   ├── customs/
│   │   ├── DeclarationService.java
│   │   ├── WorkflowService.java
│   │   ├── DocumentService.java
│   │   └── impl/
│   ├── settlement/
│   │   ├── SettlementService.java
│   │   └── impl/
│   └── system/
│       ├── DepartmentService.java
│       └── impl/
├── mapper/              # 数据访问层
│   ├── auth/
│   │   ├── UserMapper.java
│   │   └── UserRoleMapper.java
│   ├── company/
│   │   ├── CompanyMapper.java
│   │   ├── CompanyBankMapper.java
│   │   └── CompanyDocumentMapper.java
│   ├── material/
│   │   ├── MaterialMapper.java
│   │   └── MaterialCategoryMapper.java
│   ├── customs/
│   │   ├── DeclarationMapper.java
│   │   ├── DeclarationDetailMapper.java
│   │   ├── WorkflowStatusMapper.java
│   │   └── DocumentFileMapper.java
│   ├── settlement/
│   │   └── SettlementBillMapper.java
│   └── system/
│       ├── DepartmentMapper.java
│       └── RoleMapper.java
├── entity/              # 实体类
│   ├── auth/
│   │   ├── User.java
│   │   ├── Role.java
│   │   └── UserRole.java
│   ├── company/
│   │   ├── CompanyInfo.java
│   │   ├── CompanyBankInfo.java
│   │   └── CompanyLegalDocument.java
│   ├── material/
│   │   ├── MaterialInfo.java
│   │   └── MaterialCategory.java
│   ├── customs/
│   │   ├── CustomsDeclaration.java
│   │   ├── CustomsDeclarationDetail.java
│   │   ├── WorkflowStatus.java
│   │   └── DocumentFile.java
│   ├── settlement/
│   │   └── SettlementBill.java
│   └── system/
│       └── Department.java
├── dto/                 # 数据传输对象
│   ├── auth/
│   │   ├── LoginDTO.java
│   │   ├── UserDTO.java
│   │   └── RegisterDTO.java
│   ├── company/
│   │   ├── CompanyDTO.java
│   │   └── CompanyBankDTO.java
│   ├── material/
│   │   └── MaterialDTO.java
│   ├── customs/
│   │   ├── DeclarationDTO.java
│   │   ├── DeclarationDetailDTO.java
│   │   └── WorkflowDTO.java
│   └── settlement/
│       └── SettlementDTO.java
├── vo/                  # 视图对象
│   ├── auth/
│   │   ├── LoginVO.java
│   │   └── UserVO.java
│   ├── company/
│   │   └── CompanyVO.java
│   ├── material/
│   │   └── MaterialVO.java
│   ├── customs/
│   │   ├── DeclarationVO.java
│   │   └── WorkflowVO.java
│   └── common/
│       ├── PageVO.java
│       └── ResultVO.java
├── enums/               # 枚举类
│   ├── DeclarationType.java
│   ├── MaterialType.java
│   ├── WorkflowStage.java
│   ├── DocumentType.java
│   └── SettlementStatus.java
├── exception/           # 异常处理
│   ├── GlobalExceptionHandler.java
│   ├── BusinessException.java
│   └── CustomsException.java
├── security/            # 安全配置
│   ├── JwtAuthenticationFilter.java
│   ├── JwtTokenProvider.java
│   └── CustomUserDetailsService.java
└── utils/               # 工具类
    ├── DateUtils.java
    ├── FileUtils.java
    ├── ValidationUtils.java
    └── ResponseUtils.java
```

## 关键功能特性

### 1. 工作流引擎
- **流程定义**: 支持复杂的清关流程配置
- **状态管理**: 自动化的状态流转控制
- **审批机制**: 多级审批和权限控制
- **流程监控**: 实时流程状态跟踪
- **异常处理**: 流程异常自动处理和人工干预

### 2. 文件管理系统
- **多格式支持**: PDF、Word、Excel、图片等格式
- **版本控制**: 文件版本管理和历史记录
- **在线预览**: 支持常见格式在线预览
- **批量操作**: 批量上传、下载、删除
- **安全存储**: 文件加密存储和访问控制

### 3. 权限管理系统
- **RBAC模型**: 基于角色的权限控制
- **数据权限**: 部门级别的数据隔离
- **功能权限**: 细粒度的功能权限控制
- **操作审计**: 完整的操作日志记录
- **单点登录**: 支持SSO集成

### 4. 数据统计分析
- **业务报表**: 清关业务统计分析
- **实时监控**: 业务数据实时监控
- **趋势分析**: 历史数据趋势分析
- **导出功能**: 多格式数据导出
- **可视化**: 图表化数据展示

### 5. 系统集成能力
- **海关系统**: 与海关电子口岸对接
- **银行系统**: 银行支付和水单获取
- **物流系统**: 第三方物流信息集成
- **ERP系统**: 企业ERP系统数据同步
- **消息通知**: 短信、邮件、站内消息

## 性能优化策略

### 1. 数据库优化
- **索引优化**: 基于查询模式的索引设计
- **分库分表**: 大数据量的水平分割
- **读写分离**: 主从数据库架构
- **连接池**: 数据库连接池优化
- **查询优化**: SQL查询性能优化

### 2. 缓存策略
- **Redis缓存**: 热点数据缓存
- **分布式缓存**: 集群环境缓存同步
- **缓存更新**: 智能缓存更新策略
- **缓存预热**: 系统启动时缓存预加载
- **缓存监控**: 缓存命中率监控

### 3. 前端优化
- **组件懒加载**: 按需加载页面组件
- **虚拟滚动**: 大数据量表格优化
- **图片优化**: 图片懒加载和压缩
- **CDN加速**: 静态资源CDN分发
- **代码分割**: 按路由分割代码包

### 4. 接口优化
- **分页查询**: 大数据量分页处理
- **数据压缩**: 响应数据压缩
- **接口缓存**: 查询接口缓存
- **异步处理**: 耗时操作异步化
- **限流控制**: 接口访问频率限制

## 部署架构

### 1. 开发环境
- **Docker容器化**: 统一的开发环境
- **本地开发**: 热重载和调试支持
- **数据库**: 本地MySQL实例
- **缓存**: 本地Redis实例
- **文件存储**: 本地文件系统

### 2. 测试环境
- **容器编排**: Docker Compose部署
- **负载均衡**: Nginx反向代理
- **数据库**: MySQL主从架构
- **缓存集群**: Redis Sentinel
- **监控**: 基础监控和日志

### 3. 生产环境
- **Kubernetes**: 容器编排和管理
- **高可用**: 多实例部署
- **负载均衡**: Nginx + Keepalived
- **数据库集群**: MySQL MGR集群
- **缓存集群**: Redis Cluster
- **文件存储**: 分布式文件系统
- **监控告警**: Prometheus + Grafana

## 安全策略

### 1. 认证授权
- **JWT认证**: 无状态Token认证
- **刷新机制**: Token自动刷新
- **权限控制**: 细粒度权限管理
- **会话管理**: 会话超时和并发控制
- **密码策略**: 强密码策略和定期更换

### 2. 数据安全
- **数据加密**: 敏感数据加密存储
- **传输加密**: HTTPS/TLS加密传输
- **SQL防注入**: 参数化查询
- **XSS防护**: 输入输出过滤
- **CSRF防护**: Token验证机制

### 3. 系统安全
- **防火墙**: 网络访问控制
- **入侵检测**: 异常行为监控
- **漏洞扫描**: 定期安全扫描
- **备份策略**: 数据定期备份
- **灾难恢复**: 灾难恢复预案

### 4. 操作审计
- **访问日志**: 用户访问记录
- **操作日志**: 业务操作记录
- **系统日志**: 系统运行日志
- **异常监控**: 异常行为告警
- **合规审计**: 符合行业规范

## 开发规范

### 1. 代码规范
- **命名规范**: 统一的命名约定
- **注释规范**: 完整的代码注释
- **格式规范**: ESLint + Prettier
- **提交规范**: Git提交信息规范
- **代码审查**: Pull Request审查机制

### 2. 接口规范
- **RESTful设计**: 标准REST API
- **版本管理**: API版本控制
- **响应格式**: 统一的响应结构
- **错误处理**: 标准错误码和消息
- **文档规范**: Swagger API文档

### 3. 数据库规范
- **命名规范**: 表名、字段名规范
- **设计规范**: 三范式设计原则
- **索引规范**: 合理的索引设计
- **变更管理**: 数据库版本控制
- **性能规范**: 查询性能要求

### 4. 测试规范
- **单元测试**: 核心业务逻辑测试
- **集成测试**: 接口集成测试
- **端到端测试**: 完整业务流程测试
- **性能测试**: 系统性能基准测试
- **安全测试**: 安全漏洞测试

## 项目实施计划

### 第一阶段：基础框架搭建（2周）
- 项目初始化和环境搭建
- 基础架构和框架选型
- 数据库设计和创建
- 用户认证和权限系统
- 基础组件开发

### 第二阶段：核心业务开发（6周）
- 公司管理模块
- 物资管理模块
- 清关申报核心流程
- 文件管理系统
- 工作流引擎

### 第三阶段：业务流程完善（4周）
- 出口科业务流程
- 进口科业务流程
- 保税区管理流程
- 运营科业务流程
- 查验科业务流程

### 第四阶段：结算和报表（2周）
- 结算管理模块
- 统计报表功能
- 数据导出功能
- 业务监控面板

### 第五阶段：系统集成和优化（2周）
- 第三方系统集成
- 性能优化
- 安全加固
- 系统测试

### 第六阶段：部署和上线（1周）
- 生产环境部署
- 数据迁移
- 用户培训
- 系统上线

## 技术选型说明

### 前端技术选型理由
- **Vue 3**: 现代化的前端框架，性能优秀
- **TypeScript**: 类型安全，提高代码质量
- **Vite**: 快速的构建工具，开发体验好
- **Element Plus**: 成熟的UI组件库，符合企业应用需求
- **Pinia**: 轻量级状态管理，替代Vuex

### 后端技术选型理由
- **Spring Boot 3**: 成熟的Java框架，生态完善
- **MyBatis Plus**: 简化数据库操作，提高开发效率
- **MySQL 8.0**: 稳定可靠的关系型数据库
- **Redis**: 高性能缓存，支持多种数据结构
- **JWT**: 无状态认证，适合分布式系统

### 部署技术选型理由
- **Docker**: 容器化部署，环境一致性
- **Nginx**: 高性能Web服务器和反向代理
- **Kubernetes**: 容器编排，支持自动扩缩容
- **Prometheus**: 监控系统，支持告警
- **ELK Stack**: 日志收集和分析

这个详细的设计prompt基于对CustomsDeclaration原型的深入分析，涵盖了系统的各个方面，为开发团队提供了完整的技术指导和实施路径。
```
```