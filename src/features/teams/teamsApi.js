import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  tagTypes: ["Teams"],
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?assigned_like=${email}`,
      providesTags: ["Teams"],
    }),

    getTeam: builder.query({
      query: (id) => `/teams/${id}`,
    }),

    addTeam: builder.mutation({
      query: ({ user, data }) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const teams = await queryFulfilled;

        // update teams cache pessimistically start
        teams?.data?.id &&
          dispatch(
            apiSlice.util.updateQueryData("getTeams", arg.user, (draft) => {
              draft.push(teams.data);
            })
          );
        // update teams cache pessimistically end
      },
    }),

    editTeam: builder.mutation({
      query: ({ id, data, user }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTeams", arg.user, (draft) => {
            const draftTeam = draft.find((c) => c.id == arg.id);
            draftTeam.members = arg.data.members;
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

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const {
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
  useGetTeamsQuery,
  useGetTeamQuery,
  editTeam,
} = teamsApi;
