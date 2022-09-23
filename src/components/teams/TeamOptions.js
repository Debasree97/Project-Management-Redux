import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useDeleteTeamMutation, useGetTeamQuery } from "../../features/teams/teamsApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEdit } from "../../features/teams/teamsSlice";
import { useEffect } from "react";

const TeamOptions = ({ id }) => {
  const { isEditMembers } = useSelector((state) => state.teams);
  const [isEditMember, setIsEditMember] = useState(isEditMembers);

    const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  
  
  const { data } = useGetTeamQuery(id) || {};
  const { creator } = data || {};

  const dispatch = useDispatch();

  const [deleteTeam] = useDeleteTeamMutation();

  const handleDelete = () => {
    deleteTeam(id);
  };

  const handleEditMember = (value) => {
    setIsEditMember(value);
  };

  useEffect(() => {
    dispatch(isEdit({ id, isEditMember }));
  },[isEditMember,dispatch,id])

  return (
    <Menu
      menuButton={
        <MenuButton className="absolute top-0 right-0 hover:flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </MenuButton>
      }
    >
      <div
        style={{ right: "-20px", border: "1px #bababa solid" }}
        className="bg-white text-center absolute top-0 rounded-sm w-24 font-medium text-xs"
      >
        <MenuItem onClick={() => handleEditMember(true)} className="my-1">
          Add Member
        </MenuItem>
        {myEmail ===creator && <span>
          <hr style={{ backgroundColor: "#bababa" }} />
          <MenuItem onClick={handleDelete} className="my-1">
            Delete Team
          </MenuItem>
        </span>}
      </div>
    </Menu>
  );
};

export default TeamOptions;
