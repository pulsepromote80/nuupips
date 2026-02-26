import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://agentondemand.ai/api/Course';

// Get all courses
export const getCourses = createAsyncThunk(
    'course/getCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getCourse`);
            return { 
                statusCode: response.data.statusCode || 200, 
                data: response.data.data || response.data,
                message: response.data.message || "Courses fetched successfully"
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to fetch courses" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Get active courses
export const getActiveCourses = createAsyncThunk(
    'course/getActiveCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getActiveCourse`);
            return { 
                statusCode: response.data.statusCode || 200, 
                data: response.data.data || response.data,
                message: response.data.message || "Active courses fetched successfully"
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to fetch active courses" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Add new course
export const addCourse = createAsyncThunk(
    'course/addCourse',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/addCourse`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Course added successfully",
                data: response.data.data
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to add course" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Update course
export const updateCourse = createAsyncThunk(
    'course/updateCourse',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/updateCourse`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Course updated successfully",
                data: response.data.data
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to update course" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Delete course
export const deleteCourse = createAsyncThunk(
    'course/deleteCourse',
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/deleteCourse/${courseId}`);
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Course deleted successfully",
                courseId
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to delete course" 
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
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    }
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        clearCourseError: (state) => {
            state.error = null;
        },
        clearCourseSuccess: (state) => {
            state.success = false;
        },
        setCoursePagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        resetCoursePagination: (state) => {
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
            // Get Courses
            .addCase(getCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                // Update pagination with total items
                const totalItems = action.payload.data?.length || 0;
                state.pagination.totalItems = totalItems;
                state.pagination.totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch courses';
            })
            // Get Active Courses
            .addCase(getActiveCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getActiveCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                // Update pagination with total items
                const totalItems = action.payload.data?.length || 0;
                state.pagination.totalItems = totalItems;
                state.pagination.totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
            })
            .addCase(getActiveCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch active courses';
            })
            // Add Course
            .addCase(addCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data.unshift(action.payload.data);
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to add course';
            })
            // Update Course
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const index = state.data.findIndex(course => course.courseId === action.payload.data.courseId);
                if (index !== -1) {
                    state.data[index] = action.payload.data;
                }
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update course';
            })
            // Delete Course
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(course => course.courseId !== parseInt(action.payload.courseId));
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete course';
            })
    }
});

export const { clearCourseError, clearCourseSuccess, setCoursePagination, resetCoursePagination } = courseSlice.actions;
export default courseSlice.reducer;

