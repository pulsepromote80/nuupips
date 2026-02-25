import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://agentondemand.ai/api/Blog';

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getCategory`);
            return { 
                statusCode: response.data.statusCode || 200, 
                data: response.data.data || response.data,
                message: response.data.message || "Categories fetched successfully"
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to fetch categories" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Add new category
export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/addCategory`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Category added successfully",
                data: response.data.data
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to add category" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Update category
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/updateCategory`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Category updated successfully",
                data: response.data.data
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to update category" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Delete category
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/deleteCategory/${categoryId}`);
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Category deleted successfully",
                categoryId
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to delete category" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

// Add or Update category (new API)
export const addorUpdateCategory = createAsyncThunk(
    'category/addorUpdateCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/addorUpdateCategory`, categoryData);
            return { 
                statusCode: response.data.statusCode || 200, 
                message: response.data.message || "Category saved successfully",
                data: response.data.data
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to save category" 
                });
            }
            return rejectWithValue({ 
                statusCode: 500, 
                message: error.message || "Network error occurred" 
            });
        }
    }
);

export const getComments = createAsyncThunk(
    'category/getComments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getAllComments`);
            return { 
                statusCode: response.data.statusCode || 200, 
                data: response.data.data || response.data,
                message: response.data.message || "Categories fetched successfully"
            };
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ 
                    statusCode: error.response.status, 
                    message: error.response.data?.message || "Failed to fetch categories" 
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
    commentsData:null,
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    }
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearCategoryError: (state) => {
            state.error = null;
        },
        clearCategorySuccess: (state) => {
            state.success = false;
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        resetPagination: (state) => {
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
            // Get Category
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                // Update pagination with total items
                const totalItems = action.payload.data?.length || 0;
                state.pagination.totalItems = totalItems;
                state.pagination.totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch categories';
            })
            // Add Category
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to add category';
            })
            // Update Category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update category';
            })
            // Delete Category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(cat => cat.categoryId !== parseInt(action.payload.categoryId));
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete category';
            })
            // Add or Update Category
            .addCase(addorUpdateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addorUpdateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addorUpdateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to save category';
            })
             .addCase(getComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsData = action.payload.data;
                // Update pagination with total items
                const totalItems = action.payload.data?.length || 0;
                state.pagination.totalItems = totalItems;
                state.pagination.totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch categories';
            })
    }
});

export const { clearCategoryError, clearCategorySuccess, setPagination, resetPagination } = categorySlice.actions;
export default categorySlice.reducer;

