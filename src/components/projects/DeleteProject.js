import React from "react";
import deleteImg from "../../assets/images/delete.png";
import { useDeleteProjectMutation } from "../../features/projects/projectApi";

const DeleteProject = ({ id }) => {
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = () => {
    deleteProject(id);
  };

  return (
    <button
      onClick={handleDeleteProject}
      className="absolute top-0 right-0 hover:flex items-center justify-center hidden w-5 h-5 mt-4 mr-4 rounded  hover:ring-1 hover:ring-red-500 hover:ring-offset-2 hover:ring-offset-red-100 group-hover:flex"
    >
      <img className="w-4 h-4" src={deleteImg} alt="" />
    </button>
  );
};

export default DeleteProject;
