import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Loading } from "../../utils/helpers/constants";
import ManagementService from "../../utils/services/management.services";

const initialState = {
  staff: [],
  loadingStaff: "",
  error: null
};

export const fetchAllStaff = createAsyncThunk('staff/fetchStaff', async () => {
  const { data: responseData } = await ManagementService.getAllStaff();
  return responseData.data;
});

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchAllStaff.pending, (state, action) => {
        state.loadingStaff = Loading.FETCHING
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.loadingStaff = Loading.SUCCESS
        state.staff = action.payload
      })
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.loadingStaff = Loading.FAILED
        state.error = action.error.message
      })
  },
});

export default staffSlice.reducer;