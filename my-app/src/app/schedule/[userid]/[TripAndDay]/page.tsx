"use client";

import ScheduleSidebar from "@/components/organism/ScheduleSidebar";
import React, { useState } from "react";
import Candidates from "./Candidates";
import { SearchArea } from "./SearchArea";

const Schedule = () => {
  const [candiOrSearch, setCandiOrSeacrch] = useState("candidates");
  return (
    <div className="flex">
      <ScheduleSidebar />
      <div className="grow px-7 pt-5">
        <div className="pb-5 ml-2">旅行　{`>`}　日程</div>
        <div className="flex border-b-2 pb-2">
          <div
            onClick={() => setCandiOrSeacrch("candidates")}
            className={
              candiOrSearch === "candidates"
                ? "ml-8 pb-1 px-1 border-b-4 border-gray-600"
                : "ml-8 pb-1 px-1 cursor-pointer hover:opacity-70"
            }
          >
            候補
          </div>
          <div
            onClick={() => setCandiOrSeacrch("search")}
            className={
              candiOrSearch === "search"
                ? "ml-8 pb-1 px-1 border-b-4 border-gray-600"
                : "ml-8 pb-1 px-1 cursor-pointer hover:opacity-70"
            }
          >
            検索
          </div>
        </div>
        {candiOrSearch === "candidates" ? <Candidates /> : <SearchArea />}
      </div>
    </div>
  );
};

export default Schedule;
