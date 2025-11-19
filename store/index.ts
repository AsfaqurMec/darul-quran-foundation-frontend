import { configureStore } from '@reduxjs/toolkit';
import activitiesReducer from './slices/activitiesSlice';
import blogsReducer from './slices/blogsSlice';
import noticesReducer from './slices/noticesSlice';
import galleryReducer from './slices/gallerySlice';

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    blogs: blogsReducer,
    notices: noticesReducer,
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

