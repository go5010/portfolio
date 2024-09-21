"use client";

import { auth } from "@/_firebase/firebaseConfig";
import BlueBulletText from "@/components/atoms/BlueBulletText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="max-w-lg w-full px-6 shrink-0">
        <TitleText>ログイン</TitleText>
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
              e.preventDefault(); //formタグsubmitイベントによるリダイレクト防止

              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  router.push("/");
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
            ログイン
          </PrimaryButton>
          <ul className="mt-4 ml-6 sm:text-sm xs:text-xs list-disc">
            <li className="mb-1">
              <Link href="/forgetpass" className="text-sky-600">
                パスワードをお忘れの方
              </Link>
            </li>
            <li>
              <Link href="/createaccount" className="text-sky-600">
                アカウント作成はこちら
              </Link>
            </li>
          </ul>
        </TemplateContainer>
      </form>
    </div>
  );
};

export default Login;
