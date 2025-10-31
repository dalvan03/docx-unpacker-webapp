# DOCX Unpacker Web App

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)

> **其他语言阅读:** [English](README.md) | [Português (Brasil)](README-pt-br.md) | [Español](README-es.md) | [Français](README-fr.md) | [Deutsch](README-de.md) | [日本語](README-ja.md) | **中文**

用于提取和显示DOCX文件内容的现代Web应用程序。使用Next.js、TypeScript和Tailwind CSS构建，具有多语言支持和SEO优化功能。

## 📋 概述

DOCX Unpacker Web App是一个Web应用程序，允许用户上传Microsoft Word文档（.docx）并直接在Web浏览器中查看其内容。该应用程序提取文档内容并以结构化、易读的格式显示。

### ✨ 主要功能

- 📄 **DOCX文件上传**: 拖放或点击选择文件
- 🔍 **内容提取**: 提取文档文本、图像和表格
- 🎨 **响应式设计**: 针对所有设备优化显示
- 🌍 **多语言支持**: 支持21种语言
- ⚡ **快速处理**: 客户端高效文件处理
- 🔒 **隐私优先**: 文件在本地处理，不发送到服务器
- 🎯 **SEO优化**: 针对搜索引擎优化
- 📱 **PWA就绪**: 渐进式Web应用程序功能

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: Radix UI
- **图标**: Lucide React
- **文件处理**: JSZip, xml2js
- **国际化**: next-intl
- **部署**: Vercel
- **AI集成**: Google Genkit (可选)

## 🏗️ 架构

```
用户 → 文件上传 → 客户端处理 → 内容显示
    ↓
[浏览器] → [JSZip] → [XML解析] → [React显示]
```

### 核心组件

1. **文件上传器**: 拖放界面
2. **DOCX解析器**: 文件内容提取和解析
3. **内容渲染器**: 结构化内容显示
4. **多语言系统**: 动态语言切换
5. **SEO组件**: 元数据和站点地图生成

## 📸 截图

*注意: 截图将在未来添加*

## 🚀 快速开始

### 先决条件

- Node.js 18.0或更高版本
- npm、yarn、pnpm或bun

### 安装

1. 克隆仓库:
```bash
git clone https://github.com/yourusername/docx-unpacker-webapp.git
cd docx-unpacker-webapp
```

2. 安装依赖:
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 启动开发服务器:
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 📖 使用方法

### 基本使用

1. **文件上传**: 拖放DOCX文件或点击选择
2. **等待处理**: 应用程序自动处理文件
3. **查看内容**: 提取的内容以结构化格式显示
4. **语言切换**: 使用右上角的语言选择器更改语言

### 支持的文件格式

- `.docx` - Microsoft Word文档（2007及更高版本）

### 限制

- 最大文件大小: 10MB
- 复杂格式可能会简化
- 不支持宏或VBA代码

## 🌍 国际化 (i18n)

该应用程序支持以下21种语言：

- 🇸🇦 العربية (ar)
- 🇪🇬 العربية المصرية (arz)
- 🇧🇩 বাংলা (bn)
- 🇩🇪 Deutsch (de)
- 🇺🇸 English (en)
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇮🇳 हिन्दी (hi)
- 🇮🇩 Bahasa Indonesia (id)
- 🇯🇵 日本語 (ja)
- 🇳🇱 Nederlands (nl)
- 🇳🇬 Nigerian Pidgin (pcm)
- 🇧🇷 Português (pt)
- 🇷🇺 Русский (ru)
- 🇮🇳 தமிழ் (ta)
- 🇮🇳 తెలుగు (te)
- 🇹🇷 Türkçe (tr)
- 🇵🇰 اردو (ur)
- 🇻🇳 Tiếng Việt (vi)
- 🇭🇰 粵語 (yue)
- 🇨🇳 中文 (zh)

### 添加新语言

1. 在 `messages/` 目录中创建新的语言文件
2. 在 `src/i18n/request.ts` 中配置语言
3. 创建相应的README文件

## 🔍 SEO & 站点地图

- **动态元数据**: 针对每种语言优化的元标签
- **结构化数据**: JSON-LD格式的模式标记
- **自动站点地图**: 包含所有语言和页面
- **Open Graph**: 社交媒体分享优化
- **Twitter Cards**: 增强Twitter分享

## 📁 项目结构

```
docx-unpacker-webapp/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React组件
│   ├── lib/                 # 实用函数
│   ├── i18n/               # 国际化配置
│   └── ai/                 # AI集成（可选）
├── messages/               # 翻译文件
├── public/                 # 静态资源
├── README-*.md            # 语言特定的README
└── package.json           # 项目配置
```

## 🗺️ 路线图

### 短期目标
- [ ] 改进文件处理
- [ ] 支持更多文件格式
- [ ] 性能优化
- [ ] 可访问性改进

### 中期目标
- [ ] 批量文件处理
- [ ] 高级格式支持
- [ ] 导出功能
- [ ] 用户偏好设置

### 长期目标
- [ ] 云存储集成
- [ ] 协作功能
- [ ] API开发
- [ ] 移动应用

## 🧪 测试 & 质量

```bash
# 运行测试
npm run test

# 运行linter
npm run lint

# 类型检查
npm run type-check

# 构建
npm run build
```

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

详细信息请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 📜 行为准则

本项目采用 [Contributor Covenant](CODE_OF_CONDUCT.md) 行为准则。通过参与，您同意遵守此准则。

## 🔒 安全

如果您发现安全漏洞，请按照 [SECURITY.md](SECURITY.md) 中的说明进行报告。

## 📄 许可证

本项目在 [MIT License](LICENSE) 下许可。

## 🔧 维护

- **积极维护**: 本项目正在积极维护
- **问题响应**: 通常在24-48小时内响应
- **更新频率**: 定期依赖更新和安全补丁

## 🙏 致谢

- Next.js团队 - 感谢出色的框架
- Tailwind CSS团队 - 感谢美丽的样式系统
- 开源社区 - 感谢持续的支持

## 📞 支持 & FAQ

### 常见问题

**Q: 支持哪些文件格式？**
A: 目前仅支持.docx（Microsoft Word 2007及更高版本）文件。

**Q: 文件会发送到服务器吗？**
A: 不会，所有处理都在浏览器中进行，文件不会发送到服务器。

**Q: 最大文件大小是多少？**
A: 当前限制为10MB。

### 获取支持

- 🐛 错误报告: [GitHub Issues](https://github.com/yourusername/docx-unpacker-webapp/issues)
- 💡 功能请求: [GitHub Discussions](https://github.com/yourusername/docx-unpacker-webapp/discussions)
- 📧 直接联系: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

**[⬆ 返回顶部](#docx-unpacker-web-app)**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
## 📸 Screenshots

![Screenshot 1](docs/screen-shot-1.png)
![Screenshot 2](docs/screen-shot-2.png)
