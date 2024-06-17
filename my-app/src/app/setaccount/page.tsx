import BlueBulletText from "@/components/atoms/BlueBulletText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import Link from "next/link";
import React from "react";

const SetAccount = () => {
  return (
    <div className="min-h-screen grid">
      <form className="w-128 mx-6 place-self-center">
        <TitleText>個人情報設定</TitleText>
        <TemplateContainer>
          <BlueBulletText>メールアドレス</BlueBulletText>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-4"
          />
          <BlueBulletText>パスワード</BlueBulletText>
          <input
            type="text"
            placeholder="新しいパスワード"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6"
          />
          <PrimaryButton>更　新　</PrimaryButton>
          <div className="text-sky-600 mt-4 text-center text-sm">
            <Link href="/createaccount">
              アカウントを削除される場合はこちら
            </Link>
          </div>
        </TemplateContainer>
      </form>
    </div>
  );
};

export default SetAccount;
