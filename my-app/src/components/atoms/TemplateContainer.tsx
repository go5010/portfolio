import React, { FC, ReactNode } from "react";

const TemplateContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="border-2  py-5 px-7 rounded-xl mx-auto">{children}</div>
  );
};

export default TemplateContainer;
