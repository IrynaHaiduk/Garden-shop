import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    categories: [],
    loading: false,
    discountedProducts: [],
    filteredDiscountedProducts: [],
    filteredProducts: [],
    categoryData: {},
    filteredCategoryData: [],
}

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const response = await fetch(`${import.meta.env.APP_API_URL}/categories/all`);
        const data = await response.json();
        return data;
    }
)

export const fetchCategoryById = createAsyncThunk(
    "products/fetchCategoryById",
    async (categoryId) => {
        const response = await fetch(`${import.meta.env.APP_API_URL}/categories/${categoryId}`);
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
        sortByPrice: (state, { payload }) => {
            let data = state.filteredProducts?.length > 0 ? state.filteredProducts : state.products;

            if (payload.value === 'low-to-high') {
                state.filteredProducts = [...data].sort((a, b) => a.price - b.price);
            } else if (payload.value === 'high-to-low') {
                state.filteredProducts = [...data].sort((a, b) => b.price - a.price);
            } else {
                state.filteredProducts = data;
            }
        },
        sortByPriceCategory: (state, { payload }) => {   
            let data = state.filteredCategoryData?.length > 0 ? state.filteredCategoryData : state.categoryData?.data;

            if (payload.value === 'low-to-high') {
                state.filteredCategoryData = [...data].sort((a, b) => a.price - b.price);
            } else if (payload.value === 'high-to-low') {
                state.filteredCategoryData = [...data].sort((a, b) => b.price - a.price);
            } else {
                state.filteredCategoryData = data;
            }
        },
        sortByPriceSale: (state, { payload }) => {
            let data = state.filteredDiscountedProducts?.length > 0 ? state.filteredDiscountedProducts : state.discountedProducts;

            if (payload.value === 'low-to-high') {
                state.filteredDiscountedProducts = [...data].sort((a, b) => a.price - b.price);
            } else if (payload.value === 'high-to-low') {
                state.filteredDiscountedProducts = [...data].sort((a, b) => b.price - a.price);
            } else {
                state.filteredDiscountedProducts = data;
            }
        },
        filterByPrice: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;;
            let data = state.filteredProducts?.length > 0 ? state.filteredProducts : state.products;

            if (minPriceValue && maxPriceValue) {
                state.filteredProducts = data.filter(item => item.price >= minPriceValue && item.price <= maxPriceValue);

            } else if (minPriceValue) {
                state.filteredProducts = data.filter(item => item.price >= minPriceValue);

            } else if (maxPriceValue) {
                state.filteredProducts = data.filter(item => item.price <= maxPriceValue);

            } else {
                state.filteredProducts = data;
            }
        },
        filterByPriceCategory: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;;

            let data = state.filteredCategoryData?.length > 0 ? state.filteredCategoryData : state.categoryData?.data;

            if (minPriceValue && maxPriceValue) {
                state.filteredCategoryData = data.filter(item => item.price >= minPriceValue && item.price <= maxPriceValue);

            } else if (minPriceValue) {
                state.filteredCategoryData = data.filter(item => item.price >= minPriceValue);

            } else if (maxPriceValue) {
                state.filteredCategoryData = data?.filter(item => item.price <= maxPriceValue);

            } else {
                state.filteredCategoryData = data;
            }
        },
        filterByPriceSale: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;

            console.log(minPrice, maxPrice);
          
            // let data = state.filteredDiscountedProducts.length > 0 ? state.filteredDiscountedProducts : state.discountedProducts;
             let data = state.discountedProducts;

            if (minPriceValue && maxPriceValue) {
                state.filteredDiscountedProducts = data.filter(item => item.price >= minPriceValue && item.price <= maxPriceValue);

            } else if (minPriceValue) {
                state.filteredDiscountedProducts = data.filter(item => item.price >= minPriceValue);

            } else if (maxPriceValue) {
                state.filteredDiscountedProducts = data.filter(item => item.price <= maxPriceValue);

            } else {
                state.filteredDiscountedProducts = data;
            }
        },
        filterDiscountedProducts: (state, {payload}) => {
            let data = state.filteredProducts?.length > 0 ? state.filteredProducts : state.products;

            if(payload.value) {
                state.filteredProducts = data.filter(product => product.discont_price);
            } else {
                state.filteredProducts = state.products;
            }

        },
        filterDiscountedProductsCategory: (state, {payload}) => {
            let data = state.filteredCategoryData?.length > 0 ? state.filteredCategoryData : state.categoryData?.data;

            if(payload.value) {
                state.filteredCategoryData = data.filter(product => product.discont_price);

            } else {
                state.filteredCategoryData = state.products;
            }

        }

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
            .addCase(fetchCategoryById.pending, state => {
                state.loading = true;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryData = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export const { 
    sortByPrice, 
    filterByPrice, 
    filterDiscountedProducts, 
    filterByPriceSale,  
    sortByPriceSale, 
    filterByPriceCategory,
    sortByPriceCategory, 
    filterDiscountedProductsCategory,
 } = productSlice.actions

export default productSlice.reducer