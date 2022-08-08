import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
    lightTheme: { color: "#fff", bgColor: "#2C3891" },
    darkTheme: { color: "#FFFFFF66", bgColor: "#24243E" }
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;