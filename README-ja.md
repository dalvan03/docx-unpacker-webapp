# DOCX Unpacker Web App

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)

> **他の言語で読む:** [English](README.md) | [Português (Brasil)](README-pt-br.md) | [Español](README-es.md) | [Français](README-fr.md) | [Deutsch](README-de.md) | **日本語**

DOCXファイルの内容を抽出・表示するためのモダンなWebアプリケーション。Next.js、TypeScript、Tailwind CSSで構築され、多言語対応とSEO最適化を備えています。

## 📋 概要

DOCX Unpacker Web Appは、ユーザーがMicrosoft Word文書（.docx）をアップロードし、その内容をWebブラウザで直接表示できるWebアプリケーションです。このアプリケーションは、文書の内容を抽出し、構造化された読みやすい形式で表示します。

### ✨ 主な機能

- 📄 **DOCXファイルアップロード**: ドラッグ&ドロップまたはクリックでファイル選択
- 🔍 **コンテンツ抽出**: 文書のテキスト、画像、表を抽出
- 🎨 **レスポンシブデザイン**: すべてのデバイスで最適化された表示
- 🌍 **多言語対応**: 21言語をサポート
- ⚡ **高速処理**: クライアントサイドでの効率的なファイル処理
- 🔒 **プライバシー重視**: ファイルはローカルで処理され、サーバーに送信されません
- 🎯 **SEO最適化**: 検索エンジン向けに最適化
- 📱 **PWA対応**: プログレッシブWebアプリケーション機能

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: Radix UI
- **アイコン**: Lucide React
- **ファイル処理**: JSZip, xml2js
- **国際化**: next-intl
- **デプロイ**: Vercel
- **AI統合**: Google Genkit (オプション)

## 🏗️ アーキテクチャ

```
ユーザー → ファイルアップロード → クライアントサイド処理 → コンテンツ表示
    ↓
[ブラウザ] → [JSZip] → [XML解析] → [React表示]
```

### 主要コンポーネント

1. **ファイルアップローダー**: ドラッグ&ドロップインターフェース
2. **DOCXパーサー**: ファイル内容の抽出と解析
3. **コンテンツレンダラー**: 構造化されたコンテンツの表示
4. **多言語システム**: 動的言語切り替え
5. **SEOコンポーネント**: メタデータとサイトマップ生成

## 📸 スクリーンショット

*注意: スクリーンショットは今後追加予定です*

## 🚀 はじめに

### 前提条件

- Node.js 18.0以上
- npm、yarn、pnpm、またはbun

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/yourusername/docx-unpacker-webapp.git
cd docx-unpacker-webapp
```

2. 依存関係をインストール:
```bash
npm install
# または
yarn install
# または
pnpm install
```

3. 開発サーバーを起動:
```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📖 使用方法

### 基本的な使用方法

1. **ファイルアップロード**: DOCXファイルをドラッグ&ドロップするか、クリックして選択
2. **処理待機**: アプリケーションがファイルを自動的に処理
3. **コンテンツ表示**: 抽出されたコンテンツが構造化された形式で表示
4. **言語切り替え**: 右上の言語セレクターで言語を変更

### サポートされるファイル形式

- `.docx` - Microsoft Word文書（2007以降）

### 制限事項

- 最大ファイルサイズ: 10MB
- 複雑な書式設定は簡略化される場合があります
- マクロやVBAコードはサポートされていません

## 🌍 国際化（i18n）

このアプリケーションは以下の21言語をサポートしています：

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

### 新しい言語の追加

1. `messages/` ディレクトリに新しい言語ファイルを作成
2. `src/i18n/request.ts` で言語を設定
3. 対応するREADMEファイルを作成

## 🔍 SEO & サイトマップ

- **動的メタデータ**: 各言語に最適化されたメタタグ
- **構造化データ**: JSON-LD形式のスキーママークアップ
- **自動サイトマップ**: すべての言語とページを含む
- **Open Graph**: ソーシャルメディア共有の最適化
- **Twitter Cards**: Twitter共有の強化

## 📁 プロジェクト構造

```
docx-unpacker-webapp/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reactコンポーネント
│   ├── lib/                 # ユーティリティ関数
│   ├── i18n/               # 国際化設定
│   └── ai/                 # AI統合（オプション）
├── messages/               # 翻訳ファイル
├── public/                 # 静的アセット
├── README-*.md            # 言語別README
└── package.json           # プロジェクト設定
```

## 🗺️ ロードマップ

### 短期目標
- [ ] ファイル処理の改善
- [ ] より多くのファイル形式のサポート
- [ ] パフォーマンスの最適化
- [ ] アクセシビリティの向上

### 中期目標
- [ ] バッチファイル処理
- [ ] 高度な書式設定サポート
- [ ] エクスポート機能
- [ ] ユーザー設定

### 長期目標
- [ ] クラウドストレージ統合
- [ ] コラボレーション機能
- [ ] API開発
- [ ] モバイルアプリ

## 🧪 テスト & 品質

```bash
# テスト実行
npm run test

# リンター実行
npm run lint

# 型チェック
npm run type-check

# ビルド
npm run build
```

## 🤝 コントリビューション

コントリビューションを歓迎します！以下の手順に従ってください：

1. プロジェクトをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

詳細については [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

## 📜 行動規範

このプロジェクトは [Contributor Covenant](CODE_OF_CONDUCT.md) 行動規範を採用しています。参加することで、この規範を遵守することに同意したものとみなされます。

## 🔒 セキュリティ

セキュリティの脆弱性を発見した場合は、[SECURITY.md](SECURITY.md) の手順に従って報告してください。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下でライセンスされています。

## 🔧 メンテナンス

- **アクティブメンテナンス**: このプロジェクトは積極的にメンテナンスされています
- **イシュー対応**: 通常24-48時間以内に対応
- **更新頻度**: 定期的な依存関係の更新とセキュリティパッチ

## 🙏 謝辞

- Next.jsチーム - 素晴らしいフレームワークに感謝
- Tailwind CSSチーム - 美しいスタイリングシステムに感謝
- オープンソースコミュニティ - 継続的なサポートに感謝

## 📞 サポート & FAQ

### よくある質問

**Q: どのファイル形式がサポートされていますか？**
A: 現在、.docx（Microsoft Word 2007以降）ファイルのみサポートしています。

**Q: ファイルはサーバーに送信されますか？**
A: いいえ、すべての処理はブラウザ内で行われ、ファイルがサーバーに送信されることはありません。

**Q: 最大ファイルサイズは？**
A: 現在の制限は10MBです。

### サポートを受ける

- 🐛 バグ報告: [GitHub Issues](https://github.com/yourusername/docx-unpacker-webapp/issues)
- 💡 機能リクエスト: [GitHub Discussions](https://github.com/yourusername/docx-unpacker-webapp/discussions)
- 📧 直接連絡: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

**[⬆ トップに戻る](#docx-unpacker-web-app)**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
## 📸 Screenshots

![Screenshot 1](docs/screen-shot-1.png)
![Screenshot 2](docs/screen-shot-2.png)
