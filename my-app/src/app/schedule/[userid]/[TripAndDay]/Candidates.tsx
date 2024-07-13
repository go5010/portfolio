import Link from "next/link";
import React from "react";

const Candidates = () => {
  const userid = "go";
  return (
    <div>
      <div>Candidates</div>
      <Link href={"/schedule/" + userid}>aaa</Link>
    </div>
  );
};

export default Candidates;
