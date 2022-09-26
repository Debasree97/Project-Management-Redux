import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  useEditProjectMutation,
  useGetProjectsQuery,
} from "../../features/projects/projectApi";
import { RemainingCount } from "../../features/projects/projectsSlice";
import { ProjectCols } from "../../utils/projectColumns";
import Error from "../ui/Error";
import AddProject from "./AddProject";
import Project from "./Project";


const Projects = () => {
  // UI data render
  const { user } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = user || {};
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsQuery(myEmail) || {};

  const { projectId, projectData } = useSelector((state) => state.projects);

  const { creator, dept, title, date, assigned, timestamp } = projectData || {};

  const [editProject] = useEditProjectMutation();

  const {
    backlogRemaining,
    readyRemaining,
    doingRemaining,
    reviewRemaining,
    blockedRemaining,
    doneRemaining,
  } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RemainingCount(projects));
  }, [dispatch, projects]);

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
    content = <></>;
  }

  // React-Beautiful-dnd function

  const [columns] = useState(ProjectCols);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      window.alert("Drop when tile background appears!");
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const destCol = columns.filter(
        (col) => col.cid === destination.droppableId
      );

      editProject({
        id: projectId,
        data: {
          creator,
          assigned,
          dept,
          state: destCol[0].col.toLowerCase(),
          title,
          date,
          timestamp,
        },
        user: myEmail,
      });
    } else {
      window.alert("You can't drop in the same tile!");
    }
  };

  return (
    <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {ProjectCols.map((column) => {
          return (
            <div key={column.col} className="flex flex-col flex-shrink-0 w-72">
              <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">
                  {column.col}
                </span>
                <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                  {column.col==="Backlog" && backlogRemaining}
                  {column.col==="Ready" && readyRemaining}
                  {column.col==="Doing" && doingRemaining}
                  {column.col==="Review" && reviewRemaining}
                  {column.col==="Blocked" && blockedRemaining}
                  {column.col==="Done" && doneRemaining}
                </span>
                {column.col === "Backlog" && <AddProject />}
              </div>
              <Droppable droppableId={column.cid} key={column.cid}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        backgroundColor: snapshot.isDraggingOver && "#f4f4f450",
                        borderRadius: snapshot.isDraggingOver && "8px",
                      }}
                      className="flex flex-col pb-2 overflow-auto"
                    >
                      {!isLoading && !isError && projects?.length > 0
                        ? projects
                            ?.slice()
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map(
                              (project, index) =>
                                project.state === column.col.toLowerCase() && (
                                  <Draggable
                                    index={index}
                                    key={project.id}
                                    draggableId={project.id.toString()}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <Project
                                          provided={provided}
                                          snapshot={snapshot}
                                          forwardedRef={provided.innerRef}
                                          project={project}
                                          key={project.id}
                                          column={column}
                                        />
                                      );
                                    }}
                                  </Draggable>
                                )
                            )
                        : content}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Projects;
