import moment from "moment/moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useAddTeamMutation } from "../features/teams/teamsApi";
import { useGetUsersQuery } from "../features/users/usersApi";
import { deptOptions } from "../utils/deptOptions";
import Error from "./ui/Error";
import { useAddProjectMutation } from "../features/projects/projectApi";

const AddModal = ({ open, control, endpoint }) => {
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState({});
  const [addMember, setAddMember] = useState([]);

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail, name } = loggedInUser || {};

  const [
    addTeam,
    {
      isSuccess: isTeamSuccess,
      isError: isTeamError,
      isLoading: isTeamLoading,
    },
  ] = useAddTeamMutation();
  const [
    addProject,
    {
      isSuccess: isProjectSuccess,
      isError: isProjectError,
      isLoading: isProjectLoading,
    },
  ] = useAddProjectMutation();

  const { data: users } = useGetUsersQuery();

  useEffect(() => {
    if (isTeamSuccess || isProjectSuccess) {
      control();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTeamSuccess, isProjectSuccess]);

  // React-Select

  // React-Select for Department
  const handleDeptSelect = (selectedOption) => {
    setDept(selectedOption);
  };

  // React-Select for Members start
  let memberOptions = undefined;
  memberOptions = users?.filter((user) => user.email !== myEmail);

  const newMemberOptions = memberOptions?.slice().map((member) =>
    Object.assign({
      ...member,
      value: member.name.toLowerCase(),
      label: member.name,
    })
  );

  const filterOptions = (inputValue) => {
    return newMemberOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  };

  const handleMemberSelect = (selectedOption) => {
    setAddMember(selectedOption);
  };

  const animatedComponents = makeAnimated();

  // React-Select for Members end

  // submit functions

  // submit to teams db
  const handleTeamSubmit = (e) => {
    e.preventDefault();

    // creator info modification
    const newLoggedInUser = Object.assign({
      ...loggedInUser,
      value: loggedInUser.name.toLowerCase(),
      label: loggedInUser.name,
    });

    // url query calculation
    let team = "";
    setAddMember(addMember && addMember?.push(newLoggedInUser));
    addMember?.map((member) => (team += member.email + "-"));
    const assignedTeam = team?.slice(0, team.length - 1);

    //add to teams
    addTeam({
      user: myEmail,
      data: {
        creator: myEmail,
        assigned: assignedTeam,
        dept: dept.label,
        title,
        members: addMember,
        timestamp: moment().format("MMM Do YY"),
      },
    });

    setTitle("");
  };

  // submit to projects db
  const handleProjectSubmit = (e) => {
    e.preventDefault();

    // url query calculation
    let team = "";
    const allMembers = addMember && addMember?.push(loggedInUser);
    setAddMember(allMembers);
    addMember?.map((member) => (team += member.email + "-"));
    const assignedTeam = team?.slice(0, team.length - 1);

    addProject({
      user: myEmail,
      data: {
        creator: loggedInUser,
        assigned: assignedTeam,
        dept: dept.label,
        state: "backlog",
        title,
        date: moment().format("MMM Do YY"),
        timestamp: new Date().getTime(),
      },
    });

    setTitle("");
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          {endpoint === "teams" ? (
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create New Team
            </h2>
          ) : (
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create New Project
            </h2>
          )}
          {endpoint === "teams" ? (
            <p className=" bg-yellow-400 font-serif italic font-medium inline-block px-3 py-1 text-black rounded-full mx-auto">
              Team Creator: {name}
            </p>
          ) : (
            <p className=" bg-yellow-400 font-serif italic font-medium inline-block px-3 py-1 text-black rounded-full mx-auto">
              Project Creator: {name}
            </p>
          )}
          <form
            className=" space-y-6"
            onSubmit={
              endpoint === "teams" ? handleTeamSubmit : handleProjectSubmit
            }
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <p className="mb-1 font-semibold text-lg">
                  Choose Team <span>&#42;</span>
                </p>

                <Select
                  required
                  components={animatedComponents}
                  options={deptOptions}
                  onChange={handleDeptSelect}
                  placeholder=""
                />
              </div>

              <div>
                <p className="mb-1 mt-4 font-semibold text-lg">
                  Add Title <span>&#42;</span>
                </p>
                <textarea
                  name="title"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-md focus:outline-none text-sm md:text-md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 mt-4 font-semibold text-lg">Add Members</p>
                <AsyncSelect
                  components={animatedComponents}
                  defaultOptions={users?.length > 0 && newMemberOptions}
                  loadOptions={users?.length > 0 && loadOptions}
                  onChange={handleMemberSelect}
                  isMulti
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isTeamLoading || isProjectLoading}
              >
                Create Team
              </button>
            </div>
            {(isTeamError || isProjectError) && (
              <Error message="Something went wrong" />
            )}
          </form>
        </div>
      </>
    )
  );
};

export default AddModal;
