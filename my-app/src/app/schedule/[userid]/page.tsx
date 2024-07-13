import ScheduleSidebar from "@/components/organism/ScheduleSidebar";
import React from "react";

const Schedule = () => {
  return (
    <div className="flex">
      <ScheduleSidebar />
      <div>←　計画作成する旅行を選択しましょう！</div>
    </div>
  );
};

export default Schedule;
