import BlueBulletText from "@/components/atoms/BlueBulletText";
import DeleteAccountWithDialog from "@/components/atoms/DeleteAccountWithDialog";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import React from "react";

const SetAccount = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="max-w-lg w-full px-6 shrink-0">
        <TitleText>個人情報設定</TitleText>
        <TemplateContainer>
          <BlueBulletText>メールアドレス</BlueBulletText>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-4 text-xs sm:text-base"
          />
          <BlueBulletText>パスワード</BlueBulletText>
          <input
            type="text"
            placeholder="新しいパスワード"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6 text-xs sm:text-base"
          />
          <PrimaryButton>更　新　</PrimaryButton>
          <DeleteAccountWithDialog />
        </TemplateContainer>
      </form>
    </div>
  );
};

export default SetAccount;
