# ChatLog 前端管理页面

基于React + TypeScript + Semi-UI的微信聊天记录管理前端应用。

## 功能特性

- 📊 **仪表盘**: 展示系统概览和统计数据
- 💬 **消息管理**: 查看、搜索和管理微信聊天记录
- 👥 **联系人管理**: 查看和管理微信联系人信息
- 🔍 **搜索功能**: 支持消息内容和联系人搜索
- 📱 **响应式设计**: 适配不同屏幕尺寸

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Semi-UI** - 设计系统组件库
- **MobX** - 状态管理
- **Axios** - HTTP客户端
- **Vite** - 构建工具
- **React Router** - 路由管理

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 通用组件
│   └── Layout.tsx      # 页面布局组件
├── pages/              # 页面组件
│   ├── Dashboard.tsx   # 仪表盘页面
│   ├── Messages.tsx    # 消息管理页面
│   └── Contacts.tsx    # 联系人管理页面
├── stores/             # 状态管理
│   └── appStore.ts     # 主应用状态
├── types/              # TypeScript类型定义
│   └── api.ts          # API相关类型
├── utils/              # 工具函数
│   └── api.ts          # API封装
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 开发说明

### API配置

API基础地址在 `vite.config.ts` 中配置，默认代理到 `http://localhost:5030`

### 环境变量

如需修改API地址，可以创建 `.env` 文件：

```
VITE_API_BASE_URL=http://localhost:5030
```

### 代码规范

项目使用ESLint进行代码检查，运行以下命令修复代码格式：

```bash
npm run eslint-fix
```

## 与后端集成

确保ChatLog后端服务已启动：

1. 启动ChatLog后端服务（监听5030端口）
2. 启动前端开发服务器（监听3000端口）
3. 前端会自动通过代理访问后端API

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License