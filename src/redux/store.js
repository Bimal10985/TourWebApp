import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";
import TourReducer from "./slice/tourSlice";
export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});
