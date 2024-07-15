"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

const ScheduleSidebar = () => {
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

  const [tripOpen, setTripOpen] = useState(
    userTrip.map((trip, index) => {
      return { tripNo: index + 1, open: false };
    })
  );

  const handleTripClick = (clickedIndex: number) => {
    setTripOpen(
      tripOpen.map((trip, index) => {
        if (index === clickedIndex) {
          trip.open = !trip.open;
        }
        return trip;
      })
    );
  };

  const pathname = usePathname();
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

  return (
    <div className="h-[1000px] w-[250px] bg-slate-100 border-r-2">
      <ul className="pt-4 pl-6 mb-2 font-semibold">スケジュール一覧</ul>
      {userTrip.map((trip, index) => {
        return (
          <div className="pl-6 w-full">
            <button onClick={() => handleTripClick(index)} className="flex">
              <div className="h-[24px] flex items-center mr-1.5">
                {tripOpen[index].open ? <SlArrowDown /> : <SlArrowRight />}
              </div>
              {trip.title}
            </button>
            {tripOpen[index].open === true &&
              trip.schedules.map((array, scheduleIndex) => {
                return (
                  <div>
                    <Link
                      href={
                        "/schedule/" +
                        users.id +
                        "/" +
                        userTrip[index].id +
                        "-Day" +
                        (scheduleIndex + 1)
                      }
                      className={
                        trip.id === urlTripID &&
                        scheduleIndex + 1 === urlTripDay
                          ? "pl-4 bg-gray-300 inline-block w-full"
                          : "pl-4 hover:bg-gray-200 inline-block w-full"
                      }
                    >{`・${scheduleIndex + 1}日目`}</Link>
                  </div>
                );
              })}
            {tripOpen[index].open === true && (
              <button className="pl-4 my-1 hover:bg-gray-200 w-full text-left">
                ＋ 日程を追加
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleSidebar;
