import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Loading } from "../../utils/helpers/constants";
import ManagementService from "../../utils/services/management.services";


const initialState = {
  students: [],
  loadingStudents: "",
  error: null
};

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const { data: responseData } = await ManagementService.getStudents();
  return responseData.data;
});

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchStudents.pending, (state, action) => {
        state.loadingStudents = Loading.FETCHING
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loadingStudents = Loading.SUCCESS
        state.students = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loadingStudents = Loading.FAILED
        state.error = action.error.message
      })
  },
});

export default studentSlice.reducer;