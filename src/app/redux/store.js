import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        blog: blogReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;

