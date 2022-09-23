import React from "react";
import { NavLink } from "react-router-dom";

const ProjectNavLink = () => {
  return (
    <NavLink
      style={({isActive}) => {
        return { color: isActive ? "#4338ca" : "#374151" };
      }}
      className="mx-2 text-sm font-semibold"
      to="/projects"
    >
      Projects
    </NavLink>
  );
};

export default ProjectNavLink;
