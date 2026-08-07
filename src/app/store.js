import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/Authslice";
import productsReducer from "../features/products/Productslice";
import dashboardReducer from "../features/Dashboard/Dashboardslice";
import usersReducer from "../features/users/Usersslice"
import ViewsliceReducer, { Showproduct } from "../features/viewproduct/Viewslice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    dashboard: dashboardReducer,
    user: usersReducer,
    productspage: ViewsliceReducer,
  },
});