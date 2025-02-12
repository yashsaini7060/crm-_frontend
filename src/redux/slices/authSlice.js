import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
  token: localStorage.getItem("token") || ""
}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = axiosInstance.post("auth/register", data);
    toast.promise(response, {
      loading: 'Wait! creating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to create your account'
    });
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
})



export const login = createAsyncThunk("/auth/signin", async (data) => {
  try {
    const response = axiosInstance.post("auth/login", data);
    toast.promise(response, {
      loading: 'Wait! authenticating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to authenticate your account'
    });
    return await response;
  } catch (error) {
    // Clear localStorage on login error
    localStorage.clear();
    console.log(error);
    toast.error(error?.response?.data?.message || 'Login failed');
    throw error; // Re-throw the error so Redux knows the action failed
  }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
  // Directly clear local storage without making a backend request
  localStorage.clear();
  toast.success('Successfully logged out');
  return;
})



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.user?.role);
        localStorage.setItem("token", action?.payload?.data?.token);

        state.isLoggedIn = true;
        state.role = action?.payload?.data?.user?.role;
        state.data = action?.payload?.data?.user;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        state.token = "";
      })
    // .addCase(getUserData.fulfilled, (state, action) => {
    //   if (!action?.payload?.user) return;
    //   localStorage.setItem("data", JSON.stringify(action?.payload?.user));
    //   localStorage.setItem("isLoggedIn", true);
    //   localStorage.setItem("role", action?.payload?.user?.role);
    //   state.isLoggedIn = true;
    //   state.role = action?.payload?.user?.role;
    //   state.data = action?.payload?.user;
    // })
  }
});

export default authSlice.reducer;