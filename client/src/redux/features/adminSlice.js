import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";

//add product
export const createProduct = createAsyncThunk(
  "/create/product",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.addProduct(formData);
      toast.success(response.data.message || "product create successfully");
      navigate("/admin/hamrodokan/panel");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//updateProduct

export const adminUpdateProduct = createAsyncThunk(
  "/admin/update/product",
  async ({  updateFormData,id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateAdminProduct(updateFormData, id);
      toast.success(response.data.message || "product update success! ");
      navigate("/admin/hamrodokan/panel")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete product

export const productDelete = createAsyncThunk(
  "/delete/products",
  async ({ id, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.deleteProduct(id);
      toast.success(response.data.message || "product delete successfully");
      dispatch(productsAdmin());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get single product by admin
export const productAdminSingle = createAsyncThunk(
  "/single/admin/product",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.singleAdminProduct(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get all product
export const productsAdmin = createAsyncThunk(
  "admin/products",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getAdminProducts();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: "",
    isLoading: "",
    error: "",
    message: "",
    adminProducts: [],
    adminProduct: {},
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(productsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload.data;
      })
      .addCase(productsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //send garda no ,data
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //single product

      .addCase(productAdminSingle.pending, (state) => {
        state.loading = true;
      })
      .addCase(productAdminSingle.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload.data;
      })
      .addCase(productAdminSingle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //update add post put no data
      .addCase(adminUpdateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminUpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload;
      })
      .addCase(adminUpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //delete
      .addCase(productDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload;
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
