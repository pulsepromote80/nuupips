import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://agentondemand.ai/api';

// Get all course categories
export const getCourseCategory = createAsyncThunk(
    'courseCategory/getCourseCategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/Course/getCourseCategory`);
            return { 
                statusCode: response.data.statusCode || 200, 
                data: response.data.data || response.data,
                message: response.data.message || "Course categories fetched successfully"
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to fetch course categories" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Add or Update course category
export const addorUpdateCourseCategory = createAsyncThunk(
    'courseCategory/addorUpdateCourseCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/Course/addUpdateCourseCategory`, categoryData);
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Course category processed successfully",
                data: response.data.data
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to process course category" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Delete course category
export const deleteCourseCategory = createAsyncThunk(
    'courseCategory/deleteCourseCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/deleteCourseCategory/${categoryId}`);
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Course category deleted successfully",
                categoryId
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to delete course category" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

export const getActiveCourse = createAsyncThunk(
    'courseCategory/getActiveCourse',
    async (courseCategoryId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/Course/getActiveCourse`,
                { courseCategoryId } // Send in request body
            );
            console.log("TTTT",response)
            return response.data; // Return the full response data
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to get active courses" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);
const initialState = {
    data: [],
    loading: false,
    error: null,
    success: false,
    CourseData:null,
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    }
};

const courseCategorySlice = createSlice({
    name: 'courseCategory',
    initialState,
    reducers: {
        clearCourseCategoryError: (state) => {
            state.error = null;
        },
        clearCourseCategorySuccess: (state) => {
            state.success = false;
        },
        setCourseCategoryPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        resetCourseCategoryPagination: (state) => {
            state.pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 0,
                totalPages: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Course Categories
            .addCase(getCourseCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourseCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data || [];
                // Update pagination with total items
                const totalItems = action.payload.data?.length || 0;
                state.pagination.totalItems = totalItems;
                state.pagination.totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
            })
            .addCase(getCourseCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch course categories';
            })
            // Add or Update Course Category
            .addCase(addorUpdateCourseCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addorUpdateCourseCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                // If it's an update (has id), update the existing item, otherwise add new
                if (action.payload.data && action.payload.data.id) {
                    const index = state.data.findIndex(cat => cat.id === action.payload.data.id);
                    if (index !== -1) {
                        state.data[index] = action.payload.data;
                    } else {
                        state.data.unshift(action.payload.data);
                    }
                } else {
                    state.data.unshift(action.payload.data);
                }
            })
            .addCase(addorUpdateCourseCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to process course category';
            })
            // Delete Course Category
            .addCase(deleteCourseCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourseCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(category => category.id !== parseInt(action.payload.categoryId));
            })
            .addCase(deleteCourseCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete course category';
            })

           .addCase(getActiveCourse.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(getActiveCourse.fulfilled, (state, action) => {
    state.loading = false;
    state.CourseData = action.payload?.data || []; // Store the data array
})
.addCase(getActiveCourse.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || 'Failed to fetch courses';
    state.CourseData = []; 
});
    }
});

export const { clearCourseCategoryError, clearCourseCategorySuccess, setCourseCategoryPagination, resetCourseCategoryPagination } = courseCategorySlice.actions;
export default courseCategorySlice.reducer;

