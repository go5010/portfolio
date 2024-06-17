"use client";
// client componentにしてしまって大丈夫か？すべてclientレンダリングにならないか？

import { useLoginUser } from "@/hooks/useLoginUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const { user } = useLoginUser();
  const pathname = usePathname();
  return (
    <header className="py-5 px-10 border-b-2 ">
      <div className="max-w-screen-lg flex justify-between items-center mx-auto">
        <div>
          <h1 className="text-3xl font-logo text-theme-blue tracking-tighter">
            <Link href="/">spots viewer</Link>
          </h1>
        </div>
        <div className="font-semibold">
          {user === null ? (
            <nav>
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "border-b-4 border-gray-600 pb-2" : ""
                }
              >
                ログイン
              </Link>
              <Link
                href="/createaccount"
                className={
                  pathname === "/createaccount"
                    ? "border-b-4 border-gray-600 pb-2 ml-7"
                    : "ml-7"
                }
              >
                新規登録
              </Link>
              <Link
                href="/inquiry"
                className={
                  pathname === "/inquiry"
                    ? "border-b-4 border-gray-600 pb-2 ml-7"
                    : "ml-7"
                }
              >
                お問い合わせ
              </Link>
            </nav>
          ) : (
            <nav>
              <Link href="/">ログアウト</Link>
              <Link
                href="/setaccount"
                className={
                  pathname === "/setaccount"
                    ? "border-b-4 border-gray-600 pb-2 ml-7"
                    : "ml-7"
                }
              >
                アカウント設定
              </Link>
              <Link
                href="/inquiry"
                className={
                  pathname === "/inquiry"
                    ? "border-b-4 border-gray-600 pb-2 ml-7"
                    : "ml-7"
                }
              >
                お問い合わせ
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
