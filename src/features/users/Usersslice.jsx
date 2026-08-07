import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { totalusers } from "../../api/Dashboardapi";

export const fetchUsers = createAsyncThunk(
  "/users/fetchUsers",
  async () => {
    const res = await totalusers();
    return res.data.totalusers;
  }
);

const users = createSlice({
  name: "user",

  initialState: {
    totalusers: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.totalusers = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Some went wrong";
      });
  },
});

export default users.reducer;