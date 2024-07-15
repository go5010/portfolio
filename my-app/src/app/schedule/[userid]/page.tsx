import ScheduleSidebar from "@/components/organism/ScheduleSidebar";
import React from "react";

const Schedule = () => {
  return (
    <div className="flex">
      <ScheduleSidebar />
      <div className="text-center font-extrabold xs:text-lg md:text-2xl w-full mt-14">
        ←　計画作成する旅行・日程を選択しましょう！
      </div>
    </div>
  );
};

export default Schedule;
