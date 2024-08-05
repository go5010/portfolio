"use client";

import Image1WithBlur from "@/components/atoms/Image1WithBlur";
import Image2WithBlur from "@/components/atoms/Image2WithBlur";
import Image3WithBlur from "@/components/atoms/Image3WithBlur";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addDay,
  createTrip,
  deleteDay,
  deleteTrip,
  getTests,
  renameTrip,
} from "./_api/db";
import { DocumentData } from "firebase/firestore";

export default function Home() {
  const [test, setTest] = useState<DocumentData[]>();
  useEffect(() => {
    // const fetchTestData = async () => {
    //   try {
    //     const testData = await getTests();
    //     console.log("aaaaa");
    //     console.log(testData);
    //     console.log("aaaaa");
    //     if (testData) setTest(testData);
    //   } catch (error) {
    //     console.error("データの取得に失敗しました:", error);
    //     throw error;
    //   }
    // };
    // fetchTestData();
    // renameTrip();
    // addDay();
    // deleteTrip();
  }, []);
  return (
    <div className="">
      <div className="max-w-screen-lg mx-auto lg:h-[700px] md:h-[550px] sm:h-[500px] xs:h-[400px] relative">
        <div className="bg-theme-blue text-white text-4xl font-AdSlogan py-3 pl-7 pr-3 absolute lg:top-[270px] lg:left-[50px] hidden lg:block">
          旅行計画の手助けに。
        </div>

        <div className="relative md:top-[180px] md:left-[90px] sm:top-[153px] sm:left-[65px] z-10 max-[639.5px]:w-[260px]  max-[639.5px]:h-[20px] max-[639.5px]:mx-auto max-[639.5px]:top-[163px]">
          <div className="bg-theme-blue text-white xs:text-xl sm:text-3xl font-AdSlogan xs:py-1.5 xs:px-3 sm:py-2.5 sm:px-5 inline-block lg:hidden absolute">
            旅行計画の
          </div>
          <div className="bg-theme-blue text-white xs:text-xl sm:text-3xl font-AdSlogan xs:py-1.5 xs:pl-3 sm:py-2.5 sm:pl-5 sm:pr-1 inline-block lg:hidden absolute xs:top-[30px] xs:left-[40px] sm:top-[45px] sm:left-[60px]">
            手助けに。
          </div>
        </div>

        <div className="absolute lg:right-[530px] lg:top-[45px] md:right-[450px] md:top-[35px] sm:right-[350px] sm:top-[27px] max-[639.5px]:w-full max-[639.5px]:text-center xs:top-[19px] xs:right-[110px]">
          <div className="inline-block relative">
            <div className="inline-block absolute">
              <Image1WithBlur />
            </div>
            <div className="inline-block absolute lg:top-[218px] lg:left-[234px] md:top-[170px] md:left-[183px] sm:top-[150px] sm:left-[161px] xs:top-[150px] xs:left-[161px]">
              <Image2WithBlur />
            </div>
            <div className="inline-block absolute lg:top-[312px] lg:-left-[72px] md:top-[244px] md:-left-[56px] sm:top-[214px] sm:-left-[49px] xs:top-[214px] xs:left-[-49px]">
              <Image3WithBlur />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-theme-blue2">
        <div className="max-w-screen-lg mx-auto sm:py-16 xs:py-10 max-[639.5px]:px-[5px]">
          <div className="text-center font-extrabold xs:text-lg sm:text-3xl sm:pb-16 xs:pb-8">
            spots viewerの機能
          </div>
          <div className="lg:flex justify-around">
            <div className="text-center xs:mb-10 sm:mb-14 lg:mb-0">
              <Image
                src="/search_screenshot.png"
                alt=""
                width={460}
                height={200}
                className="mx-auto"
              />
              <div className="font-extrabold sm:text-xl xs:text-sm sm:pt-8 xs:pb-2 xs:pt-5">
                検索
              </div>
              <p className="sm:text-base xs:text-xs">
                気になるエリア・カテゴリからスポットを検索できます．
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/map_pins.png"
                alt=""
                width={460}
                height={200}
                className="mx-auto"
              />
              <div className="font-extrabold sm:text-xl xs:text-sm sm:pt-8 xs:pb-2 xs:pt-5">
                マップ表示
              </div>
              <p className="sm:text-base xs:text-xs">
                行き先候補に追加したスポットがマップ上に一覧表示されます．
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto lg:py-48 sm:py-32 xs:py-20">
        <div className="text-center font-extrabold xs:text-lg sm:text-3xl sm:mb-8 xs:pb-4">
          さっそく使ってみよう！
        </div>
        <div className="flex justify-center">
          <Link
            href="/schedule"
            className=" text-white text-center sm:text-xl sm:py-4 sm:px-8 xs:text-md xs:py-3 xs:px-6 rounded-lg bg-theme-blue hover:opacity-80 border-none outline-none"
          >
            使ってみる
          </Link>
        </div>
      </div>
    </div>
  );
}
