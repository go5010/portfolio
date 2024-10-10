import React, { Dispatch, FC, memo, SetStateAction, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import municipalitiesData from "./municipalities.json";
import { cityLngLatArr } from "./municipalitiesLatLng";

type Municipalities = {
  [prefecture: string]: string[];
};

const municipalities: Municipalities = municipalitiesData;

const AreaDropdownMenu: FC<{
  setQueryLngLat: Dispatch<SetStateAction<Array<number>>>;
  isLack: string;
}> = memo(({ setQueryLngLat, isLack }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>(""); // 選択された都道府県
  const [isSelectAreaOpen, setIsSelectAreaOpen] = useState<boolean>(false);
  const [selectedMunicipalities, setSelectedMunicipalities] =
    useState<string>("");
  const [displayPrefecture, setDisplayPrefecture] = useState<string>("");

  // サブメニューを開く
  const handleSubMenuOpen = (prefecture: string) => {
    if (selectedPrefecture !== prefecture) {
      setSelectedPrefecture(prefecture);
    } else {
      setSelectedPrefecture(""); //サブメニューを閉じる.
    }
  };

  const handleSelectMunicipalities = (city: string, prefecture: string) => {
    setSelectedMunicipalities(city);
    setIsSelectAreaOpen(false);
    setDisplayPrefecture(prefecture);
    setSelectedPrefecture("");
    // 役所の座標を取得
    const targetLngLat = cityLngLatArr.find((cityLngLat) => {
      return (
        cityLngLat.name.includes(prefecture) && cityLngLat.name.includes(city)
      );
    })?.lnglat;
    console.log(targetLngLat);
    setQueryLngLat(targetLngLat!);
  };

  return (
    <div className="relative">
      {selectedMunicipalities ? (
        <button
          onClick={() => setIsSelectAreaOpen(!isSelectAreaOpen)}
          className="border border-gray-400 border-r-0 border-l-0 w-[250px] h-[40px] mb-1 text-left pl-2"
        >
          {`${displayPrefecture} ${selectedMunicipalities}`}
        </button>
      ) : (
        <button
          onClick={() => setIsSelectAreaOpen(!isSelectAreaOpen)}
          className={
            isLack === "Area"
              ? "border border-gray-400 border-r-0 border-l-0 w-[250px] h-[40px] mb-1 text-left text-red-400 pl-2"
              : "border border-gray-400 border-r-0 border-l-0 w-[250px] h-[40px] mb-1 text-left text-gray-300 pl-2"
          }
        >
          エリアを選択
        </button>
      )}

      {isSelectAreaOpen && (
        <div className="absolute bg-white">
          {/* プルダウンメニュー外クリックでメニューを閉じる */}
          <div
            onClick={() => {
              setIsSelectAreaOpen(false);
              setSelectedPrefecture("");
            }}
            className="w-screen h-screen fixed top-0 left-0 z-10"
          ></div>

          <div className="w-[200px] h-[300px] rounded border border-gray-400 pl-2 py-2 z-20 relative overflow-auto">
            {Object.keys(municipalities).map((prefecture) => (
              <React.Fragment key={prefecture}>
                <div className="flex items-center hover:bg-slate-200">
                  <button
                    onClick={() => handleSubMenuOpen(prefecture)}
                    className="flex items-center flex-grow"
                  >
                    {selectedPrefecture === prefecture ? (
                      <SlArrowDown />
                    ) : (
                      <SlArrowRight />
                    )}
                    <div className="ml-1">{prefecture}</div>
                  </button>
                </div>

                {/* サブメニュー */}
                {selectedPrefecture === prefecture &&
                  municipalities[selectedPrefecture].map((city) => (
                    <div className=" hover:bg-slate-200">
                      <button
                        onClick={() =>
                          handleSelectMunicipalities(city, prefecture)
                        }
                        className="pl-10 w-full text-left"
                      >
                        {city}
                      </button>
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default AreaDropdownMenu;
