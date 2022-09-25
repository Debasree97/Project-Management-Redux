import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backlogRemaining: 0,
  readyRemaining: 0,
  doingRemaining: 0,
  reviewRemaining: 0,
  blockedRemaining: 0,
  doneRemaining: 0,
};
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    backlogCount: (state, action) => {
      state.backlogRemaining = action.payload;
    },
    readyCount: (state, action) => {
      state.readyRemaining = action.payload;
    },
    doingCount: (state, action) => {
      state.doingRemaining = action.payload;
    },
    reviewCount: (state, action) => {
      state.reviewRemaining = action.payload;
    },
    blockedCount: (state, action) => {
      state.blockedRemaining = action.payload;
    },
    doneCount: (state, action) => {
      state.doneRemaining = action.payload;
    },
  },
});

export const {
  backlogCount,
  readyCount,
  doingCount,
  reviewCount,
  blockedCount,
  doneCount,
} = projectsSlice.actions;
export default projectsSlice.reducer;
