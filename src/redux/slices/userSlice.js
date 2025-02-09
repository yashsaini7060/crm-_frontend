import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../config/axiosInstance";
import toast from 'react-hot-toast';

// Get all users
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get user by ID
export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      toast.success('User deleted successfully');
      return userId;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
      return rejectWithValue(error.response?.data);
    }
  }
);

// Get single user
export const getUserData = createAsyncThunk(
  'users/getUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch user data');
      return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    currentUser: null,
    selectedUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users';
      })

      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete user';
      })

      // Get User Data
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user data';
      });
  },
});

export const { setCurrentUser, clearError, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer; 