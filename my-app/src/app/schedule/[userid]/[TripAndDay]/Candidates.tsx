"use client";

import React, {
  createRef,
  Dispatch,
  FC,
  memo,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Rating from "@mui/material/Rating";
import { ImShrink2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { createTripListArr, deleteSpot, saveSpotMemo } from "@/app/_api/db";
import { Map, useMap } from "@vis.gl/react-google-maps";
import MapMarker from "@/components/atoms/MapMarker";
import TravelTimeSearch from "@/components/organism/TravelTimeSearch";
import { UserContext } from "@/providers/UserProvider";
import { SiTripadvisor } from "react-icons/si";

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
  //タブ切り替えでのビューポート再設定用
  isChangedSpotList: boolean;
  setIsChangedSpotList: Dispatch<SetStateAction<boolean>>;
}> = memo(
  ({
    cardOpen,
    setCardOpen,
    userTrip,
    setUserTrip,
    urlTripDay,
    urlTripID,
    userTripTitle,
    fetchTrips,
    isChangedSpotList,
    setIsChangedSpotList,
  }) => {
    const loginUser = useContext(UserContext).user;

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

    const [targetSpot, setTargetSpot] = useState<number>(); //Googleマップのターゲットマーカー

    // マップビューポート設定
    const map = useMap();
    useEffect(() => {
      const fitMapToMarkers = async () => {
        console.log(isChangedSpotList);
        if (!map) return;

        if (isChangedSpotList) {
          const trips: userTripType[] = await createTripListArr(
            loginUser?.uid!
          );
          const bounds = new google.maps.LatLngBounds();
          trips
            .find((trip) => {
              return trip.id === urlTripID;
            })
            ?.schedules[urlTripDay - 1].forEach((spot) => {
              bounds.extend(spot.location);
            });
          map.fitBounds(bounds);
          setIsChangedSpotList(false);
        } else {
          const bounds = new google.maps.LatLngBounds();
          userTrip
            .find((trip) => {
              return trip.id === urlTripID;
            })
            ?.schedules[urlTripDay - 1].forEach((spot) => {
              bounds.extend(spot.location);
            });
          map.fitBounds(bounds);
          setIsChangedSpotList(false);
        }
      };
      fitMapToMarkers();
    }, [map, isChangedSpotList]);

    // spotメモ
    const [spotMemo, setSpotMemo] = useState<string[] | undefined>(
      userTrip
        .find((trip) => {
          return trip.id === urlTripID;
        })
        ?.schedules[urlTripDay - 1].map((spot) => {
          return spot.memo;
        })
    );
    const handleChangeMemo = (memoText: string, targetIndex: number) => {
      setSpotMemo(
        userTrip
          .find((trip) => {
            return trip.id === urlTripID;
          })
          ?.schedules[urlTripDay - 1].map((spot, spotIndex) => {
            if (targetIndex === spotIndex) {
              return memoText;
            }
            return spot.memo;
          })
      );
    };

    // spotメモtextareaからfocusが外れたらメモをfirestoreに登録
    const memoInputs = useRef<RefObject<HTMLTextAreaElement>[]>([]);
    const handleBlur = (
      index: number,
      userTripTitle: string,
      urlTripDay: number,
      spottitle: string
    ) => {
      // メモが変更されたら実行
      if (
        userTrip
          .find((trip) => {
            return trip.id === urlTripID;
          })
          ?.schedules[urlTripDay - 1].find((_, spotIndex) => {
            return index === spotIndex;
          })?.memo !== spotMemo![index]
      ) {
        saveSpotMemo(
          loginUser!.uid,
          userTripTitle,
          urlTripDay,
          spottitle,
          spotMemo![index]
        );
      }
    };

    if (!userTrip.length) {
      return <div>Loading...</div>; //ローディング表示
    }

    return (
      <div className="flex mt-5 px-3">
        {/* 候補spotカード */}
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

                  {/* card縮小ボタン */}
                  {cardOpen![spotIndex].open === true && (
                    <button
                      className=" p-1 rounded-md hover:bg-slate-200 absolute top-1 right-1"
                      onClick={() => handleShrinkClick(spotIndex)}
                    >
                      <ImShrink2 />
                    </button>
                  )}

                  {/* spot削除ボタン */}
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
                          {"スポットを削除しますか？"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleDialogClose} autoFocus>
                            キャンセル
                          </Button>
                          <Button
                            onClick={async () => {
                              handleDialogClose();
                              await deleteSpot(
                                loginUser!.uid,
                                userTripTitle,
                                urlTripDay,
                                spot.title
                              );
                              setUserTrip([]);
                              await fetchTrips();
                              updateCardOpen(spotIndex);
                              setIsChangedSpotList(true);
                            }}
                            color="error"
                          >
                            削除
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}

                  {/* spotメモ */}
                  {cardOpen![spotIndex].open === true && (
                    <textarea
                      className="w-[calc(100%-40px)] border rounded-md py-1 px-2 outline-none resize-none absolute bottom-[30px] left-[20px]"
                      onChange={(e) =>
                        handleChangeMemo(e.target.value, spotIndex)
                      }
                      onBlur={() =>
                        handleBlur(
                          spotIndex,
                          userTripTitle,
                          urlTripDay,
                          spot.title
                        )
                      }
                      ref={memoInputs.current[spotIndex]}
                    >
                      {spotMemo![spotIndex]}
                    </textarea>
                  )}
                </div>
              );
            })}
        </div>

        {/* 移動時間検索エリア */}
        <div>
          <Map
            style={{ width: "400px", height: "400px" }}
            defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          >
            {userTrip
              .find((trip) => {
                return trip.id === urlTripID;
              })
              ?.schedules[urlTripDay - 1].map((spot, spotIndex) => {
                return (
                  <MapMarker
                    location={spot.location}
                    spotIndex={spotIndex}
                    targetSpot={targetSpot}
                  />
                );
              })}
          </Map>
          <TravelTimeSearch
            userTrip={userTrip}
            urlTripDay={urlTripDay}
            urlTripID={urlTripID}
          />
        </div>
      </div>
    );
  }
);

export default Candidates;
