# 株式会社後藤 福祉事業部つなぐ - Webサイトリニューアル

## Tech Stack
- **Framework**: Astro (TypeScript strict / SSG)
- **Style**: TailwindCSS v4 (CSS変数でデザイントークン管理)
- **CMS**: microCMS (microcms-js-sdk)
- **Deploy**: Vercel
- **Interactive**: React islands (必要最小限)
- **Package Manager**: pnpm

## ディレクトリ構造
```
src/
├── assets/images/     # 画像素材
├── components/
│   ├── common/        # Header, Footer, Button 等
│   └── sections/      # Hero, Services, Flow 等（ページセクション）
├── layouts/           # BaseLayout
├── lib/               # microCMS client, ユーティリティ
├── pages/             # ルーティング
├── styles/            # global.css（デザイントークン）
└── types/             # 型定義
```

## 規約
- TypeScript必須・any型禁止
- Islands Architecture: JSは必要最小限、インタラクティブ部分のみReact island
- コンポーネントは単一責任
- セマンティックHTML + ARIA属性
- モバイルファースト
- 環境変数は.env.localで管理
- マジックナンバー禁止 → デザイントークン or 定数

## デザイントークン (src/styles/global.css)
- Primary: #002060 (ネイビー)
- Accent: #4a90d9 (スカイブルー)
- Font: Noto Sans JP / Noto Serif JP / DM Serif Display

## マイルストーン
- [x] M1: セットアップ
- [x] M2: 共通レイアウト (Header / Footer)
- [x] M3: トップページ
- [x] M4: microCMS連携
- [x] M5: 下層ページ
- [ ] M6: お問い合わせフォーム
- [ ] M7: SEO・パフォーマンス
- [ ] M8: Vercelデプロイ
