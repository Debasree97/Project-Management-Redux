import {
  useDeleteTeamMutation,
  useGetTeamQuery,
} from "../../features/teams/teamsApi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEdit } from "../../features/teams/teamsSlice";
import deleteIcon from "../../assets/images/delete.png";
import editToAddIcon from "../../assets/images/add-member.png";

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
  }, [isEditMember, dispatch, id]);

  return (
    <span className="absolute top-0 right-0 hover:flex items-center justify-center hidden mt-4 mr-2 group-hover:flex">
      <span>
        <img
          onClick={() => handleEditMember(true)}
          className="w-6 h-6 hover:bg-indigo-100 rounded p-1"
          src={editToAddIcon}
          alt=""
        />
      </span>
      {myEmail === creator && (
        <span>
          <img
            onClick={handleDelete}
            className="w-6 h-6 hover:bg-rose-100 rounded p-1"
            src={deleteIcon}
            alt=""
          />
        </span>
      )}
    </span>
  );
};

export default TeamOptions;
