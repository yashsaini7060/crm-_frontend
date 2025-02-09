import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  clientData: JSON.parse(localStorage.getItem('clientData')) || [],
  selectedClient: null,
}

export const getAllClients = createAsyncThunk("/client/get", async () => {
  try {
    const response = axiosInstance.get("/clients");
    toast.promise(response, {
      loading: "loading client data...",
      success: "Clients loaded successfully",
      error: "Failed to get the clients",
    });

    const data = (await response).data?.data;
    localStorage.setItem('clientData', JSON.stringify(data));
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const deleteClient = createAsyncThunk("/client/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/clients/${id}`);
    toast.promise(response, {
      loading: "deleting client ...",
      success: "Client deleted successfully",
      error: "Failed to delete the client",
    });

    const data = (await response).data;
    // Update localStorage after successful deletion
    const currentClients = JSON.parse(localStorage.getItem('clientData') || '[]');
    const updatedClients = currentClients.filter(client => client._id !== id);
    localStorage.setItem('clientData', JSON.stringify(updatedClients));
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewClient = createAsyncThunk("/client/create", async (data) => {
  try {
    const response = axiosInstance.post("/clients", data);
    toast.promise(response, {
      loading: "Creating new client",
      success: "Client created successfully",
      error: "Failed to create client"
    });

    const responseData = (await response).data;
    // Update localStorage after successful creation
    const currentClients = JSON.parse(localStorage.getItem('clientData') || '[]');
    const updatedClients = [...currentClients, responseData];
    localStorage.setItem('clientData', JSON.stringify(updatedClients));
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateClient = createAsyncThunk(
  'client/updateClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/clients/${clientData.id}`, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUpClient = createAsyncThunk("/lead/followup", async (followUpData) => {
  try {
    const response = axiosInstance.post("/lead/schedule-followup", followUpData);
    toast.promise(response, {
      loading: "Sending follow-up data...",
      success: "Follow-up data sent successfully",
      error: "Failed to send follow-up data",
    });

    const responseData = (await response).data;
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const closeLead = createAsyncThunk("/lead/close", async (data) => {
  try {
    const response = await axiosInstance.post(`/lead/close`, data);
    toast.promise(response, {
      loading: "Closing lead...",
      success: "Lead closed successfully",
      error: "Failed to close the lead",
    });

    const responseData = (await response).data;
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const transferLead = createAsyncThunk(
  'client/transferLead',
  async ({ clientId, toSalesPerson, reason }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/lead/transfer', {
        clientId,
        toSalesPerson,
        reason
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getClientDetails = createAsyncThunk("/client/details", async (id) => {
  try {
    const response = axiosInstance.get(`/clients/${id}`);
    toast.promise(response, {
      loading: "Loading client details...",
      success: "Client details loaded successfully",
      error: "Failed to load client details",
    });

    const data = (await response).data?.data;
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.fulfilled, (state, action) => {
        if (action.payload) {
          state.clientData = [...action.payload];
        }
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        if (action.payload) {
          state.clientData = state.clientData.filter(
            client => client._id !== action.payload.id
          );
        }
      })
      .addCase(createNewClient.fulfilled, (state, action) => {
        if (action.payload) {
          state.clientData = [...state.clientData, action.payload];
        }
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        if (action.payload) {
          state.clientData = state.clientData.map(client =>
            client._id === action.payload._id ? action.payload : client
          );
        }
      })
      .addCase(followUpClient.fulfilled, (state, action) => {
        if (action.payload) {
          // Handle the state update if necessary
          // For example, you might want to update a specific client's follow-up status
        }
      })
      .addCase(closeLead.fulfilled, (state, action) => {
        if (action.payload) {
          // Update the state to reflect the lead closure
          state.clientData = state.clientData.map(client =>
            client._id === action.payload._id ? { ...client, status: 'closed' } : client
          );
        }
      })
      .addCase(transferLead.fulfilled, (state, action) => {
        if (action.payload) {
          state.clientData = state.clientData.map(client =>
            client._id === action.payload.client
              ? { ...client, salesPerson: action.payload.toSalesPerson }
              : client
          );
        }
      })
      .addCase(getClientDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedClient = action.payload;
        }
      })
      .addCase(getClientDetails.rejected, (state) => {
        state.selectedClient = null;
      });
  }
});

export default clientSlice.reducer;