import React from "react";
import AsyncSelect from "react-select/async";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../features/teams/teamsApi";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "../../features/users/usersApi";
import { useState } from "react";
import { isEdit } from "../../features/teams/teamsSlice";
import { useEffect } from "react";

const EditMembers = ({ id }) => {
  const [editTeam, { isError, isSuccess }] = useEditTeamMutation();
  const { data: users } = useGetUsersQuery();
  const { data } = useGetTeamQuery(id) || {};
  const { creator, members, dept, title, timestamp, assigned } = data || {};

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};

  const [editMembers, setEditMembers] = useState([]);

  const dispatch = useDispatch();

  const filterMembers = (arr1, arr2) => {
    let res = [];
    res = arr1?.filter((el) => {
      return !arr2?.find((element) => {
        return element.id === el.id;
      });
    });
    return res;
  };

  const allMembers = users && members && filterMembers(users, members);

  const newMembers = allMembers?.slice().map((member) =>
    Object.assign({
      ...member,
      value: member.name.toLowerCase(),
      label: member.name,
    })
  );

  const filterOptions = (inputValue) => {
    return newMembers?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  };

  const handleMemberSelect = (selectedOption) => {
    setEditMembers(selectedOption);
  };

  const handleEdit = () => {
    let newTeam = "";
    editMembers.map((member) => (newTeam += "-" + member.email));
    const newAssigned = assigned + newTeam;

    editTeam({
      id,
      data: {
        creator,
        assigned: newAssigned,
        dept,
        title,
        members: [...members, ...editMembers],
        timestamp,
      },
      user: myEmail,
    });
  };

  // react select style

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "red" : "black",
      fontSize: "12px",
      width:"100%"
    }),
  };

  useEffect(() => {
    if (isSuccess) {
      const isEditMember = false;
      dispatch(isEdit({ id, isEditMember }));
    }
  }, [isSuccess, dispatch, id]);

  return (
    <>
      <div className="flex md:flex-col justify-between my-3  w-full">
        <AsyncSelect
          styles={customStyles}
          required
          defaultOptions={users?.length > 0 && newMembers}
          loadOptions={users?.length > 0 && loadOptions}
          onChange={handleMemberSelect}
          isMulti
          placeholder="Add Member"
        />
        <button
          onClick={handleEdit}
          className="bg-indigo-500 text-sm md:text:md text-white rounded-md px-4 md:py-1 text-center ml-3 md:ml-0 md:mt-1"
        >
          Add
        </button>
      </div>

      {isError && <p>something went wrong</p>}
    </>
  );
};

export default EditMembers;
