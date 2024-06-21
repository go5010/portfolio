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
      <button onClick={() => setOpenMenu(true)} className="space-y-2 md:hidden">
        <div className={"w-8 h-0.5 bg-gray-500 rounded-full"} />
        <div className={"w-8 h-0.5 bg-gray-500 rounded-full"} />
        <div className={"w-8 h-0.5 bg-gray-500 rounded-full"} />
      </button>

      <div
        className={
          openMenu
            ? "fixed bg-slate-100 right-0 top-0 w-1/3 h-full ease-in-out duration-300 md:hidden text-sm sm:text-base"
            : "fixed right-[-100%] md:hidden text-sm sm:text-base"
        }
      >
        <div className="text-right my-5 h-[32px] pr-5 sm:pr-10">
          <button
            onClick={() => setOpenMenu(false)}
            className="space-y-2 md:hidden text-right"
          >
            <div
              className={
                "w-8 h-0.5 bg-gray-500 rounded-full translate-y-2 rotate-45"
              }
            />
            <div className={"opacity-0"} />
            <div
              className={
                "w-8 h-0.5 bg-gray-500 rounded-full -translate-y-0.5 -rotate-45"
              }
            />
          </button>
        </div>
        {user === null ? (
          <nav className="flex flex-col text-center">
            <Link
              href="/login"
              onClick={handleMenuOpen}
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
              onClick={handleMenuOpen}
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
              onClick={handleMenuOpen}
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
            <Link
              href="/"
              onClick={handleMenuOpen}
              className="py-2 hover:bg-gray-300"
            >
              ログアウト
            </Link>
            <Link
              href="/setaccount"
              onClick={handleMenuOpen}
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
              onClick={handleMenuOpen}
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
