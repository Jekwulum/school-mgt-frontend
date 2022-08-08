
const initialState = {
  darkMode: false,
  lightTheme: { color: "#fff", bgColor: "#2C3891" },
  darkTheme: { color: "#FFFFFF66", bgColor: "#24243E" }
};

export const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};