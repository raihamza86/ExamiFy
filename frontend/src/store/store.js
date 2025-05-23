import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authSlice";
import { quizApi } from "./quizSlice";
import { pastPaperApi } from "./pastPaperSlice";
import { adminApi } from "./adminSlice";
import { userApi } from "./userSlice";
import { blogApi } from "./blogSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
        [pastPaperApi.reducerPath]: pastPaperApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, quizApi.middleware, pastPaperApi.middleware, adminApi.middleware, userApi.middleware, blogApi.middleware),
});

export default store;
