import { Rating } from "@mui/material";
import Image from "next/image";
import React, { FC, memo } from "react";
import PrimaryButton from "../atoms/PrimaryButton";

const SearchResult: FC<{ searchResult: any; detailsResult: any }> = memo(
  ({ searchResult, detailsResult }) => {
    const photoUrl =
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAXCi2Q5lVS0XI2mLk8yENQuy6SSd8CsC9XdjzcAw6eaezE4ASmypBwLBpxdy3Zs6Q05sbKdbnQkH7pOGMK86YvJ1K3fyb7HoAaOhlE8uGzk8x45nldsmRlOL_keVawjv9qVNBEuQuXPN-KOKW3gs_IRMSLNs4HaogGdWL6xVa73kUdXiqSHW&3u12240&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A3000%2Fschedule%2Fuserxxxxx%2FP53X7aJixP4CVS7Wm9f8-Day2&key=AIzaSyCFLROKHnK53S9QzgvdCh_mmrydLE5fx2U&token=15171";
    return (
      <div className="flex items-start border-t pt-4 mb-4">
        <div className="mt-3">
          <PrimaryButton>候補に追加</PrimaryButton>
        </div>
        <div className="flex ml-8">
          <div className="mr-4">
            <Image
              src={photoUrl}
              alt=""
              width={220}
              height={220}
              className="object-cover w-[220px] h-[220px]"
            />
            <div className="mt-[5px] flex justify-between">
              <Image
                src={photoUrl}
                alt=""
                width={70}
                height={70}
                className="object-cover w-[70px] h-[70px]"
              />
              <Image
                src={photoUrl}
                alt=""
                width={70}
                height={70}
                className="object-cover w-[70px] h-[70px]"
              />
              <Image
                src={photoUrl}
                alt=""
                width={70}
                height={70}
                className="object-cover w-[70px] h-[70px]"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-xl">name</p>
            <p>type</p>
            <p>address</p>
            <p>営業時間</p>
            <div className="flex ml-6">
              <div>
                <p>月曜日</p>
                <p>火曜日</p>
                <p>水曜日</p>
                <p>木曜日</p>
              </div>
              <div className="ml-8">
                <p>金曜日</p>
                <p>土曜日</p>
                <p>日曜日</p>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Rating
                defaultValue={4.5}
                precision={0.1}
                readOnly
                size="small"
              />
              <span className="ml-2">rating</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SearchResult;
