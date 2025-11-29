import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as blogsApi from '../../services/blogs/api';
import { Blog } from '../../services/blogs/api';

interface BlogsState {
  items: Blog[];
  loading: boolean;
  error: string | null;
  currentItem: Blog | null;
}

const initialState: BlogsState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
};

// Async thunks
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, { rejectWithValue }) => {
    const response = await blogsApi.getAllBlogs();
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data : [response.data];
    }
    return rejectWithValue(response.message || 'Failed to fetch blogs');
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchById',
  async (id: string, { rejectWithValue }) => {
    const response = await blogsApi.getBlogById(id);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to fetch blog');
  }
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData: Omit<Blog, 'id'>, { rejectWithValue }) => {
    const response = await blogsApi.createBlog(blogData);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to create blog');
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, data }: { id: string; data: Partial<Blog> }, { rejectWithValue }) => {
    const response = await blogsApi.updateBlog(id, data);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to update blog');
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id: string, { rejectWithValue }) => {
    const response = await blogsApi.deleteBlog(id);
    if (response.success) {
      return id;
    }
    return rejectWithValue(response.message || 'Failed to delete blog');
  }
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentItem: (state, action: PayloadAction<Blog | null>) => {
      state.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentItem } = blogsSlice.actions;
export default blogsSlice.reducer;

