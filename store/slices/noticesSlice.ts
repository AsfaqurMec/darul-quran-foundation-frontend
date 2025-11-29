import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as noticesApi from '../../services/notices';
import { Notice } from '../../services/notices';

interface NoticesState {
  items: Notice[];
  loading: boolean;
  error: string | null;
  currentItem: Notice | null;
}

const initialState: NoticesState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
};

// Async thunks
export const fetchNotices = createAsyncThunk(
  'notices/fetchAll',
  async (_, { rejectWithValue }) => {
    const response = await noticesApi.getAllNotices();
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data : [response.data];
    }
    return rejectWithValue(response.message || 'Failed to fetch notices');
  }
);

export const fetchNoticeById = createAsyncThunk(
  'notices/fetchById',
  async (id: string, { rejectWithValue }) => {
    const response = await noticesApi.getNoticeById(id);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to fetch notice');
  }
);

export const createNotice = createAsyncThunk(
  'notices/create',
  async (noticeData: Omit<Notice, 'id'>, { rejectWithValue }) => {
    const response = await noticesApi.createNotice(noticeData);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to create notice');
  }
);

export const updateNotice = createAsyncThunk(
  'notices/update',
  async ({ id, data }: { id: string; data: Partial<Notice> }, { rejectWithValue }) => {
    const response = await noticesApi.updateNotice(id, data);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to update notice');
  }
);

export const deleteNotice = createAsyncThunk(
  'notices/delete',
  async (id: string, { rejectWithValue }) => {
    const response = await noticesApi.deleteNotice(id);
    if (response.success) {
      return id;
    }
    return rejectWithValue(response.message || 'Failed to delete notice');
  }
);

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentItem: (state, action: PayloadAction<Notice | null>) => {
      state.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchNoticeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentItem } = noticesSlice.actions;
export default noticesSlice.reducer;

