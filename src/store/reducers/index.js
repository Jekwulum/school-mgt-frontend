import { combineReducers } from "redux";

import managementReducer from "./management.reducers";

const allReducers = combineReducers({
  managementReducer
});

export default allReducers;