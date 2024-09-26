import React, { useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import municipalitiesData from "./municipalities.json";
import { cityLngLatArr } from "./municipalitiesLatLng";

type Municipalities = {
  [prefecture: string]: string[];
};

const municipalities: Municipalities = municipalitiesData;

const AreaDropdownMenu = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>(""); // 選択された都道府県
  const [isSelectAreaOpen, setIsSelectAreaOpen] = useState<boolean>(false);
  const [selectedMunicipalities, setSelectedMunicipalities] =
    useState<string>("");
  const [displayPrefecture, setDisplayPrefecture] = useState<string>("");
  const [targetLngLat, setTargetLngLat] = useState<Array<number>>([]);

  // サブメニューを開く
  const handleSubMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    prefecture: string
  ) => {
    if (selectedPrefecture !== prefecture) {
      setSelectedPrefecture(prefecture);
    } else {
      setSelectedPrefecture(""); //サブメニューを閉じる
    }
  };

  const handleSelectMunicipalities = (city: string, prefecture: string) => {
    setSelectedMunicipalities(city);
    setIsSelectAreaOpen(false);
    setDisplayPrefecture(prefecture);
    setSelectedPrefecture("");
    // 役所の座標を取得
    const newTargetLngLat = cityLngLatArr.find((cityLngLat) => {
      // city.name.includes(displayPrefecture) &&
      return cityLngLat.name.includes(city);
    })?.lnglat;
    console.log(newTargetLngLat);
    setTargetLngLat(newTargetLngLat!);
  };

  return (
    <div>
      {selectedMunicipalities ? (
        <button
          onClick={() => setIsSelectAreaOpen(!isSelectAreaOpen)}
          className="border border-gray-400 border-r-0 border-l-0 w-[200px] h-[30px] mb-1 text-left pl-2"
        >
          {`${displayPrefecture} ${selectedMunicipalities}`}
        </button>
      ) : (
        <button
          onClick={() => setIsSelectAreaOpen(!isSelectAreaOpen)}
          className="border border-gray-400 border-r-0 border-l-0 w-[200px] h-[30px] mb-1 text-left text-gray-300 pl-2"
        >
          都道府県を選択
        </button>
      )}

      {isSelectAreaOpen && (
        <>
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
                    onClick={(event) => handleSubMenuOpen(event, prefecture)}
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
        </>
      )}
    </div>
  );
};

export default AreaDropdownMenu;
