
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "shopProducts/fetchAll",
  async (params = {}) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/get`,
        {
          params: {
            ...params,
            limit: params.limit || 8,
            page: params.page || 1,
            sort: params.sort || 'createdAt-desc'
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch products";
    }
  }
);

const productSlice = createSlice({
  name: "shopProducts",
  initialState: {
    productList: [],
    totalProducts: 0,
    currentPage: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;