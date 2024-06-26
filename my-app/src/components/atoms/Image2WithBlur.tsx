import Image from "next/image";
import React from "react";

const Image2WithBlur = () => {
  return (
    <div className="rounded-full lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] sm:w-[180px] sm:h-[180px] xs:w-[110px] xs:h-[110px] relative after:absolute after:content-[''] after:rounded-full after:top-0 after:bottom-0 after:left-0 after:right-0 after:shadow-[inset_0_0_10px_10px_rgb(255,255,255)]">
      <Image src="/image2_2.png" alt="" width={500} height={500} />
    </div>
  );
};

export default Image2WithBlur;
