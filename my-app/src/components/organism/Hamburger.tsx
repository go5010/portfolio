import React, { useState } from "react";

import { useLoginUser } from "@/hooks/useLoginUser";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Hamburger = () => {
  const { user } = useLoginUser();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <>
      <button onClick={handleMenuOpen} className="z-10 space-y-2 md:hidden">
        <div
          className={
            openMenu
              ? "w-8 h-0.5 bg-gray-500 rounded-full translate-y-1.5 rotate-45"
              : "w-8 h-0.5 bg-gray-500 rounded-full"
          }
        />
        <div
          className={
            openMenu ? "opacity-0" : "w-8 h-0.5 bg-gray-500 rounded-full"
          }
        />
        <div
          className={
            openMenu
              ? "w-8 h-0.5 bg-gray-500 rounded-full -translate-y-1 -rotate-45"
              : "w-8 h-0.5 bg-gray-500 rounded-full"
          }
        />
      </button>

      <div
        className={
          openMenu
            ? "fixed bg-slate-100 right-0 top-0 w-1/3 h-full pt-[72px] ease-in-out duration-300 md:hidden"
            : "fixed right-[-100%] pt-[72px] md:hidden"
        }
      >
        {user === null ? (
          <nav className="flex flex-col text-center">
            <Link
              href="/login"
              className={
                pathname === "/login"
                  ? "bg-gray-300 py-2"
                  : "py-2 hover:bg-gray-300"
              }
            >
              ログイン
            </Link>
            <Link
              href="/createaccount"
              className={
                pathname === "/createaccount"
                  ? "bg-gray-300 py-2"
                  : "py-2 hover:bg-gray-300"
              }
            >
              新規登録
            </Link>
            <Link
              href="/inquiry"
              className={
                pathname === "/inquiry"
                  ? "bg-gray-300 py-2"
                  : "py-2 hover:bg-gray-300"
              }
            >
              お問い合わせ
            </Link>
          </nav>
        ) : (
          <nav>
            <Link href="/" className="py-2 hover:bg-gray-300">
              ログアウト
            </Link>
            <Link
              href="/setaccount"
              className={
                pathname === "/setaccount"
                  ? "bg-gray-300 py-2"
                  : "py-2 hover:bg-gray-300"
              }
            >
              アカウント設定
            </Link>
            <Link
              href="/inquiry"
              className={
                pathname === "/inquiry"
                  ? "bg-gray-300 py-2"
                  : "py-2 hover:bg-gray-300"
              }
            >
              お問い合わせ
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default Hamburger;
