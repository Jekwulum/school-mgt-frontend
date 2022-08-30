import { configureStore } from '@reduxjs/toolkit';
import staffReducer from './slice/staffSlice';
import studentReducer from './slice/studentSlice';
import themeReducer from './slice/themeSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    students: studentReducer,
    staff: staffReducer
  },
});