import { combineReducers } from "redux";

import managementReducer from "./management.reducers";
import { ThemeReducer } from "./themeReducer";

const allReducers = combineReducers({
  managementReducer,
  ThemeReducer
});

export default allReducers;