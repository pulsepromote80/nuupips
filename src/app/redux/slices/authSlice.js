import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint for admin login
const API_URL = 'https://agentondemand.ai/api/Blog/adminLogin';
const GET_ALL_REGISTRATION="https://agentondemand.ai/api/Authentication/GetAllUserRegistration"
const GET_ADMIN_DASHBOARD_DETAILS = 'https://agentondemand.ai/api/Authentication/getAdminDashboardDetails'

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

export const getAllRegistration = createAsyncThunk(
    'auth/getAllRegistration',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(GET_ALL_REGISTRATION);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'Network error occurred' });
        }
    }
);

export const getAdminDashboardDetails = createAsyncThunk(
    'auth/getAdminDashboardDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(GET_ADMIN_DASHBOARD_DETAILS);
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
    UserData: null,
    dashboardData: null
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
            })
            .addCase(getAllRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.UserData = action.payload.data;
            })
            .addCase(getAllRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch blogs';
            })
            .addCase(getAdminDashboardDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminDashboardDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardData = action.payload.data;
            })
            .addCase(getAdminDashboardDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch dashboard details';
            })
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

