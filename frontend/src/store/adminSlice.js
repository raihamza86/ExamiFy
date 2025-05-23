import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/admin", // Adjust based on your backend API
        credentials: "include", // Include authentication cookies
    }),
    tagTypes: ["User", "Quiz", "Paper"], // ✅ Define tags for users, quizzes, and past papers
    endpoints: (builder) => ({
        // ✅ Fetch All Users
        getAllUsers: builder.query({
            query: () => "/users",
            providesTags: ["User"], // ✅ Provides cache updates when user data changes
        }),

        // ✅ Update User Role
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: { role }, // Send new role in request body
            }),
            invalidatesTags: ["User"], // ✅ Invalidate user cache after update
        }),


        // ✅ Delete a User
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"], // ✅ Invalidate user cache after deletion
        }),

        // ✅ Fetch All Quizzes
        getAllQuizzes: builder.query({
            query: () => "/quizzes",
            providesTags: ["Quiz"], // ✅ Provides cache updates when quiz data changes
        }),

        // ✅ Delete a Quiz
        deleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `/quizzes/${quizId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Quiz"], // ✅ Invalidate quiz cache after deletion
        }),

        // ✅ Fetch All Past Papers
        getAllPapers: builder.query({
            query: () => "/papers",
            providesTags: ["Paper"], // ✅ Provides cache updates when paper data changes
        }),

        // ✅ Delete a Past Paper
        deletePaper: builder.mutation({
            query: (paperId) => ({
                url: `/papers/${paperId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Paper"], // ✅ Invalidate past paper cache after deletion
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,
    useGetAllQuizzesQuery,
    useDeleteQuizMutation,
    useGetAllPapersQuery,
    useDeletePaperMutation,
} = adminApi;
