import React from "react";
import Blocked from "./Blocked";

const AllBlocked = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Blocked</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          1
        </span>
      </div>
      <Blocked/>
    </div>
  );
};

export default AllBlocked;
