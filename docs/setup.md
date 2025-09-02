# セットアップ手順書

## ⚙️ セットアップ

### 1. 依存関係のインストール

```bash
bun install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Supabase 設定

1. [Supabase](https://supabase.com/)でプロジェクト作成
2. Authentication > Providers > Google を有効化
3. Google OAuth 設定：Client ID/Secret、Redirect URI 設定

### 4. 開発サーバー起動

```bash
bun dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

## 📱 使用方法

1. **ルートページ**: 認証状態を確認し、ログインページへのリンクを表示
2. **認証ページ** (`/auth`): OAuth 認証またはメール認証でログイン・登録
3. **認証後**: ユーザー情報の表示とログアウト機能

## 🛠️ 開発

```bash
# 開発
bun dev

# リント・フォーマット
bun run lint
bun run format

# テスト
bun run test          # ユニットテスト
bun run test:all      # 全テスト

# ビルド
bun run build
```
