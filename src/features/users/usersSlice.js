import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiver: undefined,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = usersSlice.actions;
export default usersSlice.reducer;
