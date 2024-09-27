import React, { Dispatch, FC, memo, SetStateAction, useState } from "react";
import { placeTypesJPN, placeTypes } from "./placeType";

const PlaceTypeDropdown: FC<{
  setQueryPlaceType: Dispatch<SetStateAction<string>>;
}> = memo(({ setQueryPlaceType }) => {
  const [isSelectPlaceTypeOpen, setIsSelectPlaceTypeOpen] =
    useState<boolean>(false);
  const [displayPlaceType, setDisplayPlaceType] = useState<string>("");

  const selectPlaceType = (placeTypeJPN: string, index: number) => {
    setQueryPlaceType(placeTypes[index]);
    setDisplayPlaceType(placeTypeJPN);
    setIsSelectPlaceTypeOpen(false);
  };

  return (
    <div>
      {displayPlaceType ? (
        <button
          onClick={() => setIsSelectPlaceTypeOpen(!isSelectPlaceTypeOpen)}
          className="border border-gray-400 rounded-tr-md rounded-br-md border-l-gray-200 w-[200px] h-[30px] mb-1 text-left  pl-2"
        >
          {displayPlaceType}
        </button>
      ) : (
        <button
          onClick={() => setIsSelectPlaceTypeOpen(!isSelectPlaceTypeOpen)}
          className="border border-gray-400 rounded-tr-md rounded-br-md border-l-gray-200 w-[200px] h-[30px] mb-1 text-left text-gray-300 pl-2"
        >
          カテゴリを選択
        </button>
      )}

      {isSelectPlaceTypeOpen && (
        <>
          {/* プルダウンメニュー外クリックでメニューを閉じる */}
          <div
            onClick={() => {
              setIsSelectPlaceTypeOpen(false);
            }}
            className="w-screen h-screen fixed top-0 left-0 z-10"
          ></div>

          <div className="w-[200px] h-[300px] rounded border border-gray-400 pl-2 py-2 z-20 relative overflow-auto">
            {placeTypesJPN.map((placeTypeJPN, index) => (
              <div
                className="flex items-center hover:bg-slate-200"
                key={placeTypeJPN}
              >
                <button
                  onClick={() => selectPlaceType(placeTypeJPN, index)}
                  className="items-center flex-grow  text-left pl-2"
                >
                  {placeTypeJPN}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default PlaceTypeDropdown;
