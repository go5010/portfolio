"use client";

import React, { useState } from "react";
import { Drawer, Sidebar } from "flowbite-react";
import { HiLogin, HiPencil } from "react-icons/hi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLoginUser } from "@/hooks/useLoginUser";

const Hamburger = () => {
  const { user } = useLoginUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="z-10 space-y-2 md:hidden"
      >
        <div className="w-8 h-0.5 bg-gray-500 rounded-full" />
        <div className="w-8 h-0.5 bg-gray-500 rounded-full" />
        <div className="w-8 h-0.5 bg-gray-500 rounded-full" />
      </button>

      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/authentication/sign-up"
                      icon={HiPencil}
                    >
                      Sign up
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>

      {/* <div
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
      </div> */}
    </>
  );
};

export default Hamburger;
