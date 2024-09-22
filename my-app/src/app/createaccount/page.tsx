"use client";

import { auth } from "@/_firebase/firebaseConfig";
import BlueBulletText from "@/components/atoms/BlueBulletText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { addUser } from "../_api/db";

const CreateAccount = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="max-w-lg w-full px-6 shrink-0">
        <TitleText>アカウントを作成</TitleText>
        <TemplateContainer>
          <BlueBulletText>メールアドレス</BlueBulletText>
          <input
            type="text"
            placeholder="E-mail"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-4 text-xs sm:text-base"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <BlueBulletText>パスワード</BlueBulletText>
          <input
            type="text"
            placeholder="password"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6 text-xs sm:text-base"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PrimaryButton
            onClickFunc={(e: React.MouseEvent<HTMLInputElement>) => {
              e.preventDefault(); //リダイレクト防止

              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  addUser(user.uid);
                  router.push(`/schedule/${user.uid}`);
                  alert("登録完了しました！");
                  console.log(user);

                  // ...
                })
                .catch((error) => {
                  alert("入力が正しくありません");
                  console.log(error);
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ..
                });
            }}
          >
            新規作成
          </PrimaryButton>
        </TemplateContainer>
      </form>
    </div>
  );
};

export default CreateAccount;
