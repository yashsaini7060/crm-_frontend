import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../config/axiosInstance";

// Async thunk for fetching salesperson names
export const fetchSalesPersons = createAsyncThunk(
  'dropDown/fetchSalesPersons',
  async () => {
    const response = await axiosInstance.get('/constants/users'); // Adjust the endpoint as needed
    return response.data;
  }
);

const dropDownSlice = createSlice({
  name: 'dropDown',
  initialState: {
    salesPersons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesPersons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.salesPersons = action.payload;
      })
      .addCase(fetchSalesPersons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dropDownSlice.reducer;
