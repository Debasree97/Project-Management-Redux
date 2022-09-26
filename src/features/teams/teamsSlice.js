import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditMembers: false,
  id: 0,
};
const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    isEdit: (state, action) => {
      state.isEditMembers = action.payload.isEditMember;
      state.id = action.payload.id;
    },
  },
});


export const { isEdit } = teamsSlice.actions;
export default teamsSlice.reducer;
