"use client";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Rating from "@mui/material/Rating";
import { ImShrink2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
// import { Loader } from "@googlemaps/js-api-loader";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteSpot } from "@/app/_api/db";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

type CardOpenType = { spotNo: number; open: boolean }[] | undefined;
type schedulesType = {
  title: string;
  memo: string;
  location: { lat: number; lng: number };
}[][];
type userTripType = { id: string; title: string; schedules: schedulesType };

const Candidates: FC<{
  cardOpen: CardOpenType;
  setCardOpen: Dispatch<SetStateAction<CardOpenType>>;
  userTrip: userTripType[];
  setUserTrip: Dispatch<SetStateAction<userTripType[]>>;
  urlTripDay: number;
  urlTripID: string;
  userTripTitle: string;
  fetchTrips: () => Promise<void>;
}> = ({
  cardOpen,
  setCardOpen,
  userTrip,
  setUserTrip,
  urlTripDay,
  urlTripID,
  userTripTitle,
  fetchTrips,
}) => {
  const users = { id: "userxxxxx", name: "Gota Arai", email: "xxx@gmail.com" };

  const handleCardClick = (clickedIndex: number) => {
    setCardOpen(
      cardOpen!.map((card, index) => {
        if (index === clickedIndex) {
          card.open = true;
        }
        return card;
      })
    );
  };

  const handleShrinkClick = (clickedIndex: number) => {
    setCardOpen(
      cardOpen!.map((card, index) => {
        if (index === clickedIndex) {
          card.open = false;
        }
        return card;
      })
    );
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const updateCardOpen = (spotIndex: number) => {
    const newCardOpen = cardOpen?.filter((_, spotIndex2) => {
      return spotIndex2 !== spotIndex;
    });
    setCardOpen(newCardOpen);
  };

  // const mapContainerRef = useRef<HTMLDivElement>(null);
  // const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;

  // useEffect(() => {
  //   const loader = new Loader({
  //     apiKey: API_KEY,
  //     version: "weekly",
  //   });
  //   let map;
  //   loader.load().then(async () => {
  //     if (mapContainerRef.current) {
  //       const position = { lat: 35.6895, lng: 139.6917 };
  //       const { Map } = (await google.maps.importLibrary(
  //         "maps"
  //       )) as google.maps.MapsLibrary;
  //       const { AdvancedMarkerElement } = (await google.maps.importLibrary(
  //         "marker"
  //       )) as google.maps.MarkerLibrary;
  //       map = new Map(mapContainerRef.current, {
  //         center: position,
  //         zoom: 10,
  //         mapID: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
  //       });
  //       new AdvancedMarkerElement({
  //         map,
  //         position: position,
  //         title: "Uluru",
  //       });
  //     }
  //   });
  // }, []);

  const [targetSpot, setTargetSpot] = useState<number>(); //Googleマップのターゲットピン

  if (!userTrip.length) {
    return <div>Loading...</div>; //ローディング表示
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
      <div className="flex mt-5 px-3">
        <div className="w-2/3 flex flex-col">
          {userTrip
            .find((trip) => {
              return trip.id === urlTripID;
            })
            ?.schedules[urlTripDay - 1].map((spot, spotIndex) => {
              return (
                <div
                  className={
                    cardOpen![spotIndex].open
                      ? "relative w-4/5"
                      : "relative w-1/3"
                  }
                  key={spot.title}
                >
                  <button
                    className="border border-gray-300 shadow-md rounded-lg w-full text-left px-3 py-2 mb-3"
                    onClick={() => {
                      handleCardClick(spotIndex);
                      setTargetSpot(spotIndex);
                    }}
                  >
                    <p className="font-semibold">{spot.title}</p>
                    {cardOpen![spotIndex].open === true && (
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
                        <div>住所，写真</div>
                        <div>・営業日/時間</div>
                        <br />
                        <div className="mb-[75px]">・メモ</div>
                      </div>
                    )}
                  </button>
                  {cardOpen![spotIndex].open === true && (
                    <button
                      className=" p-1 rounded-md hover:bg-slate-200 absolute top-1 right-1"
                      onClick={() => handleShrinkClick(spotIndex)}
                    >
                      <ImShrink2 />
                    </button>
                  )}
                  {cardOpen![spotIndex].open === true && (
                    <div>
                      <button
                        className=" p-1 rounded-md hover:bg-slate-200 absolute top-1 right-8"
                        onClick={handleDialogOpen}
                      >
                        <MdDeleteForever />
                      </button>
                      <Dialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"候補スポットを削除しますか？"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleDialogClose} autoFocus>
                            キャンセル
                          </Button>
                          <Button
                            onClick={() => {
                              handleDialogClose();
                              deleteSpot(userTripTitle, urlTripDay, spot.title);
                              setUserTrip([]);
                              fetchTrips();
                              updateCardOpen(spotIndex);
                            }}
                            color="error"
                          >
                            削除
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                  {cardOpen![spotIndex].open === true && (
                    <textarea className="w-[calc(100%-40px)] border rounded-md py-1 px-2 outline-none resize-none absolute bottom-[30px] left-[20px]"></textarea>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <Map
            style={{ width: "400px", height: "400px" }}
            defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker position={{ lat: 35.6895, lng: 139.6917 }} />
            <Marker position={{ lat: 35.5895, lng: 139.5917 }} />
          </Map>
          <div>移動時間検索</div>
        </div>
      </div>
    </APIProvider>
  );
};

export default Candidates;
