import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getsales, getstates, gettotalproducts } from "../../api/Dashboardapi";

export const fetchstates = createAsyncThunk(
  "/dashboard/fetchstates",
  async () => {
    const response = await getstates();
    return response.data;
  },
);

export const fetchsales = createAsyncThunk(
  "/dashboard/fetchsales",
  async () => {
    const response = await getsales();
    return response.data;
  },
);

export const fetchtotalproducts = createAsyncThunk(
  "/dashboard/fetchtotalproducts",
  async () => {
    const response = await gettotalproducts();
    return response.data;
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    stats: {},
    sales: [],
    products: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchstates.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchstates.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(fetchstates.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchsales.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchsales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })

      .addCase(fetchsales.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchtotalproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

       .addCase(fetchtotalproducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchtotalproducts.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default dashboardSlice.reducer;
