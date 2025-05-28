# Hono + Cloudflare Workers + D1 + Prisma Backend

このプロジェクトは、Hono、Cloudflare Workers、Cloudflare D1、Prismaを使用したバックエンドAPIです。

## 技術スタック

- **Hono**: 高速で軽量なWebフレームワーク
- **Cloudflare Workers**: サーバーレス実行環境
- **Cloudflare D1**: SQLiteベースのサーバーレスデータベース
- **Prisma**: 型安全なORMとデータベースツールキット

## セットアップ

### 1. 依存関係のインストール

```bash
yarn install
```

### 2. 環境変数の設定

`.env`ファイルが既に作成されています。ローカル開発用のSQLiteデータベースが使用されます。

### 3. データベースの初期化

```bash
# Prismaクライアントの生成
yarn db:generate

# ローカルデータベースのマイグレーション
yarn db:migrate

# Cloudflare D1データベースへのマイグレーション（ローカル）
yarn d1:local

# Cloudflare D1データベースへのマイグレーション（リモート）
yarn d1:remote
```

### 4. 開発サーバーの起動

```bash
yarn dev
```

サーバーは `http://localhost:8787` で起動します。

## API エンドポイント

### 基本情報

- **ベースURL**: `http://localhost:8787` (開発時)
- **Content-Type**: `application/json`

### エンドポイント一覧

#### 1. ヘルスチェック

```
GET /
```

レスポンス:
```json
{
  "message": "Hello Hono with Prisma and D1!"
}
```

#### 2. ユーザー管理

##### ユーザー一覧取得

```
GET /users
```

レスポンス:
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "posts": []
  }
]
```

##### ユーザー作成

```
POST /users
```

リクエストボディ:
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

#### 3. 投稿管理

##### 投稿一覧取得

```
GET /posts
```

##### 投稿作成

```
POST /posts
```

リクエストボディ:
```json
{
  "title": "投稿タイトル",
  "content": "投稿内容",
  "authorId": 1,
  "published": true
}
```

## 利用可能なスクリプト

### 開発関連

- `yarn dev`: 開発サーバーの起動
- `yarn deploy`: 本番環境へのデプロイ

### データベース関連

- `yarn db:generate`: Prismaクライアントの生成
- `yarn db:migrate`: ローカルデータベースのマイグレーション
- `yarn db:studio`: Prisma Studioの起動（データベースGUI）
- `yarn db:push`: スキーマをデータベースにプッシュ
- `yarn db:reset`: データベースのリセット

### Cloudflare D1関連

- `yarn d1:local`: ローカルD1データベースへのマイグレーション適用
- `yarn d1:remote`: リモートD1データベースへのマイグレーション適用

### 型定義関連

- `yarn cf-typegen`: Cloudflare Workers用の型定義生成

## デプロイメント

### 1. リモートデータベースへのマイグレーション

```bash
yarn d1:remote
```

### 2. アプリケーションのデプロイ

```bash
yarn deploy
```

## プロジェクト構造

```
backend/
├── src/
│   ├── index.ts              # メインアプリケーションファイル
│   └── generated/
│       └── prisma/           # 生成されたPrismaクライアント
├── prisma/
│   ├── schema.prisma         # Prismaスキーマ
│   └── migrations/           # データベースマイグレーション
├── wrangler.jsonc            # Cloudflare Workers設定
├── .env                      # 環境変数
└── package.json              # 依存関係とスクリプト
```

## 開発のヒント

1. **スキーマの変更**: `prisma/schema.prisma`を編集後、`yarn db:migrate`でマイグレーションを作成
2. **型安全性**: PrismaクライアントはTypeScriptの型安全性を提供
3. **ローカルテスト**: `yarn dev`でローカル環境でのテストが可能
4. **データベース確認**: `yarn db:studio`でGUIからデータベースを確認可能

## トラブルシューティング

### よくある問題

1. **型エラー**: `yarn cf-typegen`で型定義を再生成
2. **データベース接続エラー**: マイグレーションが正しく適用されているか確認
3. **CORS エラー**: 必要に応じてCORS設定を調整

### ログの確認

開発時は`wrangler dev`のコンソール出力でエラーを確認できます。
