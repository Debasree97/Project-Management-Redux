import React from "react";
import Backlogs from "./backlog/Backlogs";
import AllBlocked from "./blocked/AllBlocked";
import Doings from "./doing/Doings";
import AllDone from "./done/AllDone";
import AllReady from "./ready/AllReady";
import Reviews from "./review/Reviews";

const Project = () => {
  return (
    <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
      <Backlogs />

      <AllReady />

      <Doings />

      <Reviews />

      <AllBlocked />

      <AllDone />
    </div>
  );
};

export default Project;
