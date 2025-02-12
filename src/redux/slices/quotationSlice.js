import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/config/axiosInstance";

// Async thunks for all CRUD operations
export const createQuotation = createAsyncThunk(
  "quotation/create",
  async (quotationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/quotation", quotationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllQuotations = createAsyncThunk(
  "quotation/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/quotation");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuotation = createAsyncThunk(
  "quotation/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/quotation/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuotation = createAsyncThunk(
  "quotation/update",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/quotation/${id}`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuotation = createAsyncThunk(
  "quotation/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/quotation/${id}`);
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const quotationSlice = createSlice({
  name: "quotation",
  initialState: {
    isLoading: false,
    error: null,
    quotations: [],
    selectedQuotation: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedQuotation: (state) => {
      state.selectedQuotation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create quotation cases
      .addCase(createQuotation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotations.push(action.payload.data);
      })
      .addCase(createQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      })

      // Get all quotations cases
      .addCase(getAllQuotations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllQuotations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotations = action.payload.data;
      })
      .addCase(getAllQuotations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      })

      // Get single quotation cases
      .addCase(getQuotation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedQuotation = action.payload.data;
      })
      .addCase(getQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      })

      // Update quotation cases
      .addCase(updateQuotation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedQuotation = action.payload.data;
        state.quotations = state.quotations.map((quotation) =>
          quotation._id === updatedQuotation._id ? updatedQuotation : quotation
        );
        if (state.selectedQuotation?._id === updatedQuotation._id) {
          state.selectedQuotation = updatedQuotation;
        }
      })
      .addCase(updateQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      })

      // Delete quotation cases
      .addCase(deleteQuotation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotations = state.quotations.filter(
          (quotation) => quotation._id !== action.payload.id
        );
        if (state.selectedQuotation?._id === action.payload.id) {
          state.selectedQuotation = null;
        }
      })
      .addCase(deleteQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong";
      });
  },
});

export const { clearError, clearSelectedQuotation } = quotationSlice.actions;
export default quotationSlice.reducer; 