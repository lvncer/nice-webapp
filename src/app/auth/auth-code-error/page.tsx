import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="エラーアイコン"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">認証エラー</h1>
        <p className="text-gray-600 mb-6">
          認証コードの処理中にエラーが発生しました。
          <br />
          再度お試しください。
        </p>
        <div className="space-y-3">
          <Link
            href="/auth"
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ログインページに戻る
          </Link>
          <Link
            href="/"
            className="block w-full text-gray-500 hover:text-gray-700 text-sm"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
