import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Loading } from "../../utils/helpers/constants";
import ManagementService from "../../utils/services/management.services";


const initialState = {
  student: {},
  loadingStudent: "",
  error: null
};

export const fetchStudent = createAsyncThunk('student/fetchStudent', async (id) => {
  const { data: responseData } = await ManagementService.getStudent(id);
  return responseData.data;
});

export const studentProfileSlice = createSlice({
  name: 'student',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchStudent.pending, (state, action) => {
        state.loadingStudent = Loading.FETCHING
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.loadingStudent = Loading.SUCCESS
        state.student = action.payload
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.loadingStudent = Loading.FAILED
        state.error = action.error.message
      })
  },
});

export default studentProfileSlice.reducer;
