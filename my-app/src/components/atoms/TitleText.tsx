import React, { FC, ReactNode } from "react";

const TitleText: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="text-xl sm:text-2xl border-l-8 pl-2 border-theme-blue leading-8 sm:leading-10 font-extrabold inline-block mb-3">
      {children}
    </div>
  );
};

export default TitleText;
