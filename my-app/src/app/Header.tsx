"use client";
// client componentにしてしまって大丈夫か？すべてclientレンダリングにならないか？

import { useLoginUser } from "@/hooks/useLoginUser";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useLoginUser();
  return (
    <header className="py-5 px-10 border-b-2 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-logo text-theme-blue tracking-tighter">
          <Link href="/">spots viewer</Link>
        </h1>
      </div>
      <div className="font-semibold">
        {user == null ? (
          <nav>
            <Link href="/login">ログイン</Link>
            <Link href="/createaccount" className="ml-7">
              新規登録
            </Link>
            <Link href="/inquiry" className="ml-7">
              お問い合わせ
            </Link>
          </nav>
        ) : (
          <nav>
            <Link href="/">ログアウト</Link>
            <Link href="/setaccount" className="ml-7">
              アカウント設定
            </Link>
            <Link href="/inquiry" className="ml-7">
              お問い合わせ
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
