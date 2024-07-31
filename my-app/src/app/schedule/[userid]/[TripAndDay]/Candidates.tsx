import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Rating from "@mui/material/Rating";
import { ImShrink2 } from "react-icons/im";
import { usePathname } from "next/navigation";

type CardOpenType = Array<{ spotNo: number; open: boolean }>;

const Candidates: FC<{
  cardOpen: CardOpenType;
  setCardOpen: Dispatch<SetStateAction<CardOpenType>>;
}> = ({ cardOpen, setCardOpen }) => {
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

  const [targetSpot, setTargetSpot] = useState<number>();

  return (
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
                  <textarea className="w-[calc(100%-40px)] border rounded-md py-1 px-2 outline-none resize-none absolute bottom-[30px] left-[20px]"></textarea>
                )}
              </div>
            );
          })}
      </div>
      <div>google map, 移動時間検索</div>
    </div>
  );
};

export default Candidates;
