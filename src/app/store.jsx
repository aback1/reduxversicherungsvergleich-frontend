import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import preferencesReducer from "../features/preferences/preferencesSlice.js";
import insurancechangeReducer from "../features/insurancechange/insurancechangeSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    preferences: preferencesReducer,
    insurancechange: insurancechangeReducer,
  },
});

export default store;
