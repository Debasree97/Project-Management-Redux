import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backlogRemaining: 0,
  readyRemaining: 0,
  doingRemaining: 0,
  reviewRemaining: 0,
  blockedRemaining: 0,
  doneRemaining: 0,
  projectId: 0,
  projectData: {},
};
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    RemainingCount: (state, action) => {
      if (action.payload !== undefined) {
        state.backlogRemaining = action.payload.filter(
          (project) => project.state === "backlog"
        ).length;
        state.backlogRemaining = action.payload.filter(
          (project) => project.state === "backlog"
        ).length;
        state.readyRemaining = action.payload.filter(
          (project) => project.state === "ready"
        ).length;
        state.doingRemaining = action.payload.filter(
          (project) => project.state === "doing"
        ).length;
        state.reviewRemaining = action.payload.filter(
          (project) => project.state === "review"
        ).length;
        state.blockedRemaining = action.payload.filter(
          (project) => project.state === "blocked"
        ).length;
        state.doneRemaining = action.payload.filter(
          (project) => project.state === "done"
        ).length;
      }
      
    },

    getProject: (state, action) => {
      state.projectId = action.payload.id;
      state.projectData = action.payload.project;
    },
  },
});

export const { getProject, RemainingCount } = projectsSlice.actions;
export default projectsSlice.reducer;
