"use client";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import React from "react";

const Inquiry = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-inquiry-width w-full px-6 shrink-0">
        <div className="text-xl sm:text-2xl font-extrabold mb-4 text-center">
          お問い合わせ
        </div>
        <div className="bg-sky-50 pt-5 pb-8 px-7 rounded-xl mx-auto border-t-4 border-sky-300">
          <div className="flex items-center mb-1.5">
            <div className="font-semibold sm:text-base xs:text-sm">
              お問い合わせ内容
            </div>
            <div className="bg-red-500 text-white sm:text-sm xs:text-xs px-2 ml-5 rounded ">
              必須
            </div>
          </div>
          <textarea className="border-2 rounded w-full h-48 py-1 px-2 text-xs sm:text-base" />
          <div className="flex items-center mb-1.5 mt-4">
            <div className="font-semibold sm:text-base xs:text-sm">
              メールアドレス
            </div>
            <div className="bg-red-500 text-white sm:text-sm xs:text-xs px-2 ml-5 rounded ">
              必須
            </div>
          </div>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mb-8 text-xs sm:text-base"
          />
          <PrimaryButton
            onClickFunc={() => {
              alert("送信しました！");
              location.reload();
            }}
          >
            送　信　
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
