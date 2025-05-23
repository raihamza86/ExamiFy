import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/blogs", // Adjust based on your backend API
        credentials: "include", // Include authentication cookies if needed
    }),
    tagTypes: ["Blog"], // Tag for blogs to manage cache updates
    endpoints: (builder) => ({
        // ✅ Get all blogs
        getAllBlogs: builder.query({
            query: () => "/",
            providesTags: ["Blog"], // Provides cache updates when blog data changes
        }),

        // ✅ Get a single blog by ID
        getBlogById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Blog"], // Provides cache updates when a blog is fetched
        }),

        // ✅ Create a new blog
        createBlog: builder.mutation({
            query: (newBlog) => ({
                url: "/",
                method: "POST",
                body: newBlog, // Sends the new blog data in the request body
            }),
            invalidatesTags: ["Blog"], // Invalidate cache for blogs after creating
        }),

        // ✅ Update an existing blog
        updateBlog: builder.mutation({
            query: ({ id, updatedBlog }) => ({
                url: `/${id}`,
                method: "PUT",
                body: updatedBlog, // Sends the updated blog data
            }),
            invalidatesTags: ["Blog"], // Invalidate cache for blogs after update
        }),

        // ✅ Delete a blog
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"], // Invalidate cache for blogs after deletion
        }),
    }),
});

export const {
    useGetAllBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
