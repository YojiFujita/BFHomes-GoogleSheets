# Google Sheets 連携セットアップガイド

このガイドでは、BFHomes-GoogleSheetsプロジェクトでGoogle Sheetsとの連携を設定する方法を説明します。

## 1. Google Cloudプロジェクトの作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成するか、既存のプロジェクトを選択
3. プロジェクト名を「BFHomes-Sheets」などに設定

## 2. Google Sheets APIの有効化

1. Google Cloud Consoleで「APIとサービス」→「ライブラリ」に移動
2. 「Google Sheets API」を検索して選択
3. 「有効にする」をクリック

## 3. サービスアカウントの作成

1. 「APIとサービス」→「認証情報」に移動
2. 「認証情報を作成」→「サービスアカウント」を選択
3. サービスアカウント名を「bfhomes-sheets-service」などに設定
4. 作成完了後、サービスアカウントをクリック
5. 「キー」タブで「キーを追加」→「新しいキーを作成」
6. 形式「JSON」を選択してダウンロード

## 4. Google スプレッドシートの作成

1. [Google Sheets](https://sheets.google.com/)で新しいスプレッドシートを作成
2. スプレッドシート名を「BFHomes データ管理」などに設定
3. 以下のシートを作成：

### Projectsシート
以下の列を作成してください：
```
A: ID
B: タイトル
C: カテゴリー
D: Before画像
E: After画像
F: 説明
G: 価格
H: 工期
I: 場所
J: 完成日
K: 面積
L: 人気
M: フィーチャー
```

### Pricingシート
以下の列を作成してください：
```
A: ID
B: サービス種別
C: サービス名
D: 価格
E: 表示価格
F: 説明
G: カテゴリー
```

## 5. スプレッドシートの共有設定

1. 作成したスプレッドシートで「共有」ボタンをクリック
2. ダウンロードしたJSONファイル内の`client_email`の値をコピー
3. そのメールアドレスに「編集者」権限で共有

## 6. スプレッドシートIDの取得

スプレッドシートのURLから`/d/`と`/edit`の間の文字列をコピー：
```
https://docs.google.com/spreadsheets/d/[このID部分]/edit
```

## 7. 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成：

```env
# Google Sheets API設定
GOOGLE_SPREADSHEET_ID=あなたのスプレッドシートID

# 方法1: サービスアカウントキーのJSONファイル全体（推奨）
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project",...}

# 方法2: 個別の認証情報（上記の代わりに使用可能）
# GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
# GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----
```

### 環境変数の設定方法

**方法1（推奨）: JSONファイルの内容をそのまま使用**
1. ダウンロードしたJSONファイルをテキストエディタで開く
2. 全内容をコピーして`GOOGLE_SERVICE_ACCOUNT_KEY`に設定

**方法2: 個別の値を設定**
1. JSONファイルから`client_email`の値をコピーして`GOOGLE_CLIENT_EMAIL`に設定
2. JSONファイルから`private_key`の値をコピーして`GOOGLE_PRIVATE_KEY`に設定
   - 注意: `\n`文字を実際の改行として扱うため、値は改行を含む形で設定

## 8. 初期データの投入

### 方法1: 管理画面を使用
1. アプリケーションを起動: `npm run dev`
2. `/admin`にアクセス
3. 「新規事例追加」で プロジェクトデータを追加
4. 「Google Sheetsに保存」ボタンをクリック

### 方法2: スプレッドシートに直接入力
上記のシート構造に従って、データを直接入力することも可能です。

## 9. 動作確認

1. アプリケーションを起動: `npm run dev`
2. `/gallery`でプロジェクトデータが表示されることを確認
3. `/pricing`で料金データが表示されることを確認
4. `/admin`でデータの編集・保存ができることを確認

## トラブルシューティング

### エラー: "Google認証情報が設定されていません"
- `.env.local`ファイルが正しい場所にあるか確認
- 環境変数の値が正しく設定されているか確認
- アプリケーションを再起動

### エラー: "GOOGLE_SPREADSHEET_ID環境変数が設定されていません"
- スプレッドシートIDが正しく設定されているか確認
- URLからIDを正しく抽出できているか確認

### エラー: "Permission denied"
- サービスアカウントがスプレッドシートに共有されているか確認
- 「編集者」権限が付与されているか確認

### データが表示されない
- スプレッドシートのシート名が「Projects」「Pricing」になっているか確認
- 列のヘッダーが正しく設定されているか確認

## セキュリティ注意事項

1. `.env.local`ファイルは絶対にGitにコミットしないでください
2. サービスアカウントのJSONファイルは安全な場所に保管してください
3. 本番環境では環境変数を適切に設定してください
4. 不要になったサービスアカウントは削除してください

## 次のステップ

- FAQ データのGoogle Sheets対応
- 画像アップロード機能の追加
- データのバックアップ機能
- 複数ユーザーでの管理機能