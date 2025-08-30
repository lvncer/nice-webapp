# Nice Webapp - Supabase 認証アプリ

Next.js 15 と Supabase を使用した認証システムを実装したアプリケーションです。

## 🚀 機能

- ✅ OAuth 認証（Google、GitHub、X/Twitter）
- ✅ メール認証（登録・ログイン）
- ✅ セッション管理
- ✅ レスポンシブデザイン
- ✅ TypeScript 完全対応

## 📦 技術スタック

- **Frontend**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Node.js

## ⚙️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabase プロジェクトのセットアップ

1. [Supabase](https://supabase.com/)でアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの設定から以下の情報を取得：
   - Project URL
   - anon (public) key

### 3. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成：

```bash
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. OAuth プロバイダーの設定

Supabase ダッシュボードで以下の OAuth プロバイダーを設定：

#### Google OAuth

1. Authentication > Providers > Google を有効化
2. Client ID と Client Secret を設定
3. Authorized redirect URIs: `https://your-project-ref.supabase.co/auth/v1/callback`

#### GitHub OAuth

1. Authentication > Providers > GitHub を有効化
2. Client ID と Client Secret を設定
3. Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`

#### X (Twitter) OAuth

1. Authentication > Providers > Twitter を有効化
2. API Key と API Secret Key を設定
3. Callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`

### 5. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

## 📱 使用方法

1. **ルートページ**: 認証状態を確認し、ログインページへのリンクを表示
2. **認証ページ** (`/auth`): OAuth 認証またはメール認証でログイン・登録
3. **認証後**: ユーザー情報の表示とログアウト機能

## 🗂️ プロジェクト構造

```
src/
├── app/
│   ├── auth/                 # 認証関連ページ
│   │   ├── page.tsx         # 認証ページ
│   │   ├── callback/        # OAuth認証コールバック
│   │   └── auth-code-error/ # 認証エラーページ
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # ホームページ
├── components/
│   ├── AuthButton.tsx       # 認証ボタンコンポーネント
│   └── UserInfo.tsx         # ユーザー情報表示コンポーネント
├── lib/
│   └── supabase/
│       ├── client.ts        # クライアントサイドSupabaseクライアント
│       └── server.ts        # サーバーサイドSupabaseクライアント
└── middleware.ts            # Next.jsミドルウェア（セッション更新）
```

## 🔒 セキュリティ機能

- セッションの自動更新
- CSRF プロテクション
- HTTPS リダイレクト（本番環境）
- セキュアな Cookie 設定

## 🛠️ 開発

### リント・フォーマット

```bash
# リントチェック
npm run lint

# フォーマット
npm run format
```

### ビルド

```bash
npm run build
```

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
