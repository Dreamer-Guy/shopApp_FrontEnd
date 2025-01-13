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
  async ({ userId, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/orders/${userId}?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      
      return {
        orders: response.data.orders || [],
        totalPages: response.data.totalPages || 1
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch orders' });
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
          ...orderData,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add new async thunk for deleting order
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/orders/cancel/${orderId}`,
        { withCredentials: true }
      );
      return orderId; // Return the deleted order ID
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete order' });
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    currentOrder: null,
    totalPages: 1,
    currentPage: 1
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Add action to update orders locally if needed
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // Add new order to beginning
    }
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
        state.error = action.error.message;
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
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add delete order cases
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrders, setCurrentOrder, resetError, setCurrentPage, addOrder } = orderSlice.actions;
export default orderSlice.reducer;


