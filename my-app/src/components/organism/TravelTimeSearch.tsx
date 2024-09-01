import React, { FC, useState } from "react";
import { PiArrowFatLinesDownFill } from "react-icons/pi";
import {
  MdDirectionsSubway,
  MdDirectionsCar,
  MdDirectionsWalk,
} from "react-icons/md";

type schedulesType = {
  title: string;
  memo: string;
  location: { lat: number; lng: number };
}[][];
type userTripType = { id: string; title: string; schedules: schedulesType };

const TravelTimeSearch: FC<{
  userTrip: userTripType[];
  urlTripDay: number;
  urlTripID: string;
}> = ({ userTrip, urlTripDay, urlTripID }) => {
  // 出発地
  const [startSpot, setStartSpot] = useState<{
    title: string;
    memo: string;
    location: { lat: number; lng: number };
  }>();
  const handleStartSpotSelect = (selectedSpotTitle: string) => {
    const newStartSpot = userTrip
      .find((trip) => {
        return trip.id === urlTripID;
      })
      ?.schedules[urlTripDay - 1].find((spot) => {
        return spot.title === selectedSpotTitle;
      });
    setStartSpot(newStartSpot);
  };

  // 目的地
  const [endSpot, setEndSpot] = useState<{
    title: string;
    memo: string;
    location: { lat: number; lng: number };
  }>();
  const handleEndSpotSelect = (selectedSpotTitle: string) => {
    const newEndSpot = userTrip
      .find((trip) => {
        return trip.id === urlTripID;
      })
      ?.schedules[urlTripDay - 1].find((spot) => {
        return spot.title === selectedSpotTitle;
      });
    setEndSpot(newEndSpot);
  };

  // 移動手段
  const [travelMode, setTravelMode] = useState("TRANSIT");

  return (
    <div className="mt-6 px-6 pt-7 pb-2 border-2 border-gray-300 rounded-xl relative">
      <div className="font-semibold absolute left-8 -top-3 underline underline-offset-4 bg-white px-1">
        移動時間検索
      </div>
      <div className="flex items-center">
        <div className="pr-6">出発地</div>
        <select
          onChange={(e) => handleStartSpotSelect(e.target.value)}
          className="p-1 border border-gray-300 rounded-md flex-grow"
        >
          <option>-- spotを選択 --</option>
          {userTrip
            .find((trip) => {
              return trip.id === urlTripID;
            })
            ?.schedules[urlTripDay - 1].map((spot, spotIndex) => {
              return <option>{spot.title}</option>;
            })}
        </select>
      </div>
      <div className="py-2 flex justify-center">
        <PiArrowFatLinesDownFill size={25} color="#0B499D" />
      </div>
      <div className="flex items-center">
        <div className="pr-6">目的地</div>
        <select
          onChange={(e) => handleEndSpotSelect(e.target.value)}
          className="p-1 border border-gray-300 rounded-md flex-grow"
        >
          <option>-- spotを選択 --</option>
          {userTrip
            .find((trip) => {
              return trip.id === urlTripID;
            })
            ?.schedules[urlTripDay - 1].map((spot, spotIndex) => {
              return <option>{spot.title}</option>;
            })}
        </select>
      </div>
      <hr className="my-4 border border-gray-300" />
      <div className="px-1 mt-3 mb-2">
        <div className="flex border-b border-gray-300 items-center">
          <button
            className={
              travelMode == "TRANSIT"
                ? "p-[2px] mb-[2px] ml-1 rounded-full bg-gray-300"
                : "p-[2px] mb-[2px] ml-1 rounded-full hover:bg-gray-200"
            }
            onClick={() => setTravelMode("TRANSIT")}
          >
            <MdDirectionsSubway size={22} />
          </button>
          <div className="ml-2">１時間</div>
        </div>
        <div className="flex border-b border-gray-300 mt-1 items-center">
          <button
            className={
              travelMode == "DRIVING"
                ? "p-[2px] mb-[2px] ml-1 rounded-full bg-gray-300"
                : "p-[2px] mb-[2px] ml-1 rounded-full hover:bg-gray-200"
            }
            onClick={() => setTravelMode("DRIVING")}
          >
            <MdDirectionsCar size={22} />
          </button>
          <div className="ml-2">１時間</div>
        </div>
        <div className="flex border-b border-gray-300 mt-1 items-center">
          <button
            className={
              travelMode == "WALKING"
                ? "p-[2px] mb-[2px] ml-1 rounded-full bg-gray-300"
                : "p-[2px] mb-[2px] ml-1 rounded-full hover:bg-gray-200"
            }
            onClick={() => setTravelMode("WALKING")}
          >
            <MdDirectionsWalk size={22} />
          </button>
          <div className="ml-2">１時間</div>
        </div>
      </div>
    </div>
  );
};

export default TravelTimeSearch;
