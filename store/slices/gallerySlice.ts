import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as galleryApi from '../../services/gallery';
import { GalleryItem } from '../../services/gallery';

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  currentItem: GalleryItem | null;
}

const initialState: GalleryState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
};

// Async thunks
export const fetchGalleryItems = createAsyncThunk(
  'gallery/fetchAll',
  async (_, { rejectWithValue }) => {
    const response = await galleryApi.getAllGalleryItems();
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data : [response.data];
    }
    return rejectWithValue(response.message || 'Failed to fetch gallery items');
  }
);

export const fetchGalleryItemById = createAsyncThunk(
  'gallery/fetchById',
  async (id: string, { rejectWithValue }) => {
    const response = await galleryApi.getGalleryItemById(id);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to fetch gallery item');
  }
);

export const createGalleryItem = createAsyncThunk(
  'gallery/create',
  async (galleryData: Omit<GalleryItem, 'id'>, { rejectWithValue }) => {
    const response = await galleryApi.createGalleryItem(galleryData);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to create gallery item');
  }
);

export const updateGalleryItem = createAsyncThunk(
  'gallery/update',
  async ({ id, data }: { id: string; data: Partial<GalleryItem> }, { rejectWithValue }) => {
    const response = await galleryApi.updateGalleryItem(id, data);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to update gallery item');
  }
);

export const deleteGalleryItem = createAsyncThunk(
  'gallery/delete',
  async (id: string, { rejectWithValue }) => {
    const response = await galleryApi.deleteGalleryItem(id);
    if (response.success) {
      return id;
    }
    return rejectWithValue(response.message || 'Failed to delete gallery item');
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentItem: (state, action: PayloadAction<GalleryItem | null>) => {
      state.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchGalleryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchGalleryItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchGalleryItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGalleryItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGalleryItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentItem } = gallerySlice.actions;
export default gallerySlice.reducer;

