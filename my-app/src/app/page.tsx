import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="max-w-screen-lg mx-auto">
        <div>旅行計画の手助けに。</div>
      </div>

      <div className="bg-theme-blue2">
        <div className="max-w-screen-lg mx-auto py-16">
          <div className="text-center font-extrabold text-3xl pb-12">
            spots viewerの機能
          </div>
          <div className="flex justify-around">
            <div className="text-center">
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

      <div className="max-w-screen-lg mx-auto py-52">
        <div className="text-center font-extrabold text-3xl mb-8">
          さっそく使ってみよう！
        </div>
        <div className="flex justify-center">
          <button className=" text-white text-center text-xl py-4 px-8 rounded-lg bg-theme-blue hover:opacity-80 border-none outline-none">
            使ってみる
          </button>
        </div>
      </div>
    </div>
  );
}
