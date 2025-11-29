import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as activityQueries from '../../services/activities';
import { Activity } from '../../services/activities';
import * as activityMutations from '../../services/activities/mutations';

interface ActivitiesState {
  items: Activity[];
  loading: boolean;
  error: string | null;
  currentItem: Activity | null;
}

const initialState: ActivitiesState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
};

// Async thunks
export const fetchActivities = createAsyncThunk(
  'activities/fetchAll',
  async (_, { rejectWithValue }) => {
    const response = await activityQueries.getAllActivities();
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data : [response.data];
    }
    return rejectWithValue(response.message || 'Failed to fetch activities');
  }
);

export const fetchActivityById = createAsyncThunk(
  'activities/fetchById',
  async (id: string, { rejectWithValue }) => {
    const response = await activityQueries.getActivityById(id);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to fetch activity');
  }
);

export const createActivity = createAsyncThunk(
  'activities/create',
  async (activityData: Omit<Activity, 'id'>, { rejectWithValue }) => {
    const response = await activityMutations.createActivity(activityData);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to create activity');
  }
);

export const updateActivity = createAsyncThunk(
  'activities/update',
  async ({ id, data }: { id: string; data: Partial<Activity> }, { rejectWithValue }) => {
    const response = await activityMutations.updateActivity(id, data);
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data[0] : response.data;
    }
    return rejectWithValue(response.message || 'Failed to update activity');
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/delete',
  async (id: string, { rejectWithValue }) => {
    const response = await activityMutations.deleteActivity(id);
    if (response.success) {
      return id;
    }
    return rejectWithValue(response.message || 'Failed to delete activity');
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentItem: (state, action: PayloadAction<Activity | null>) => {
      state.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch by ID
      .addCase(fetchActivityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentItem } = activitiesSlice.actions;
export default activitiesSlice.reducer;

