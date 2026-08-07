import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchproducts,
  createproduct,
  updateproducts,
  deleteproduct,
} from "../../services/Productservice";

// GET PRODUCTS
export const getproducts = createAsyncThunk(
  "products/getproducts",
  async () => {
    return await fetchproducts();
  }
);

// ADD PRODUCT
export const addproduct = createAsyncThunk(
  "products/addproduct",
  async (product) => {
    return await createproduct(product);
  }
);

// UPDATE PRODUCT
export const updateproduct = createAsyncThunk(
  "products/updateproduct",
  async (product) => {
    return await updateproducts(product);
  }
);

// DELETE PRODUCT
export const removeproduct = createAsyncThunk(
  "products/removeproduct",
  async (id) => {
    await deleteproduct(id);
    return id;
  }
);

const initialState = {
  products: [],
};

const productslice = createSlice({
  name: "products",
  initialState,

  extraReducers: (builder) => {
    // GET
    builder.addCase(
      getproducts.fulfilled,
      (state, action) => {
        state.products = action.payload;
      }
    );

    // ADD
    builder.addCase(
      addproduct.fulfilled,
      (state, action) => {
        state.products.push(action.payload);
      }
    );

    // UPDATE
    builder.addCase(
      updateproduct.fulfilled,
      (state, action) => {
        const index = state.products.findIndex(
          (product) =>
            product.id === action.payload.id
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      }
    );

    // DELETE
    builder.addCase(
      removeproduct.fulfilled,
      (state, action) => {
        state.products = state.products.filter(
          (product) =>
            product.id !== action.payload
        );
      }
    );
  },
});

export default productslice.reducer;