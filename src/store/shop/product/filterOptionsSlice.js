import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    filterOptions: {
        Brand: [],
        Category: [],
        Price: [
            { id: "0-500", label: "$0 - $500" },
            { id: "500-1000", label: "$500 - $1000" },
            { id: "1000-1500", label: "$1000 - $1500" },
            { id: "1500-2000", label: "$1500 - $2000" },
            { id: "2500-3000", label: "$2500 - $3000" }
        ]
    },
    error: null
};

export const fetchFilterOptions = createAsyncThunk(
    'filterOptions/fetch',
    async () => {
        try {
            const [brandsResponse, categoriesResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/brands/all`, {
                    withCredentials: true
                }),
                axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/all`, {
                    withCredentials: true
                })
            ]);

            return {
                Brand: brandsResponse.data.map(brand => ({
                    id: brand.name.toLowerCase(),
                    label: brand.name
                })),
                Category: categoriesResponse.data.map(category => ({
                    id: category.name.toLowerCase(),
                    label: category.name
                }))
            };
        } catch (error) {
            throw error;
        }
    }
);

const filterOptionsSlice = createSlice({
    name: "filterOptions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterOptions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.filterOptions = {
                    ...state.filterOptions,
                    ...action.payload
                };
            })
            .addCase(fetchFilterOptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default filterOptionsSlice.reducer;
