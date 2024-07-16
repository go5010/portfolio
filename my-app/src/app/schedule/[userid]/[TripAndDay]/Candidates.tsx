import Link from "next/link";
import React from "react";

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
          首里城
        </button>
        <button className="border border-gray-300 shadow-md rounded-lg w-1/3 text-left px-3 py-2 mb-3">
          首里城
        </button>
        <button className="border border-gray-300 shadow-md rounded-lg w-4/5 text-left px-3 py-2 mb-3">
          首里城a
        </button>
      </div>
      <div>google map, 移動時間検索</div>
    </div>
  );
};

export default Candidates;
