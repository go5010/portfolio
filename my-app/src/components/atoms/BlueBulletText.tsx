import React, { FC, ReactNode } from "react";

const BlueBulletText: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center">
      <div className="w-2.5 h-2.5 bg-theme-blue inline-block mr-2"></div>
      <div className="inline-block font-semibold">{children}</div>
    </div>
  );
};

export default BlueBulletText;
