"use client";

import ScheduleSidebar from "@/components/organism/ScheduleSidebar";
import React, { useState } from "react";
import Candidates from "./Candidates";
import { SearchArea } from "./SearchArea";
import { usePathname } from "next/navigation";

const Schedule = () => {
  const [candiOrSearch, setCandiOrSeacrch] = useState("candidates");
  const pathname = usePathname();
  const users = { id: "userxxxxx", name: "Gota Arai", email: "xxx@gmail.com" };
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

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
  }
  const re = new RegExp(
    `${escapeRegExp(users.id + "/")}(.*)${escapeRegExp("-Day")}`
  );
  const userTripIDTemp = pathname.match(re);
  const userTripID = userTripIDTemp![1];
  const tripDayTemp = pathname.match(/Day(.*)/);
  const tripDay = tripDayTemp![1];
  const userTripTitle = userTrip.find((trip) => {
    return trip.id === userTripID;
  })!.title;

  return (
    <div className="flex">
      <ScheduleSidebar />
      <div className="grow px-7 pt-5">
        <div className="pb-5 ml-2">
          {userTripTitle}　{`>`}　{tripDay}日目
        </div>
        <div className="flex border-b-2 pb-2">
          <div
            onClick={() => setCandiOrSeacrch("candidates")}
            className={
              candiOrSearch === "candidates"
                ? "ml-8 pb-1 px-1 border-b-4 border-gray-600"
                : "ml-8 pb-1 px-1 cursor-pointer hover:opacity-70"
            }
          >
            候補
          </div>
          <div
            onClick={() => setCandiOrSeacrch("search")}
            className={
              candiOrSearch === "search"
                ? "ml-8 pb-1 px-1 border-b-4 border-gray-600"
                : "ml-8 pb-1 px-1 cursor-pointer hover:opacity-70"
            }
          >
            検索
          </div>
        </div>
        {candiOrSearch === "candidates" ? <Candidates /> : <SearchArea />}
      </div>
    </div>
  );
};

export default Schedule;
