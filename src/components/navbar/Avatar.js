import React from "react";
import AvatarGroup from "react-avatar-group";
import { useSelector } from "react-redux";

const Avatar = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { name } = loggedInUser || {};
  
  return (
    <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
      <AvatarGroup
        avatars={[name]}
        displayAllOnHover
        shadow={1}
        initialCharacters={2}
        max={6}
        fontSize={0.5}
        uppercase={true}
        bold={true}
        tooltipArrow={true}
      />
    </button>
  );
};

export default Avatar;
