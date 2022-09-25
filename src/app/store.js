import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import usersSliceReducer from "../features/users/usersSlice";
import teamsSliceReducer from "../features/teams/teamsSlice";
import projectsSliceReducer from "../features/projects/projectsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    users: usersSliceReducer,
    teams:teamsSliceReducer,
    projects:projectsSliceReducer
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
