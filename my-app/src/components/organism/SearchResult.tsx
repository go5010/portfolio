import { Rating } from "@mui/material";
import Image from "next/image";
import React, { Dispatch, FC, memo, SetStateAction, useContext } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import { saveSpot } from "@/app/_api/db";
import { usePathname } from "next/navigation";
import { UserContext } from "@/providers/UserProvider";
import { Map, useMap } from "@vis.gl/react-google-maps";

const SearchResult: FC<{
  searchResult: any;
  detailsResult: any;
  setIsChangedSpotList: Dispatch<SetStateAction<boolean>>;
}> = memo(({ searchResult, detailsResult, setIsChangedSpotList }) => {
  const map = useMap();
  const loginUser = useContext(UserContext).user;
  const pathname = usePathname();
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
  }
  let urlTripID: any = null;
  let urlTripDay: any = null;
  if (pathname !== "/schedule" && pathname !== "/schedule/" + loginUser?.uid) {
    const re = new RegExp(
      `${escapeRegExp(loginUser?.uid + "/")}(.*)${escapeRegExp("-Day")}`
    );
    const urlTripIDTemp = pathname.match(re);
    urlTripID = urlTripIDTemp![1];
    const urlTripDayTemp = pathname.match(/Day(.*)/);
    urlTripDay = Number(urlTripDayTemp![1]);
  }

  return (
    <div className="flex items-start border-t pt-4 mb-4">
      <div className="mt-3">
        <PrimaryButton
          onClickFunc={async () => {
            await saveSpot(
              loginUser?.uid!,
              urlTripID,
              urlTripDay,
              searchResult,
              detailsResult
            );
            setIsChangedSpotList(true);
            alert("候補に追加しました！");
          }}
        >
          候補に追加
        </PrimaryButton>
      </div>
      <div className="flex ml-8">
        {detailsResult.photos ? (
          <div className="mr-4">
            {detailsResult.photos[0] ? (
              <Image
                src={detailsResult.photos[0].getUrl()}
                alt=""
                width={220}
                height={220}
                className="object-cover w-[220px] h-[220px]"
              />
            ) : (
              <div className="w-[220px] h-[220px] flex items-center justify-center text-center leading-[1] border">
                No Image
              </div>
            )}
            <div className="mt-[5px] flex justify-between">
              {detailsResult.photos[1] ? (
                <Image
                  src={detailsResult.photos[1].getUrl()}
                  alt=""
                  width={70}
                  height={70}
                  className="object-cover w-[70px] h-[70px]"
                />
              ) : (
                <div className="w-[70px] h-[70px] flex items-center justify-center text-center leading-[1] border">
                  No Image
                </div>
              )}
              {detailsResult.photos[2] ? (
                <Image
                  src={detailsResult.photos[2].getUrl()}
                  alt=""
                  width={70}
                  height={70}
                  className="object-cover w-[70px] h-[70px]"
                />
              ) : (
                <div className="w-[70px] h-[70px] flex items-center justify-center text-center leading-[1] border">
                  No Image
                </div>
              )}
              {detailsResult.photos[3] ? (
                <Image
                  src={detailsResult.photos[3].getUrl()}
                  alt=""
                  width={70}
                  height={70}
                  className="object-cover w-[70px] h-[70px]"
                />
              ) : (
                <div className="w-[70px] h-[70px] flex items-center justify-center text-center leading-[1] border">
                  No Image
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mr-4">
            <div className="w-[220px] h-[220px] flex items-center justify-center text-center leading-[1] border">
              No Image
            </div>
            <div className="mt-[5px] flex justify-between">
              <div className="w-[70px] h-[70px] flex items-center justify-center text-center leading-[1] border">
                No Image
              </div>
              <div className="w-[70px] h-[70px] flex items-center justify-center text-center leading-[1] border">
                No Image
              </div>
              <div className="w-[70px] h-[70px] flex items-center justify-center text-center leading-[1] border">
                No Image
              </div>
            </div>
          </div>
        )}

        <div>
          <p className="font-semibold text-xl">{searchResult.name}</p>
          <p>{searchResult.vicinity}</p>
          <p>営業時間</p>
          {detailsResult.opening_hours && (
            <div className="ml-6">
              <p>{detailsResult.opening_hours.weekday_text[0]}</p>
              <p>{detailsResult.opening_hours.weekday_text[1]}</p>
              <p>{detailsResult.opening_hours.weekday_text[2]}</p>
              <p>{detailsResult.opening_hours.weekday_text[3]}</p>
              <p>{detailsResult.opening_hours.weekday_text[4]}</p>
              <p>{detailsResult.opening_hours.weekday_text[5]}</p>
              <p>{detailsResult.opening_hours.weekday_text[6]}</p>
            </div>
          )}
          <div className="flex items-center mt-4">
            <Rating
              defaultValue={searchResult.rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <span className="ml-2">{searchResult.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SearchResult;
