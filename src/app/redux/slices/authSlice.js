import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint for admin login
const API_URL = 'https://agentondemand.ai/api/Blog/adminLogin';

// Create async thunk for admin login
export const adminLogin = createAsyncThunk(
    'auth/adminLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, credentials);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Network error occurred' });
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data?.user || action.payload.data;
                state.token = action.payload.data?.token || action.payload.data?.accessToken;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

