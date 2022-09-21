import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Loading } from "../../utils/helpers/constants";
import ManagementService from "../../utils/services/management.services";


const initialState = {
  staff: {},
  loadingStaff: "",
  error: null
};

export const fetchStaff = createAsyncThunk('student/fetchStudent', async (id) => {
  const { data: responseData } = await ManagementService.getStaff(id);
  return responseData.data;
});

export const staffProfileSlice = createSlice({
  name: 'staff',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchStaff.pending, (state, action) => {
        state.loadingStaff = Loading.FETCHING
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loadingStaff = Loading.SUCCESS
        state.staff = action.payload
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loadingStaff = Loading.FAILED
        state.error = action.error.message
      })
  },
});

export default staffProfileSlice.reducer;
