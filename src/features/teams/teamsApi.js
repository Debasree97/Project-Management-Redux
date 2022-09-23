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

        if (teams?.data?.id) {
          // silent entry to message table
          //   const users = arg.data.users;
          //   const senderUser = users.find((user) => user.email === arg.sender);
          //   const receiverUser = users.find((user) => user.email !== arg.sender);

          //   dispatch(
          //     messagesApi.endpoints.addMessage.initiate({
          //       conversationId: conversation?.data?.id,
          //       sender: senderUser,
          //       receiver: receiverUser,
          //       message: arg.data.message,
          //       timestamp: arg.data.timestamp,
          //     })
          //   );

          // update teams cache pessimistically start
          teams?.data?.id &&
            dispatch(
              apiSlice.util.updateQueryData("getTeams", arg.user, (draft) => {
                draft.push(teams.data);
              })
            );
          // update teams cache pessimistically end
        }
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
          const team = await queryFulfilled;
          // if (conversation?.data?.id) {
          //   // silent entry to message table
          //   const users = arg.data.users;
          //   const senderUser = users.find((user) => user.email === arg.sender);
          //   const receiverUser = users.find(
          //     (user) => user.email !== arg.sender
          //   );

          //   const res = await dispatch(
          //     messagesApi.endpoints.addMessage.initiate({
          //       conversationId: conversation?.data?.id,
          //       sender: senderUser,
          //       receiver: receiverUser,
          //       message: arg.data.message,
          //       timestamp: arg.data.timestamp,
          //     })
          //   ).unwrap();

          //   // update messages cache pessimistically start
          //   dispatch(
          //     apiSlice.util.updateQueryData(
          //       "getMessages",
          //       res.conversationId.toString(),
          //       (draft) => {
          //         console.log(JSON.stringify(draft));
          //         draft.data.push(res);
          //       }
          //     )
          //   );
          //   // update messages cache pessimistically end
          // }
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
