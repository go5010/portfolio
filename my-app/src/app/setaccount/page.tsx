"use client";

import { auth } from "@/_firebase/firebaseConfig";
import BlueBulletText from "@/components/atoms/BlueBulletText";
import DeleteAccountWithDialog from "@/components/atoms/DeleteAccountWithDialog";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import { updatePassword } from "firebase/auth";
import React, { useState } from "react";

const SetAccount = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full px-6 shrink-0">
        <TitleText>個人情報設定</TitleText>
        <TemplateContainer>
          <BlueBulletText>パスワードの再設定</BlueBulletText>
          <input
            type="text"
            placeholder="新しいパスワード"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6 text-xs sm:text-base"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <PrimaryButton
            onClickFunc={() => {
              updatePassword(auth.currentUser!, newPassword)
                .then(() => {
                  alert("パスワードを変更しました．");
                  location.reload();
                })
                .catch(() => {
                  console.log(updatePassword(auth.currentUser!, newPassword));
                  alert("有効なパスワードではありません．");
                });
            }}
          >
            更　新　
          </PrimaryButton>
          <DeleteAccountWithDialog />
        </TemplateContainer>
      </div>
    </div>
  );
};

export default SetAccount;
