import React, { FC, ReactNode } from "react";

const PrimaryButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <button className=" text-white text-center py-2 px-6 rounded bg-theme-blue hover:opacity-80 border-none outline-none">
        {children}
      </button>
    </div>
  );
};

export default PrimaryButton;
