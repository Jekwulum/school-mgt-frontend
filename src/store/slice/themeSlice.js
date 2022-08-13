import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
    lightTheme: {
      color: "#fff", bgColor: "#2C3891",
      bodyColor: "#D0D0E2", textColor: "#000"
    },
    darkTheme: {
      color: "#FFFFFFE6", bgColor: "#0E0E23",
      bodyColor: "#24243E", textColor: "#FFFFFFE6"
    }
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;