import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Type definition for order
/*
interface Order {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  address: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  total: number;
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  checkoutStatus: 'PENDING' | 'PAID' | 'FAILED';
  createdAt: string;
}
*/

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/order/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating a new order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/orders/placeOrder`,
        {
          orderData,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    currentOrder: null
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders cases
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create order cases
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrders, setCurrentOrder, resetError } = orderSlice.actions;
export default orderSlice.reducer;


