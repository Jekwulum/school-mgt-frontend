import * as Constants from "../constants/management.constants";
import { Loading } from "../../utils/helpers/constants";

const initialState = {
  staff: [],
  students: [],
  loadingStaff: "",
  loadingStudents: ""
};

const managementReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.FETCH_STAFF_REQUEST:
      return { ...state, loadingStaff: Loading.FETCHING };

    case Constants.FETCH_STUDENTS_REQUEST:
      return { ...state, loadingStudents: Loading.FETCHING };

    case Constants.FETCH_STUDENTS_SUCCESS:
      return { ...state, loadingStudents: Loading.SUCCESS, students: action.payload };

    case Constants.FETCH_STUDENTS_FAILURE:
      return { ...state, loadingStudents: Loading.ERROR };
    
    default:
      return state;
  }
};

export default managementReducer;