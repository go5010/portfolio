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
          { title: "spot2", memo: "~~食べる", location: { lat: 136, lng: 41 } },
        ],
        [
          {
            title: "spot3",
            memo: "写真を撮る",
            location: { lat: 135, lng: 40 },
          },
          { title: "spot4", memo: "~~食べる", location: { lat: 136, lng: 41 } },
        ],
      ],
    },
    {
      id: "trip22222",
      title: "旅行2",
      schedules: [
        [
          {
            title: "spot5",
            memo: "写真を撮る",
            location: { lat: 137, lng: 40 },
          },
          { title: "spot6", memo: "~~食べる", location: { lat: 134, lng: 41 } },
        ],
        [
          {
            title: "spot5",
            memo: "写真を撮る",
            location: { lat: 137, lng: 40 },
          },
          { title: "spot8", memo: "~~食べる", location: { lat: 134, lng: 41 } },
        ],
      ],
    },
  ];

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
  }
  const re = new RegExp(
    `${escapeRegExp(users.id + "/")}(.*)${escapeRegExp("-Day")}`
  );
  const urlTripIDTemp = pathname.match(re);
  const urlTripID = urlTripIDTemp![1];
  const urlTripDayTemp = pathname.match(/Day(.*)/);
  const urlTripDay = Number(urlTripDayTemp![1]);
  const userTripTitle = userTrip.find((trip) => {
    return trip.id === urlTripID;
  })!.title;

  const [cardOpen, setCardOpen] = useState(
    userTrip
      .find((trip) => {
        return trip.id === urlTripID;
      })!
      .schedules[urlTripDay - 1].map((spot, index) => {
        return { spotNo: index + 1, open: false };
      })
  );

  return (
    <div className="flex">
      <ScheduleSidebar />
      <div className="grow px-7 pt-6">
        <div className="mb-6 ml-2 font-extrabold xs:text-lg md:text-xl">
          {userTripTitle}　{`>`}　{urlTripDay}日目
        </div>
        <div className="flex border-b-2 pb-1">
          <div
            onClick={() => setCandiOrSeacrch("candidates")}
            className={
              candiOrSearch === "candidates"
                ? "ml-8 pb-1 px-1 border-b-[6px] border-gray-600"
                : "ml-8 pb-1 px-1 cursor-pointer hover:opacity-70"
            }
          >
            候補
          </div>
          <div
            onClick={() => setCandiOrSeacrch("search")}
            className={
              candiOrSearch === "search"
                ? "ml-8 pb-1 px-1 border-b-[6px] border-gray-600"
                : "ml-8 pb-1 px-1 cursor-pointer hover:opacity-70"
            }
          >
            検索
          </div>
        </div>
        {candiOrSearch === "candidates" ? (
          <Candidates cardOpen={cardOpen} setCardOpen={setCardOpen} />
        ) : (
          <SearchArea />
        )}
      </div>
    </div>
  );
};

export default Schedule;
