"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Menu, MenuItem } from "@mui/material";
import { createTripListArr } from "@/app/_api/db";

type schedulesType = {
  title: string;
  memo: string;
  location: { lat: number; lng: number };
}[][];
type userTripType = { id: string; title: string; schedules: schedulesType };

const ScheduleSidebar = () => {
  const users = { id: "userxxxxx", name: "Gota Arai", email: "xxx@gmail.com" };
  let userTrip!: userTripType[];
  let [tripOpen, setTripOpen] = useState<
    { tripNo: number; open: boolean }[] | undefined
  >();
  async () => {
    userTrip = await createTripListArr();
    setTripOpen(
      userTrip.map((trip, index) => {
        return { tripNo: index + 1, open: false };
      })
    );
  };
  // const userTrip = [
  //   {
  //     id: "trip11111",
  //     title: "旅行1",
  //     schedules: [
  //       [
  //         {
  //           title: "spot1",
  //           memo: "写真を撮る",
  //           location: { lat: 135, lng: 40 },
  //         },
  //       ],
  //       [{ title: "spot2", memo: "~~食べる", location: { lat: 136, lng: 41 } }],
  //     ],
  //   },
  //   {
  //     id: "trip22222",
  //     title: "旅行2",
  //     schedules: [
  //       [
  //         {
  //           title: "spot3",
  //           memo: "写真を撮る",
  //           location: { lat: 137, lng: 40 },
  //         },
  //       ],
  //       [{ title: "spot4", memo: "~~食べる", location: { lat: 134, lng: 41 } }],
  //     ],
  //   },
  // ];

  // const [tripOpen, setTripOpen] = useState(
  //   userTrip.map((trip, index) => {
  //     return { tripNo: index + 1, open: false };
  //   })
  // );

  const handleTripClick = (clickedIndex: number) => {
    setTripOpen(
      tripOpen!.map((trip, index) => {
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
  let urlTripID: any = null;
  let urlTripDay: any = null;
  if (pathname !== "/schedule" && pathname !== "/schedule/" + users.id) {
    const re = new RegExp(
      `${escapeRegExp(users.id + "/")}(.*)${escapeRegExp("-Day")}`
    );
    const urlTripIDTemp = pathname.match(re);
    urlTripID = urlTripIDTemp![1];
    const urlTripDayTemp = pathname.match(/Day(.*)/);
    urlTripDay = Number(urlTripDayTemp![1]);
  }

  const [tripAnchorEl, setTripAnchorEl] = useState<null | HTMLElement>(null);
  const tripEditOpen = Boolean(tripAnchorEl);
  const handleTripEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTripAnchorEl(event.currentTarget);
  };
  const handleTripEditClose = () => {
    setTripAnchorEl(null);
  };

  const [dayAnchorEl, setDayAnchorEl] = useState<null | HTMLElement>(null);
  const dayEditOpen = Boolean(dayAnchorEl);
  const handleDayEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDayAnchorEl(event.currentTarget);
  };
  const handleDayEditClose = () => {
    setDayAnchorEl(null);
  };

  return (
    <div className="h-[1000px] w-[250px] bg-slate-100 border-r-2">
      <ul className="pt-4 pl-6 mb-2 font-semibold">スケジュール一覧</ul>
      {userTrip.map((trip, index) => {
        return (
          <div className="pl-6" key={trip.id}>
            <div className="flex hover:bg-gray-200 group">
              <button
                onClick={() => handleTripClick(index)}
                className="flex w-full "
              >
                <div className="h-[24px] flex items-center mr-1.5">
                  {tripOpen![index].open ? <SlArrowDown /> : <SlArrowRight />}
                </div>
                {trip.title}
              </button>
              <button
                className="mr-2 px-1 rounded-md font-semibold hover:bg-gray-300 hidden group-hover:block"
                onClick={handleTripEditClick}
              >
                …
              </button>
              <Menu
                anchorEl={tripAnchorEl}
                open={tripEditOpen}
                onClose={handleTripEditClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      left: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem onClick={handleTripEditClose}>
                  <MdEdit size={18} />
                  &nbsp;名前を変更
                </MenuItem>
                <MenuItem onClick={handleTripEditClose}>
                  <MdDeleteForever size={18} />
                  &nbsp;旅行を削除
                </MenuItem>
              </Menu>
            </div>
            {tripOpen![index].open === true &&
              trip.schedules.map((array, scheduleIndex) => {
                return (
                  <div className="pl-4">
                    <div
                      className={
                        trip.id === urlTripID &&
                        scheduleIndex + 1 === urlTripDay
                          ? " flex group bg-gray-300"
                          : "flex group hover:bg-gray-200"
                      }
                    >
                      <Link
                        href={
                          "/schedule/" +
                          users.id +
                          "/" +
                          userTrip[index].id +
                          "-Day" +
                          (scheduleIndex + 1)
                        }
                        className="inline-block w-full"
                      >{`・${scheduleIndex + 1}日目`}</Link>
                      <button
                        className="mr-2 px-1 rounded-md font-semibold hover:bg-gray-300 hidden group-hover:block"
                        onClick={handleDayEditClick}
                      >
                        …
                      </button>
                      <Menu
                        anchorEl={dayAnchorEl}
                        open={dayEditOpen}
                        onClose={handleDayEditClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              left: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                      >
                        <MenuItem onClick={handleDayEditClose}>
                          <MdDeleteForever size={18} />
                          &nbsp;日程を削除
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                );
              })}
            {tripOpen![index].open === true && (
              <div className="pl-4">
                <button className="my-1 hover:bg-gray-200 w-full text-left">
                  ＋ 日程を追加
                </button>
              </div>
            )}
          </div>
        );
      })}
      <div className="pl-6">
        <button className="mt-6 hover:bg-gray-200 w-full text-left">
          ＋ 新規作成
        </button>
      </div>
    </div>
  );
};

export default ScheduleSidebar;
