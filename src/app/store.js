import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/Authslice";
import productsReducer from "../features/products/Productslice";
import dashboardReducer from "../features/Dashboard/Dashboardslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    dashboard: dashboardReducer,
  },
});