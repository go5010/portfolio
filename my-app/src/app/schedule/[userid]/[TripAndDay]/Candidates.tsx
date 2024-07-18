import Link from "next/link";
import React from "react";
import Rating from "@mui/material/Rating";
import { ImShrink2 } from "react-icons/im";

const Candidates = () => {
  const userTrip = [
    {
      id: "trip11111",
      title: "旅行1",
      schedules: [
        [
          {
            title: "spot1",
            memo: "写真を撮る",
            location: { lat: 135, lng: 40 },
          },
        ],
        [{ title: "spot2", memo: "~~食べる", location: { lat: 136, lng: 41 } }],
      ],
    },
    {
      id: "trip22222",
      title: "旅行2",
      schedules: [
        [
          {
            title: "spot3",
            memo: "写真を撮る",
            location: { lat: 137, lng: 40 },
          },
        ],
        [{ title: "spot4", memo: "~~食べる", location: { lat: 134, lng: 41 } }],
      ],
    },
  ];

  return (
    <div className="flex mt-5 px-3">
      <div className="w-2/3 flex flex-col">
        <button className="border border-gray-300 shadow-md rounded-lg w-1/3 text-left px-3 py-2 mb-3">
          <div className="font-semibold">首里城</div>
        </button>
        <button className="border border-gray-300 shadow-md rounded-lg w-1/3 text-left px-3 py-2 mb-3">
          <div className="font-semibold">国際通り</div>
        </button>
        <button className="border border-gray-300 shadow-md rounded-lg w-4/5 text-left px-3 py-2 mb-3 relative">
          <div className="font-semibold">瀬長島ウミカジテラス</div>
          <button className="absolute top-1 right-1 p-1 rounded-md hover:bg-slate-200">
            <ImShrink2 />
          </button>
          <div className="mt-2">
            <div className="flex items-center mb-1">
              <span className="text-sm mx-1">4.4</span>
              <Rating
                name="half-rating-read"
                defaultValue={4.4}
                precision={0.1}
                readOnly
                size="small"
              />
            </div>
            <div>・営業日/時間</div>
            <br />
            <div className="mb-1">・メモ</div>
            <textarea className="w-full border rounded-md py-1 px-2 outline-none"></textarea>
          </div>
        </button>
      </div>
      <div>google map, 移動時間検索</div>
    </div>
  );
};

export default Candidates;
