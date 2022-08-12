import { createSlice } from "@reduxjs/toolkit";
// import * as Constants from "../constants/management.constants";
import { Loading } from "../../utils/helpers/constants";
import ManagementService from "../../utils/services/management.services";

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    loadingStudents: ""
  },
  reducers: {
    fetchStudents: async (state) => {
      try {
        const { data: responseData } = await ManagementService.getStudents();
        if (responseData) {
          console.log(responseData.data, "ooooo")
          state =  { ...state, students: responseData.data, loadingStudents: Loading.SUCCESS }
        }
        else if (responseData === undefined) {
          return { ...state, loadingStudents: Loading.FAILED }
        }
        else {
          return { ...state, loadingStudents: Loading.FAILED }
        }
      } catch (error) {
        console.log('errorrr', error)
      }
    }
  }
});

export const { fetchStudents } = studentSlice.actions;

export default studentSlice.reducer;