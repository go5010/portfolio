import BlueBulletText from "@/components/atoms/BlueBulletText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import Link from "next/link";
import React from "react";

const ForgetPass = () => {
  return (
    <div className="min-h-screen grid">
      <div className="md:w-128 place-self-center">
        <TitleText>パスワードを忘れた場合</TitleText>
        <p className="ml-4 mb-3">
          ご登録いただいたメールアドレスを入力してください．
          <br />
          メールアドレス宛に，パスワードを送信します．
        </p>
        <TemplateContainer>
          <BlueBulletText>メールアドレス</BlueBulletText>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6"
          />
          <PrimaryButton>送　信　</PrimaryButton>
        </TemplateContainer>
      </div>
    </div>
  );
};

export default ForgetPass;
