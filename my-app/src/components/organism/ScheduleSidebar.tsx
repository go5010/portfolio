"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Menu, MenuItem } from "@mui/material";
import {
  addDay,
  createTrip,
  createTripListArr,
  deleteDay,
  deleteTrip,
  renameTrip,
} from "@/app/_api/db";
import { UserContext } from "@/providers/UserProvider";

type schedulesType = {
  title: string;
  memo: string;
  location: { lat: number; lng: number };
}[][];
type userTripType = { id: string; title: string; schedules: schedulesType };

const ScheduleSidebar = memo(() => {
  const loginLoading = useContext(UserContext).loginLoading;
  const loginUser = useContext(UserContext).user;
  const router = useRouter();
  const [userTrip, setUserTrip] = useState<userTripType[]>([]);
  const [tripOpen, setTripOpen] = useState<
    { tripNo: number; open: boolean }[] | undefined
  >();
  const [inputmode, setInputmode] = useState<
    { tripNo: number; input: boolean }[] | undefined
  >(); //名前の変更input
  const [tripListLoading, setTripListLoading] = useState<boolean>(true); //マウント時，旅行削除時のfetchTrip完了の判定

  // 名前の変更input
  const renameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loginLoading) {
      const fetchTrips = async () => {
        const trips: userTripType[] = await createTripListArr(loginUser!.uid);
        setUserTrip(trips);
        setTripOpen(
          trips.map((_, index) => {
            return { tripNo: index + 1, open: false };
          })
        );
        setInputmode(
          trips.map((_, index) => {
            return { tripNo: index + 1, input: false };
          })
        );
        setTripListLoading(false);
      };
      fetchTrips();
    }
  }, [loginLoading]);

  const fetchTrips = async () => {
    if (!loginLoading) {
      const trips: userTripType[] = await createTripListArr(loginUser!.uid);
      setUserTrip(trips);
      // setTripOpen(
      //   trips.map((_, index) => {
      //     return { tripNo: index + 1, open: false };
      //   })
      // );
      setInputmode(
        trips.map((_, index) => {
          return { tripNo: index + 1, input: false };
        })
      );
      console.log("!!!!!!!!!!!!!!!!!");
    }
  };

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

  // 選択されている旅行のbg colorを濃くするための旅行ID・日程の取得
  const pathname = usePathname();
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
  }
  const [urlTripID, setUrlTripID] = useState<string>("");
  const [urlTripDay, setUrlTripDay] = useState<number | null>(null);
  useEffect(() => {
    if (
      !loginLoading &&
      pathname !== "/schedule" &&
      pathname !== "/schedule/" + loginUser?.uid
    ) {
      const re = new RegExp(
        `${escapeRegExp(loginUser?.uid + "/")}(.*)${escapeRegExp("-Day")}`
      );
      const urlTripIDTemp = pathname.match(re);
      setUrlTripID(urlTripIDTemp![1]);
      const urlTripDayTemp = pathname.match(/Day(.*)/);
      setUrlTripDay(Number(urlTripDayTemp![1]));
    }
  }, [loginLoading]);

  //名前の変更・旅行の削除MENU
  const [tripAnchorEls, setTripAnchorEls] = useState<(null | HTMLElement)[]>(
    []
  );
  const handleTripEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const newAnchorEls = [...tripAnchorEls];
    newAnchorEls[index] = event.currentTarget;
    setTripAnchorEls(newAnchorEls);
  };
  const handleTripEditClose = (index: number) => {
    const newAnchorEls = [...tripAnchorEls];
    newAnchorEls[index] = null;
    setTripAnchorEls(newAnchorEls);
  };
  // 名前の変更input
  const [TitleOfActiveInput, setTitleOfActiveInput] = useState("");
  const handleRenameTrip = (clickedIndex: number, targetTripTitle: string) => {
    setInputmode(
      inputmode!.map((trip, index) => {
        if (index === clickedIndex) {
          trip.input = !trip.input;
        }
        return trip;
      })
    );
    setTitleOfActiveInput(targetTripTitle);
    handleTripEditClose(clickedIndex);
  };
  const [renamedTripName, setRenamedTripName] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRenamedTripName(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Tab") {
      setInputmode(
        userTrip!.map((_, index) => {
          return { tripNo: index + 1, input: false };
        })
      );
      renamedTripName !== "" &&
        renameTrip(loginUser!.uid, TitleOfActiveInput, renamedTripName);
      renamedTripName !== "" && fetchTrips();
      setTitleOfActiveInput("");
      setRenamedTripName("");
    } else if (event.key === "Escape") {
      setInputmode(
        userTrip!.map((_, index) => {
          return { tripNo: index + 1, input: false };
        })
      );
      setTitleOfActiveInput("");
      setRenamedTripName("");
    }
  };

  // renameInputをクリックで閉じる
  const handleClickOutOfReInput = (userTrip: userTripType[]) => {
    setInputmode(
      userTrip!.map((_, index) => {
        return { tripNo: index + 1, input: false };
      })
    );
  };
  // クリックでinput閉じた際の旅行名変更
  useEffect(() => {
    const renameTripByCloseInput = async () => {
      if (
        inputmode !== undefined &&
        inputmode!.every((trip) => trip.input === false)
      ) {
        if (renamedTripName !== "") {
          await renameTrip(loginUser!.uid, TitleOfActiveInput, renamedTripName);
          await fetchTrips();
          setTitleOfActiveInput("");
          setRenamedTripName("");
        }
      }
    };
    renameTripByCloseInput();
  }, [inputmode]);

  // 旅行の削除
  const handleDeleteTrip = async (
    clickedIndex: number,
    targetTripTitle: string
  ) => {
    await deleteTrip(loginUser!.uid, targetTripTitle);
    handleTripEditClose(clickedIndex);
    const newTripOpen = tripOpen
      ?.map((trip, index) => {
        if (index < clickedIndex) return trip;
        if (index === clickedIndex) return;
        if (index > clickedIndex)
          return {
            tripNo: trip.tripNo - 1,
            open: trip.open,
          };
      })
      .filter((trip) => trip !== undefined);
    // console.log(clickedIndex, newTripOpen);
    setTripOpen(newTripOpen);
    setTripListLoading(true);
    await fetchTrips();
    setTripListLoading(false);
  };

  // 日程の削除
  const [dayAnchorEls, setDayAnchorEls] = useState<(null | HTMLElement)[]>([]);
  const handleDayEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    scheduleIndex: number
  ) => {
    const newDayAnchorEls = [...dayAnchorEls];
    newDayAnchorEls[scheduleIndex] = event.currentTarget;
    setDayAnchorEls(newDayAnchorEls);
  };
  const handleDayEditClose = (scheduleIndex: number) => {
    const newDayAnchorEls = [...dayAnchorEls];
    newDayAnchorEls[scheduleIndex] = null;
    setDayAnchorEls(newDayAnchorEls);
  };
  const handleDeleteDay = async (
    targetTripTitle: string,
    targetDay: number
  ) => {
    await deleteDay(loginUser!.uid, targetTripTitle, targetDay + 1);
    // 選択されている日程が削除されたら，１日目に遷移する
    if (targetDay + 1 == urlTripDay) {
      router.push(`/schedule/${loginUser?.uid}/${urlTripID}-Day1`);
    } else {
      await fetchTrips();
      handleDayEditClose(targetDay);
    }
  };

  // 旅行の新規作成input
  const [newTripInput, setNewTripInput] = useState<boolean>(false);
  const [newTripName, setNewTripName] = useState("");
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTripName(event.target.value);
  };
  const handleKeyDown2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Tab") {
      setNewTripInput(false);
      newTripName !== "" && createTrip(loginUser!.uid, newTripName);
      if (newTripName !== "") {
        const newTripOpen = [...tripOpen!];
        newTripOpen?.push({
          tripNo: tripOpen!.length + 1,
          open: false,
        });
        setTripOpen(newTripOpen);
      }
      newTripName !== "" && fetchTrips();
      setNewTripName("");
    } else if (event.key === "Escape") {
      setNewTripInput(false);
      setNewTripName("");
    }
  };
  // クリックでinput閉じた際の新規旅行データ作成
  useEffect(() => {
    const createTripByClick = async () => {
      if (!newTripInput) {
        if (newTripName !== "") {
          createTrip(loginUser!.uid, newTripName);
          const newTripOpen = [...tripOpen!];
          newTripOpen?.push({
            tripNo: tripOpen!.length + 1,
            open: false,
          });
          setTripOpen(newTripOpen);
          fetchTrips();
          setNewTripName("");
        }
      }
    };
    createTripByClick();
  }, [newTripInput]);

  if (tripListLoading) {
    return <div>Loading...</div>; //ローディング表示
  }

  return (
    <div className="min-h-[1000px] w-[20%] max-w-[200px] min-w-[170px] bg-slate-100 border-r-2">
      <ul className="pt-4 pl-6 mb-2 font-semibold">スケジュール一覧</ul>
      {userTrip.map((trip, index) => {
        return (
          <div className="pl-6" key={trip.id}>
            <div className="flex hover:bg-gray-200 group">
              {/* rename input外div */}
              {inputmode![index].input && (
                <div
                  className="w-screen h-screen fixed top-0 left-0 z-10 cursor-default"
                  onClick={() => handleClickOutOfReInput(userTrip)}
                ></div>
              )}

              <button
                onClick={() => handleTripClick(index)}
                className="flex w-full "
              >
                <div className="h-[24px] flex items-center mr-1.5">
                  {tripOpen![index].open ? <SlArrowDown /> : <SlArrowRight />}
                </div>
                {inputmode![index].input ? (
                  <input
                    className="px-2 border focus:outline-none z-20 max-w-full box-border"
                    style={{ width: "100%" }}
                    autoFocus={true}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={handleChange}
                    ref={renameInput}
                  />
                ) : (
                  <div>{trip.title}</div>
                )}
              </button>
              {inputmode![index].input || (
                <button
                  className="mr-2 px-1 rounded-md font-semibold hover:bg-gray-300 hidden group-hover:block"
                  onClick={(e) => handleTripEditClick(e, index)}
                >
                  …
                </button>
              )}
              <Menu
                anchorEl={tripAnchorEls[index]}
                open={Boolean(tripAnchorEls[index])}
                onClose={() => handleTripEditClose(index)}
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
                <MenuItem
                  onClick={() => handleRenameTrip(index, userTrip[index].title)}
                >
                  <MdEdit size={18} />
                  &nbsp;名前を変更
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeleteTrip(index, userTrip[index].title)}
                >
                  <MdDeleteForever size={18} />
                  &nbsp;旅行を削除
                </MenuItem>
              </Menu>
            </div>
            {tripOpen![index].open === true &&
              trip.schedules.map((_, scheduleIndex) => {
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
                          loginUser?.uid +
                          "/" +
                          userTrip[index].id +
                          "-Day" +
                          (scheduleIndex + 1)
                        }
                        className="inline-block w-full"
                      >{`・${scheduleIndex + 1}日目`}</Link>
                      <button
                        className="mr-2 px-1 rounded-md font-semibold hover:bg-gray-300 hidden group-hover:block"
                        onClick={(e) => {
                          handleDayEditClick(e, scheduleIndex);
                        }}
                      >
                        …
                      </button>
                      <Menu
                        anchorEl={dayAnchorEls[scheduleIndex]}
                        open={Boolean(dayAnchorEls[scheduleIndex])}
                        onClose={() => handleDayEditClose(scheduleIndex)}
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
                        <MenuItem
                          onClick={() => {
                            if (trip.schedules.length == 1) {
                              alert("日程が１日しかありません．");
                            } else {
                              handleDeleteDay(
                                userTrip[index].title,
                                scheduleIndex
                              );
                            }
                          }}
                        >
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
                <button
                  className="my-1 hover:bg-gray-200 w-full text-left"
                  onClick={async () => {
                    await addDay(loginUser!.uid, userTrip[index].title);
                    await fetchTrips();
                  }}
                >
                  ＋ 日程を追加
                </button>
              </div>
            )}
          </div>
        );
      })}
      {newTripInput && (
        <div className="w-full pl-6">
          <input
            className="px-2 border focus:outline-none max-w-full box-border"
            style={{ width: "100%" }}
            autoFocus={true}
            onKeyDown={handleKeyDown2}
            onChange={handleChange2}
          />
          <div
            className="w-screen h-screen fixed top-0 left-0 cursor-default z-10"
            onClick={() => setNewTripInput(false)}
          ></div>
        </div>
      )}
      <div className="pl-6">
        <button
          className="mt-6 hover:bg-gray-200 w-full text-left"
          onClick={() => setNewTripInput(true)}
        >
          ＋ 新規作成
        </button>
      </div>
    </div>
  );
});

export default ScheduleSidebar;
