import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/user", // Adjust based on your backend API
        credentials: "include", // Include cookies for authentication
    }),
    tagTypes: ["User"], // ✅ Define tag for user-related data
    endpoints: (builder) => ({
        // ✅ Fetch User Profile
        getUserProfile: builder.query({
            query: () => "/profile", // API route to fetch profile details
            providesTags: ["User"], // ✅ Ensures cache consistency for user profile
        }),
    }),
});

export const { useGetUserProfileQuery } = userApi;
