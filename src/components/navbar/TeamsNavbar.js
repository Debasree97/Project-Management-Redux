import React from "react";
import logo from "../../assets/images/logo.svg";
import Avatar from "./Avatar";
import ProjectNavLink from "./navlinks/ProjectNavLink";
import TeamsNavLink from "./navlinks/TeamsNavLink";

const TeamsNavbar = () => {
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={logo} alt="" className="h-10 w-10" />
      <div className="ml-10">
        <ProjectNavLink/>
        <TeamsNavLink/>
      </div>
      <Avatar/>
    </div>
  );
};

export default TeamsNavbar;
