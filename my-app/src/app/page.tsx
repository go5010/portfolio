import Hamburger from "@/components/organism/Hamburger";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="max-w-screen-lg mx-auto min-h-screen">
        <div className="bg-theme-blue text-white text-4xl font-AdSlogan inline-block py-3 pl-7 pr-3 ">
          旅行計画の手助けに。
        </div>

        <div className="rounded-full w-80 h-80 relative after:absolute after:content-[''] after:rounded-full after:top-0 after:bottom-0 after:left-0 after:right-0 after:shadow-[inset_0_0_15px_20px_rgb(255,255,255)]">
          <Image src="/image1.png" alt="" width={500} height={500} />
        </div>
        <div className="rounded-full w-80 h-80 relative after:absolute after:content-[''] after:rounded-full after:top-0 after:bottom-0 after:left-0 after:right-0 after:shadow-[inset_0_0_15px_20px_rgb(255,255,255)]">
          <Image src="/image2_2.png" alt="" width={500} height={500} />
        </div>
        <div className="rounded-full w-80 h-80 relative after:absolute after:content-[''] after:rounded-full after:top-0 after:bottom-0 after:left-0 after:right-0 after:shadow-[inset_0_0_15px_20px_rgb(255,255,255)]">
          <Image src="/image3.png" alt="" width={500} height={500} />
        </div>
      </div>

      <div className="bg-theme-blue2">
        <div className="max-w-screen-lg mx-auto py-16">
          <div className="text-center font-extrabold text-3xl pb-16">
            spots viewerの機能
          </div>
          <div className="lg:flex justify-around">
            <div className="text-center mb-14 lg:mb-0">
              <Image
                src="/search_screenshot.png"
                alt=""
                width={460}
                height={200}
                className="mx-auto"
              />
              <div className="font-extrabold text-xl pt-8 pb-2">検索</div>
              <p>気になるエリア・カテゴリからスポットを検索できます．</p>
            </div>
            <div className="text-center">
              <Image
                src="/map_pins.png"
                alt=""
                width={460}
                height={200}
                className="mx-auto"
              />
              <div className="font-extrabold text-xl pt-8 pb-2">マップ表示</div>
              <p>行き先候補に追加したスポットがマップ上に一覧表示されます．</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto lg:py-48 py-32">
        <div className="text-center font-extrabold text-3xl mb-8">
          さっそく使ってみよう！
        </div>
        <div className="flex justify-center">
          <Link
            href="/schedule"
            className=" text-white text-center text-xl py-4 px-8 rounded-lg bg-theme-blue hover:opacity-80 border-none outline-none"
          >
            使ってみる
          </Link>
        </div>
      </div>
    </div>
  );
}
