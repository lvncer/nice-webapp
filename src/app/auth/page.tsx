"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Force dynamic rendering for auth page
export const dynamic = "force-dynamic";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize Supabase client on the client side only
    setSupabase(createClient());
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMessage("確認メールを送信しました。メールをチェックしてください。");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
      }
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "エラーが発生しました",
      );
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider: "google") => {
    if (!supabase) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? "アカウント作成" : "ログイン"}
          </h1>
          <p className="text-gray-600">
            {isSignUp
              ? "新しいアカウントを作成してください"
              : "アカウントにログインしてください"}
          </p>
        </div>

        {/* OAuth ボタン */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading || !supabase}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              aria-label="Googleアイコン"
              role="img"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Googleでログイン
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">または</span>
          </div>
        </div>

        {/* メール認証フォーム */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !supabase}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {!supabase
              ? "初期化中..."
              : loading
                ? "処理中..."
                : isSignUp
                  ? "アカウント作成"
                  : "ログイン"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes("確認メール")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            {isSignUp
              ? "すでにアカウントをお持ちの方はこちら"
              : "アカウントをお持ちでない方はこちら"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
