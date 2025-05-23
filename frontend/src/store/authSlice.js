import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Setup API with credentials support
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/auth", // Change to your backend URL
        credentials: "include", // ✅ Sends cookies with requests
    }),
    tagTypes: ["User"], // ✅ Define User tag for authentication-related actions
    endpoints: (builder) => ({
        // ✅ Register User
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"], // ✅ Invalidate user cache after registration
        }),

        // ✅ Login User
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User"], // ✅ Invalidate user cache after login
        }),

        // ✅ Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"], // ✅ Clear user cache after logout
        }),

    }),
});

// ✅ Export Hooks
export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = authApi;

// ✅ Add API Reducer in Store
export default authApi;
