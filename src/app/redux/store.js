import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import blogReducer from './slices/blogSlice';
import courseReducer from './slices/courseSlice';
import courseCategoryReducer from './slices/courseCategorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        blog: blogReducer,
        course: courseReducer,
        courseCategory: courseCategoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;

