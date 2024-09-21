import React, { FC, ReactNode } from "react";

const PrimaryButton: FC<{ children: ReactNode; onClickFunc: any }> = ({
  children,
  onClickFunc,
}) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClickFunc}
        className=" text-white text-center py-2 px-6 rounded bg-theme-blue hover:opacity-80 border-none outline-none sm:text-base xs:text-sm"
      >
        {children}
      </button>
    </div>
  );
};

export default PrimaryButton;
