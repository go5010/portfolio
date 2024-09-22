"use client";

import { auth } from "@/_firebase/firebaseConfig";
import BlueBulletText from "@/components/atoms/BlueBulletText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";

const ForgetPass = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full px-6 shrink-0">
        <TitleText>パスワードを忘れた場合</TitleText>
        <p className="ml-4 mb-3 sm:text-bs xs:text-sm">
          ご登録いただいたメールアドレスを入力してください．
          <br />
          メールアドレス宛に，パスワードを送信します．
        </p>
        <TemplateContainer>
          <BlueBulletText>メールアドレス</BlueBulletText>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6 text-xs sm:text-base"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <PrimaryButton
            onClickFunc={() => {
              console.log(auth);
              sendPasswordResetEmail(auth, email)
                .then(() => {
                  alert("パスワード再設定メールを送信しました．");
                  location.reload();
                })
                .catch(() => {
                  alert("メールアドレスが間違っています．");
                });
            }}
          >
            送　信　
          </PrimaryButton>
        </TemplateContainer>
      </div>
    </div>
  );
};

export default ForgetPass;
