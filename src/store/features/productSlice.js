import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    categories: [],
    loading: false,
    discountedProducts: [],

}

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const response = await fetch(`${import.meta.env.APP_API_URL}/categories/all`);
        const data = await response.json();
        return data;
    }
)

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/products/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            };

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }

    }
)

export const fetchDiscountedProducts = createAsyncThunk(
    "products/fetchDiscountedProducts",
    async () => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/products/all`);
            if (!response) {
                throw new Error("Failed to fetch discounted products");
            }

            const data = await response.json();
            const saleProducts = data.filter(product => product.discont_price);
            console.log(saleProducts);
            return saleProducts;
        } catch (error) {
            throw error;
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchDiscountedProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.discountedProducts = action.payload;
            })
            .addCase(fetchDiscountedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})


export const { } = productSlice.actions

export default productSlice.reducer