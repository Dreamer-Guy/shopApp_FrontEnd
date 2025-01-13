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
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/orders/cancel/${orderId}`,
        { withCredentials: true }
      );
      return { orderId, response: response.data }; // Return both orderId and response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete order' });
    }
  }
);

const initialState = {
  orders: [], // Make sure this is initialized as an array
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
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
        state.orders = action.payload.orders || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
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
        if (!Array.isArray(state.orders)) {
          state.orders = [];
        }
        state.orders.unshift(action.payload);
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
        // Only remove the order if it exists
        if (Array.isArray(state.orders)) {
          state.orders = state.orders.filter(order => order._id !== action.payload.orderId);
        }
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


