import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async ({ email, password, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://tourapps.onrender.com/users/signin`,
        {
          email,
          password,
        }
      );
      toast.success("Login successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async ({ firstname, lastname, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://tourapps.onrender.com/users/signup`,
        {
          firstname,
          lastname,
          email,
          password,
        }
      );
      toast.success("Register Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [LoginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [RegisterUser.pending]: (state, action) => {
      state.loading = true;
    },
    [RegisterUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [RegisterUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
