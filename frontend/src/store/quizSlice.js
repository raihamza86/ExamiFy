import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/quizzes", // Backend API base URL
        credentials: "include", // Include cookies for authentication
    }),
    tagTypes: ["Quiz"], // ✅ Define tag for quizzes
    endpoints: (builder) => ({
        // ✅ Create a Quiz
        createQuiz: builder.mutation({
            query: (quizData) => ({
                url: "/create",
                method: "POST",
                body: quizData,
            }),
            invalidatesTags: ["Quiz"], // ✅ Invalidate cache after quiz creation
        }),

        // ✅ Upload PDF to Create Quiz
        uploadQuizPdf: builder.mutation({
            query: (formData) => ({
                url: "/upload-pdf",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Quiz"],
        }),

        // ✅ Fetch All Quizzes
        getQuizzes: builder.query({
            query: () => "/",
            providesTags: ["Quiz"], // ✅ Provides cache updates when fetching quizzes
        }),

        // ✅ Fetch Single Quiz by ID
        getQuizById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Quiz"], // ✅ Ensures cache consistency for individual quizzes
        }),

        // ✅ Submit a Quiz
        submitQuiz: builder.mutation({
            query: ({ quizId, answers }) => ({
                url: `/${quizId}/submit`,
                method: "POST",
                body: { answers },
            }),
            invalidatesTags: ["Quiz"], // ✅ Invalidate cache after quiz submission
        }),

        // ✅ Update (Edit) a Quiz
        updateQuiz: builder.mutation({
            query: ({ quizId, quizData }) => ({
                url: `/${quizId}`,
                method: "PUT",
                body: quizData,
            }),
            invalidatesTags: ["Quiz"], // ✅ Refresh quiz list after update
        }),

        // ✅ Delete a Quiz
        deleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `/${quizId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Quiz"], // ✅ Refresh quiz list after deletion
        }),

    }),
});

export const {
    useCreateQuizMutation,
    useUploadQuizPdfMutation,
    useGetQuizzesQuery,
    useGetQuizByIdQuery,
    useSubmitQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation
} = quizApi;
