import React, { FC, useEffect, useState } from "react";
import { PiArrowFatLinesDownFill } from "react-icons/pi";
import {
  MdDirectionsSubway,
  MdDirectionsCar,
  MdDirectionsWalk,
} from "react-icons/md";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

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
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // 出発地
  const [startSpot, setStartSpot] = useState<{
    title: string;
    memo: string;
    location: { lat: number; lng: number };
  }>();
  const handleStartSpotSelect = (selectedSpotTitle: string) => {
    if (selectedSpotTitle === "-- spotを選択 --") return;

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
    if (selectedSpotTitle === "-- spotを選択 --") return;

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
  const [travelMode, setTravelMode] = useState("DRIVING");

  // 所要時間
  const [travelTime, setTravelTime] = useState<string>("");

  // 経路検索
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !startSpot || !endSpot)
      return;

    // if (travelMode === "TRANSIT") {
    //   directionsService
    //     .route({
    //       origin: startSpot!.location,
    //       destination: endSpot!.location,
    //       travelMode: google.maps.TravelMode.TRANSIT,
    //     })
    //     .then((response) => {
    //       directionsRenderer.setDirections(response);
    //       console.log("TRANSIT");
    //     });
    if (travelMode === "DRIVING") {
      directionsService
        .route({
          origin: startSpot!.location,
          destination: endSpot!.location,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setTravelTime(response.routes[0].legs[0].duration!.text);
        });
    } else if (travelMode === "WALKING") {
      directionsService
        .route({
          origin: startSpot!.location,
          destination: endSpot!.location,
          travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setTravelTime(response.routes[0].legs[0].duration!.text);
        });
    }

    // return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, startSpot, endSpot, travelMode]);

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
            ?.schedules[urlTripDay - 1].map((spot) => {
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
            ?.schedules[urlTripDay - 1].map((spot) => {
              return <option>{spot.title}</option>;
            })}
        </select>
      </div>

      <div className="px-1 mt-6 mb-2">
        <div className="flex border-b border-gray-300 mt-1 items-center">
          {/* <button
            className={
              travelMode == "TRANSIT"
                ? "p-[2px] mb-[2px] ml-1 rounded-full bg-gray-300"
                : "p-[2px] mb-[2px] ml-1 rounded-full hover:bg-gray-200"
            }
            onClick={() => setTravelMode("TRANSIT")}
          >
            <MdDirectionsSubway size={22} />
          </button> */}
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
          <button
            className={
              travelMode == "WALKING"
                ? "p-[2px] mb-[2px] ml-2 rounded-full bg-gray-300"
                : "p-[2px] mb-[2px] ml-2 rounded-full hover:bg-gray-200"
            }
            onClick={() => setTravelMode("WALKING")}
          >
            <MdDirectionsWalk size={22} />
          </button>
        </div>

        <div className="h-10 leading-10 font-semibold text-xl pl-5 pt-1">
          {travelTime}
        </div>
      </div>
    </div>
  );
};

export default TravelTimeSearch;
