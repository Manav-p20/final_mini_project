import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createproduct, deleteproduct, fetchproducts } from "../../services/Productservice";
import { create } from "axios";

// get 

export const getproducts = createAsyncThunk(
    "products/getproducts",
    async () => {
        return await fetchproducts();
    }
);

// add 

export const addproduct = createAsyncThunk(
    'product/addproduct',
    async(product) => {
        return await createproduct(product);
    },
);

// delte 
export const removeproduct = createAsyncThunk(
    'product/removeproduct',
    async (id) => {
        await deleteproduct(id)
        return id;
    }
)

const initialState = {
    products:[],
}

const productslice = createSlice({
    name: "products",
    initialState,
    // reducers: {
    //     addproducts = (state, action) => {
    //         state.products.push(action.payload)
    //     }
    // }

    // update pending 
extraReducers: (builder) => {
    builder
    .addCase(getproducts.fulfilled, (state, action) => {
        state.products = action.payload;
    })
    .addCase(addproduct. fulfilled, (state, action) => {
        state.products.push(action.payload)
    })

    .addCase(removeproduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload)
    })
}

})

export default productslice.reducer