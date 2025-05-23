import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pastPaperApi = createApi({
    reducerPath: "pastPaperApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/papers", // Backend API base URL
        credentials: "include", // Include cookies for authentication
    }),
    tagTypes: ["Paper"], // ✅ Add tag for automatic cache updates
    endpoints: (builder) => ({
        // ✅ Upload a Past Paper
        uploadPaper: builder.mutation({
            query: (formData) => ({
                url: "/upload",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Paper"], // ✅ Invalidate cache to refetch papers
        }),

        // ✅ Fetch All Past Papers
        getPapers: builder.query({
            query: () => "/",
            providesTags: ["Paper"], // ✅ Attach tag to fetched papers
        }),

        // ✅ Fetch Single Past Paper by ID
        getPaperById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Paper", id }], // ✅ Attach a unique tag per paper
        }),

        // ✅ Edit (Update) a Past Paper
        updatePaper: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Paper", id }, "Paper"], // ✅ Invalidate the updated paper and refetch all
        }),

        // ✅ Delete a Past Paper
        deletePaper: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Paper", id }, "Paper"], // ✅ Remove the deleted paper and refetch
        }),
    }),
});

export const {
    useUploadPaperMutation,
    useGetPapersQuery,
    useGetPaperByIdQuery,
    useUpdatePaperMutation,
    useDeletePaperMutation,
} = pastPaperApi;
