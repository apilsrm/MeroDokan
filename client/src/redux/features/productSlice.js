import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";


//state  define  can makeaction

//get all product
export const getProducts = createAsyncThunk(
  "/get/products",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get single product
export const singleProducts = createAsyncThunk(
  "/get/singleproduct/",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "productss",
  initialState: {
    loading: "",
    error: "",
    message:"",
    products: [],
    product: {},
  },

   //direct acess
   reducers:{
    clearError:(state)=>{
        state.error = null
    }
   },


  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(singleProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(singleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {clearError} = productSlice.actions;

export default productSlice.reducer;
