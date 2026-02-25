import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://agentondemand.ai/api/Blog';

// Get all blogs
export const getBlogs = createAsyncThunk(
  'blog/getBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getUserBlog`);
      return { 
        statusCode: response.data.statusCode || 200, 
        data: response.data.data || response.data,
        message: response.data.message || "Blogs fetched successfully"
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response.status, 
          message: error.response.data?.message || "Failed to fetch blogs" 
        });
      }
      return rejectWithValue({ 
        statusCode: 500, 
        message: error.message || "Network error occurred" 
      });
    }
  }
);

// Get user blogs
export const getUserBlog = createAsyncThunk(
  'blog/getUserBlog',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getUserBlog`);
      return { 
        statusCode: response.data.statusCode || 200, 
        data: response.data.data || response.data,
        message: response.data.message || "User blogs fetched successfully"
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response.status, 
          message: error.response.data?.message || "Failed to fetch user blogs" 
        });
      }
      return rejectWithValue({ 
        statusCode: 500, 
        message: error.message || "Network error occurred" 
      });
    }
  }
);

// Add new blog (admin)
export const addBlog = createAsyncThunk(
  'blog/addBlog',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/addBlog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { 
        statusCode: response.data.statusCode || 200, 
        message: response.data.message || "Blog added successfully",
        data: response.data.data
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response.status, 
          message: error.response.data?.message || "Failed to add blog" 
        });
      }
      return rejectWithValue({ 
        statusCode: 500, 
        message: error.message || "Network error occurred" 
      });
    }
  }
);

// Add user blog (with query parameters)
export const addUserBlog = createAsyncThunk(
  'blog/addUserBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const { 
        Tittle, 
        Description, 
        ReadTime, 
        Status, 
        MetaKeyWord, 
        MetaDescription, 
        MetaTitle, 
        Canonical,
        categoryId,
        CreatedBy,
        Image
      } = blogData;

      // If there's an image, use FormData, otherwise use query params
      if (Image) {
        const formData = new FormData();
        formData.append('Tittle', Tittle || '');
        formData.append('Description', Description || '');
        formData.append('ReadTime', ReadTime || '');
        formData.append('Status', Status || 1);
        formData.append('MetaKeyWord', MetaKeyWord || '');
        formData.append('MetaDescription', MetaDescription || '');
        formData.append('MetaTitle', MetaTitle || '');
        formData.append('Canonical', Canonical || '');
        formData.append('categoryId', categoryId || '');
        formData.append('CreatedBy', CreatedBy || '');
        formData.append('Image', Image);

        const response = await axios.post(`${API_URL}/addUserBlog`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return { 
          statusCode: response.data.statusCode || 200, 
          message: response.data.message || "Blog added successfully",
          data: response.data.data
        };
      } else {
        const response = await axios.post(
          `${API_URL}/addUserBlog?Tittle=${encodeURIComponent(Tittle || '')}&Description=${encodeURIComponent(Description || '')}&ReadTime=${encodeURIComponent(ReadTime || '')}&Status=${encodeURIComponent(Status || 1)}&MetaKeyWord=${encodeURIComponent(MetaKeyWord || '')}&MetaDescription=${encodeURIComponent(MetaDescription || '')}&MetaTitle=${encodeURIComponent(MetaTitle || '')}&Canonical=${encodeURIComponent(Canonical || '')}&categoryId=${encodeURIComponent(categoryId || '')}&CreatedBy=${encodeURIComponent(CreatedBy || '')}`
        );
        return { 
          statusCode: response.data.statusCode || 200, 
          message: response.data.message || "Blog added successfully",
          data: response.data.data
        };
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response.status, 
          message: error.response.data?.message || "Failed to add blog" 
        });
      }
      return rejectWithValue({ 
        statusCode: 500, 
        message: error.message || "Network error occurred" 
      });
    }
  }
);


// Update user blog (with query parameters)
export const updateUserBlog = createAsyncThunk(
  'blog/updateUserBlog',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue({ 
          statusCode: 401, 
          message: "Authentication token not found. Please login again." 
        });
      }

      // FormData se values nikaalo
      const blogId = formData.get('BlogId') || '';
      const categoryId = formData.get('CategoryId') || '';
      const tittle = formData.get('Tittle') || '';
      const description = formData.get('Description') || ''; // ✅ सादा टेक्स्ट
      const readTime = formData.get('ReadTime') || '';
      const updatedBy = formData.get('UpdatedBy') || '';
      const status = formData.get('Status') || '1';
      const metaKeyWord = formData.get('MetaKeyWord') || '';
      const metaDescription = formData.get('MetaDescription') || '';
      const metaTitle = formData.get('MetaTitle') || '';
      const canonical = formData.get('Canonical') || '';

      // URL build karo
      let url = `${API_URL}/updateUserBlog?`;
      url += `BlogId=${encodeURIComponent(blogId)}`;
      url += `&CategoryId=${encodeURIComponent(categoryId)}`;
      url += `&Tittle=${encodeURIComponent(tittle)}`;
      url += `&Description=${encodeURIComponent(description)}`; 
      url += `&ReadTime=${encodeURIComponent(readTime)}`;
      url += `&UpdatedBy=${encodeURIComponent(updatedBy)}`;
      url += `&Status=${encodeURIComponent(status)}`;
      url += `&MetaKeyWord=${encodeURIComponent(metaKeyWord)}`;
      url += `&MetaDescription=${encodeURIComponent(metaDescription)}`;
      url += `&MetaTitle=${encodeURIComponent(metaTitle)}`;
      url += `&Canonical=${encodeURIComponent(canonical)}`;

      console.log('Final URL:', url);
      console.log('Payload Description (plain text):', description);

      // Headers
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.post(url, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { 
        statusCode: response.data.statusCode || 200, 
        message: response?.data?.message || "Blog updated successfully",
        data: response.data.data
      };
      
    } catch (error) {
      console.error('Update blog error:', error);
      
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response?.status, 
          message: error.response.data?.message || "Failed to update blog" 
        });
      }
      return rejectWithValue({ 
        statusCode: 500, 
        message: error.message || "Network error occurred" 
      });
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/updateBlog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { 
        statusCode: response.data.statusCode || 200, 
        message: response.data.message || "Blog updated successfully",
        data: response.data.data
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response.status, 
          message: error.response.data?.message || "Failed to update blog" 
        });
      }
      return rejectWithValue({ 
        statusCode: 500, 
        message: error.message || "Network error occurred" 
      });
    }
  }
);


// Get Contact Us data
export const getContactUs = createAsyncThunk(
  'blog/getContactUs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getContactUs`);
      return { 
        statusCode: response.data.statusCode || 200, 
        data: response.data.data || response.data,
        message: response.data.message || "Contact us data fetched successfully"
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ 
          statusCode: error.response.status, 
          message: error.response.data?.message || "Failed to fetch contact us data" 
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
  success: false
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearBlogSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Blogs
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch blogs';
      })
      // Get User Blogs
      .addCase(getUserBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getUserBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user blogs';
      })
      // Add Blog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data.unshift(action.payload.data);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add blog';
      })
      // Add User Blog
      .addCase(addUserBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addUserBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data.unshift(action.payload.data);
      })
      .addCase(addUserBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add blog';
      })
      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.data.findIndex(blog => blog.id === action.payload.data.id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update blog';
      })
      // Update User Blog
      .addCase(updateUserBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // .addCase(updateUserBlog.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.success = true;
      //   const index = state.data.findIndex(blog => blog.blogId === action.payload.data.blogId);
      //   if (index !== -1) {
      //     state.data[index] = action.payload.data;
      //   }
      // })
      .addCase(updateUserBlog.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  
})
      .addCase(updateUserBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update blog';
      })
      // Get Contact Us
      .addCase(getContactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.contactUsData = action.payload.data;
      })
      .addCase(getContactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch contact us data';
      });
  }
});

export const { clearBlogError, clearBlogSuccess } = blogSlice.actions;
export default blogSlice.reducer;
