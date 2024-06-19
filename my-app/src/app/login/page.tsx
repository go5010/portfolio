import BlueBulletText from "@/components/atoms/BlueBulletText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import TemplateContainer from "@/components/atoms/TemplateContainer";
import TitleText from "@/components/atoms/TitleText";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="max-w-128 mx-12 shrink-0">
        <TitleText>ログイン</TitleText>
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
            placeholder="password"
            className="border-2 rounded w-full py-1 px-2 mt-1.5 mb-6"
          />
          <PrimaryButton>ログイン</PrimaryButton>
          <ul className="mt-4 ml-6 text-sm  list-disc">
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
