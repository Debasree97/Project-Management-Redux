import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInTitle: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    titleFilter: (state, action) => {
      state.searchInTitle = action.payload;
    },
  },
});

// eslint-disable-next-line no-empty-pattern
export const { titleFilter } = filterSlice.actions;
export default filterSlice.reducer;
