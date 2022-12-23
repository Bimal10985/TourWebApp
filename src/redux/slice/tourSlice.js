import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addTour = createAsyncThunk(
  "tour/addTour",
  async (
    { name, user, title, description, image, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `https://tourapps.onrender.com/tours/createtour`,
        { name, title, description, image, user },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Tour added successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://tourapps.onrender.com/tours?page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://tourapps.onrender.com/tours/usertours/${userID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTourByID = createAsyncThunk(
  "tour/getTourByID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://tourapps.onrender.com/tours/tour/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTours = createAsyncThunk(
  "tour/deleteTours",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://tourapps.onrender.com/tours/deletetour/${id}`
      );
      toast.success("Tour deleted successfully");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchTour = createAsyncThunk(
  "tour/searchTour",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://tourapps.onrender.com/tours/search?searchQuery=${searchQuery}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, title, description, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://tourapps.onrender.com/tours/updatetour/${id}`,
        { title, description }
      );
      toast.success("Update tour Successfully");
      navigate("/dashboard");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [addTour.pending]: (state, action) => {
      state.loading = true;
    },
    [addTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [addTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTourByID.pending]: (state, action) => {
      state.loading = true;
    },
    [getTourByID.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTourByID.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTours.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [deleteTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [deleteTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchTour.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
      state.success = true;
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export const { setCurrentPage } = tourSlice.actions;
export default tourSlice.reducer;
