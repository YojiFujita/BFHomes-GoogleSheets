# BFHomes - Google Sheets 連携版

改築費用サイトのGoogle Sheets連携版です。写真や改築費用データをGoogle Sheetsで管理できるように機能を拡張しました。

## 🚀 主な機能

- **Before/After写真ギャラリー**: Google Sheetsから動的に読み込まれるプロジェクト事例
- **料金計算システム**: Google Sheetsで管理される料金データに基づく見積もり機能
- **管理画面**: プロジェクトデータの追加・編集・削除とGoogle Sheetsへの保存
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 🛠️ 技術スタック

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Google Sheets (Google Sheets API v4)
- **Authentication**: Google Service Account
- **Charts**: Recharts
- **Maps**: React Google Maps API

## 📋 前提条件

- Node.js 18.0 以上
- npm または yarn
- Googleアカウント
- Google Cloud Console へのアクセス

## 🚀 セットアップ

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone <repository-url>
cd BFHomes-GoogleSheets
npm install
```

### 2. Google Sheets連携の設定

詳細な設定手順は [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) を参照してください。

### 3. 環境変数の設定

`.env.local` ファイルを作成：

```env
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account"...}
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 📁 プロジェクト構造

```
BFHomes-GoogleSheets/
├── app/
│   ├── api/                 # API routes
│   │   ├── projects/        # プロジェクトデータAPI
│   │   └── pricing/         # 料金データAPI
│   ├── admin/               # 管理画面
│   ├── gallery/             # ギャラリーページ
│   ├── pricing/             # 料金ページ
│   └── components/          # 共通コンポーネント
├── lib/
│   └── google-sheets.ts     # Google Sheets API処理
├── .env.example             # 環境変数例
└── GOOGLE_SHEETS_SETUP.md   # セットアップガイド
```

## 🔧 主要なAPIエンドポイント

- `GET /api/projects` - プロジェクトデータの取得
- `POST /api/projects` - プロジェクトデータの保存
- `GET /api/pricing` - 料金データの取得
- `POST /api/pricing` - 料金データの保存

## 📊 Google Sheetsの構造

### Projectsシート
| 列 | 項目 | 説明 |
|---|---|---|
| A | ID | プロジェクトID |
| B | タイトル | プロジェクト名 |
| C | カテゴリー | modern/luxury/vintage等 |
| D | Before画像 | リフォーム前の画像URL |
| E | After画像 | リフォーム後の画像URL |
| F | 説明 | プロジェクトの詳細説明 |
| G | 価格 | 工事費用 |
| H | 工期 | 工事期間 |
| I | 場所 | 工事場所 |
| J | 完成日 | 工事完了日 |
| K | 面積 | 工事面積 |
| L | 人気 | 人気事例フラグ |
| M | フィーチャー | 特集フラグ |

### Pricingシート
| 列 | 項目 | 説明 |
|---|---|---|
| A | ID | サービスID |
| B | サービス種別 | basic/option/additional |
| C | サービス名 | サービス名称 |
| D | 価格 | 料金（数値） |
| E | 表示価格 | 表示用料金文字列 |
| F | 説明 | サービス説明 |
| G | カテゴリー | サービスカテゴリ |

## 🔐 セキュリティ

- サービスアカウントの認証情報は適切に管理してください
- `.env.local` ファイルはGitにコミットしないでください
- 本番環境では環境変数を適切に設定してください

## 🚀 デプロイ

### Vercel
1. Vercelにプロジェクトをインポート
2. 環境変数を設定
3. デプロイ

### その他のプラットフォーム
環境変数が適切に設定されていれば、Next.jsをサポートする任意のプラットフォームにデプロイできます。

## 🤝 コントリビューション

1. フォークしてください
2. フィーチャーブランチを作成してください (`git checkout -b feature/AmazingFeature`)
3. 変更をコミットしてください (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュしてください (`git push origin feature/AmazingFeature`)
5. プルリクエストを開いてください

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🐛 トラブルシューティング

よくある問題と解決方法については [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) のトラブルシューティングセクションを参照してください。

## 📞 サポート

問題が発生した場合は、GitHubのIssuesページでお知らせください。
