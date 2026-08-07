import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchproducts,
} from "../../services/Productservice";

// Get Product 
export const Showproduct = createAsyncThunk(
    "products/showproduct",
    async (id) => {
        return await fetchproducts(id);
    }
)

const initialState = {
    productspage: [],
}

const showproductslice = createSlice({
    name:"showproducts",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(Showproduct.fulfilled, (state, action) => {
            state.productspage = action.payload;
        })
    }
});

export default showproductslice.reducer;