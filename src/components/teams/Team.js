import React from "react";
import { deptOptions } from "../../utils/deptOptions";
import TeamMembers from "./TeamMembers";
import TeamOptions from "./TeamOptions";
const Team = ({ team }) => {
  const { dept, title, timestamp, members, id } = team || {};

  let findColor = undefined;
  findColor =
    dept !== undefined &&
    deptOptions.find(
      (deptColor) => deptColor.value.toLowerCase() === dept.toLowerCase()
    );

  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable="true"
    >
      {/* options : delete team, edit member */}
      <TeamOptions id={id} />
      <span
        style={{
          backgroundColor: `${findColor.color}30`,
          color: `${findColor.color}`,
        }}
        className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full`}
      >
        {dept}
      </span>
      {/* render team members avatar */}
      <TeamMembers members={members} id={id} />
      <h4 className="mt-3 text-sm font-medium">{title}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Team;
