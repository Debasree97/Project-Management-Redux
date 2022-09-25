import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../../features/projects/projectApi";
import Error from "../ui/Error";
import AddProject from "./AddProject";
import Backlog from "./backlog/Backlog";
import Blocked from "./blocked/Blocked";
import Doing from "./doing/Doing";
import Done from "./done/Done";
import Ready from "./ready/Ready";
import Review from "./review/Review";

const Projects = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = user || {};
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsQuery(myEmail) || {};

  const dispatch = useDispatch();

  const {
    backlogRemaining,
    readyRemaining,
    doingRemaining,
    reviewRemaining,
    blockedRemaining,
    doneRemaining,
  } = useSelector((state) => state.projects);

  let content = null;

  if (isLoading) {
    content = <h3 className="text-center">Loading...</h3>;
  } else if (!isLoading && isError) {
    content = (
      <h3 className="text-center">
        <Error message="There is an Error" />
      </h3>
    );
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <h3 className="text-center">No Project found!</h3>;
  }

  useEffect(() => {}, []);

  return (
    <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
      {/* backlog */}
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">Backlog</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {backlogRemaining}
          </span>
          <AddProject />
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {!isLoading && !isError && projects?.length > 0
            ? projects
                ?.slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(
                  (project) =>
                    project.state === "backlog" && (
                      <Backlog project={project} key={project.id} />
                    )
                )
            : content}
        </div>
      </div>

      {/* ready */}
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">Ready</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {readyRemaining}
          </span>
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {!isLoading && !isError && projects?.length > 0
            ? projects
                ?.slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(
                  (project) =>
                    project.state === "ready" && (
                      <Ready project={project} key={project.id} />
                    )
                )
            : content}
        </div>
      </div>

      {/* doing */}
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">Doing</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {doingRemaining}
          </span>
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {!isLoading && !isError && projects?.length > 0
            ? projects
                ?.slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(
                  (project) =>
                    project.state === "doing" && (
                      <Doing project={project} key={project.id} />
                    )
                )
            : content}
        </div>
      </div>

      {/* review */}
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">Review</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {reviewRemaining}
          </span>
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {!isLoading && !isError && projects?.length > 0
            ? projects
                ?.slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(
                  (project) =>
                    project.state === "review" && (
                      <Review project={project} key={project.id} />
                    )
                )
            : content}
        </div>
      </div>

      {/* blocked */}
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">Blocked</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {blockedRemaining}
          </span>
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {!isLoading && !isError && projects?.length > 0
            ? projects
                ?.slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(
                  (project) =>
                    project.state === "blocked" && (
                      <Blocked project={project} key={project.id} />
                    )
                )
            : content}
        </div>
      </div>

      {/* done */}
      <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">Done</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {doneRemaining}
          </span>
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {!isLoading && !isError && projects?.length > 0
            ? projects
                ?.slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(
                  (project) =>
                    project.state === "done" && (
                      <Done project={project} key={project.id} />
                    )
                )
            : content}
        </div>
      </div>
    </div>
  );
};

export default Projects;
