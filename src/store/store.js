import { configureStore } from '@reduxjs/toolkit';
import staffReducer from './slice/staffSlice';
import studentReducer from './slice/studentSlice';
import studentProfileSlice from './slice/studentProfileSlice';
import themeReducer from './slice/themeSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    students: studentReducer,
    staff: staffReducer,
    student: studentProfileSlice
  },
});