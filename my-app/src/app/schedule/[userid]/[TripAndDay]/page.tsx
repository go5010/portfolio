"use client";

import ScheduleSidebar from "@/components/organism/ScheduleSidebar";
import React, { memo, useContext, useEffect, useState } from "react";
import Candidates from "./Candidates";
import { SearchArea } from "./SearchArea";
import { usePathname } from "next/navigation";
import { createTripListArr } from "@/app/_api/db";
import { APIProvider } from "@vis.gl/react-google-maps";
import { UserContext } from "@/providers/UserProvider";

type schedulesType = {
  title: string;
  address: string;
  memo: string;
  rating: number;
  location: { lat: number; lng: number };
  open_hours_mon: string;
  open_hours_tue: string;
  open_hours_wed: string;
  open_hours_thu: string;
  open_hours_fri: string;
  open_hours_sat: string;
  open_hours_sun: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
}[][];
type userTripType = { id: string; title: string; schedules: schedulesType };
type CardOpenType = { spotNo: number; open: boolean }[] | undefined;

const Schedule = memo(() => {
  const loginLoading = useContext(UserContext).loginLoading;
  const loginUser = useContext(UserContext).user;
  const [candiOrSearch, setCandiOrSeacrch] = useState("candidates");
  const pathname = usePathname();
  const [userTrip, setUserTrip] = useState<userTripType[]>([]);
  const [urlTripID, setUrlTripID] = useState<string | null>(null);
  const [urlTripDay, setUrlTripDay] = useState<number | null>(null);
  const [userTripTitle, setUserTripTitle] = useState<string | null>(null);
  const [cardOpen, setCardOpen] = useState<CardOpenType>([]);
  const [tripListLoading, setTripListLoading] = useState<boolean>(true); //マウント時のfetchTrip完了の判定
  const [isChangedSpotList, setIsChangedSpotList] = useState<boolean>(false); //spot追加・削除でビューポートを再設定させる．

  useEffect(() => {
    if (!loginLoading) {
      if (candiOrSearch == "candidates") {
        const fetchTrips = async () => {
          const trips: userTripType[] = await createTripListArr(loginUser!.uid);

          function escapeRegExp(string: string) {
            return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&");
          }
          const re = new RegExp(
            `${escapeRegExp(loginUser?.uid + "/")}(.*)${escapeRegExp("-Day")}`
          );
          const urlTripIDTemp = pathname.match(re);
          setUrlTripID(urlTripIDTemp![1]);
          const urlTripDayTemp = pathname.match(/Day(.*)/);
          setUrlTripDay(Number(urlTripDayTemp![1]));
          setUserTripTitle(
            trips.find((trip) => {
              return trip.id === urlTripIDTemp![1];
            })!.title
          );
          setCardOpen(
            trips
              .find((trip) => {
                return trip.id === urlTripIDTemp![1];
              })!
              .schedules[Number(urlTripDayTemp![1]) - 1].map((_, index) => {
                return { spotNo: index + 1, open: false };
              })
          );

          setUserTrip(trips);
          setTripListLoading(false);
        };
        fetchTrips();
      }
    }
  }, [loginLoading, candiOrSearch]); // 追加した候補スポットを反映させるために，candiOrSearchを依存配列に指定．

  const fetchTrips = async () => {
    if (!loginLoading) {
      const trips: userTripType[] = await createTripListArr(loginUser!.uid);
      setUserTrip(trips);
    }
  };

  if (
    tripListLoading ||
    userTripTitle === null ||
    urlTripDay === null ||
    urlTripID === null
  ) {
    return <div>Loading...</div>; //ローディング表示
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
      <div className="flex">
        <ScheduleSidebar />
        <div className="grow px-7 pt-6">
          <div className="mb-6 ml-2 font-extrabold xs:text-lg md:text-xl">
            {userTripTitle!}　{`>`}　{urlTripDay!}日目
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
            <Candidates
              cardOpen={cardOpen}
              setCardOpen={setCardOpen}
              userTrip={userTrip}
              setUserTrip={setUserTrip}
              urlTripDay={urlTripDay}
              urlTripID={urlTripID}
              userTripTitle={userTripTitle}
              fetchTrips={fetchTrips}
              isChangedSpotList={isChangedSpotList}
              setIsChangedSpotList={setIsChangedSpotList}
            />
          ) : (
            <SearchArea setIsChangedSpotList={setIsChangedSpotList} />
          )}
        </div>
      </div>
    </APIProvider>
  );
});

export default Schedule;
