import PrimaryButton from "@/components/atoms/PrimaryButton";
import React from "react";

const Inquiry = () => {
  return (
    <div className="min-h-screen grid">
      <div className="md:w-inquiry-width place-self-center">
        <div className="text-2xl font-extrabold mb-4 text-center">
          お問い合わせ
        </div>
        <div className="bg-sky-50 pt-5 pb-8 px-7 rounded-xl mx-auto border-t-4 border-sky-300">
          <div className="flex items-center mb-1.5">
            <div className="font-semibold">お問い合わせ内容</div>
            <div className="bg-red-500 text-white text-sm px-2 ml-5 rounded ">
              必須
            </div>
          </div>
          <textarea className="border-2 rounded w-full h-48 py-1 px-2" />
          <div className="flex items-center mb-1.5 mt-4">
            <div className="font-semibold">メールアドレス</div>
            <div className="bg-red-500 text-white text-sm px-2 ml-5 rounded ">
              必須
            </div>
          </div>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mb-8"
          />
          <PrimaryButton>送　信　</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
