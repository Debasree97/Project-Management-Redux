import React from "react";
import { useSelector } from "react-redux";
import EditMembers from "./EditMembers";

import AvatarGroup from "react-avatar-group";

const TeamMembers = ({ members, id }) => {
  const { isEditMembers, id: editId } =
    useSelector((state) => state.teams) || {};
  return (
    <>
      <span className="flex mt-3">
        {members?.map((member) => (
          <AvatarGroup
            key={member.id}
            avatars={[member.name]}
            displayAllOnHover
            shadow={1}
            initialCharacters={2}
            max={6}
            fontSize={0.5}
            uppercase={true}
            bold={true}
            tooltipArrow={true}
          />
        ))}
      </span>
      <div>{isEditMembers && id === editId && <EditMembers id={editId} />}</div>
    </>
  );
};

export default TeamMembers;
