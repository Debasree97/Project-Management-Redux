import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (email) => `/projects?assigned_like=${email}`,
      providesTags: ["Projects"],
    }),

    getProject: builder.query({
      query: (id) => `/projects/${id}`,
    }),

    addProject: builder.mutation({
      query: ({ user, data }) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const projects = await queryFulfilled;

        // update projects cache pessimistically start
        projects?.data?.id &&
          dispatch(
            apiSlice.util.updateQueryData("getProjects", arg.user, (draft) => {
              draft.push(projects.data);
            })
          );
        // update projects cache pessimistically end
      },
    }),

    editProject: builder.mutation({
      query: ({ id, data, user }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", arg.user, (draft) => {
            const draftProject = draft.find((c) => c.id == arg.id);
            // draftTeam.members = arg.data.members;
          })
        );
        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
} = projectsApi;
