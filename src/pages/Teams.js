import React from "react";
import TeamsNavbar from "../components/navbar/TeamsNavbar";
import Teams from "../components/teams/Teams";
import TeamsHeader from "../components/teams/TeamsHeader";

const TeamsPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <TeamsNavbar />
      <TeamsHeader/>
      <Teams/>
    </div>
  );
};

export default TeamsPage;
