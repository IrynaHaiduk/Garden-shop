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
    product: null,
    cart: [],
    likedProducts: [],
    filteredLikedProducts: [],
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

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (productId) => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/products/${productId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            };

            const data = await response.json();
            return data[0];
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
            if (!response.ok) {
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

export const sendDiscountData = createAsyncThunk(
    "products/sendDiscountData",
    async (discountData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/sale/send`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(discountData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData || "Failed to send discount data to server");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "An unexpected error occurred");
        }
    }
)

export const sendOrderData = createAsyncThunk(
    "products/sendOrderData",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/order/send`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData || "Failed to send order data to server");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "An unexpected error occurred");
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        saveLikedProduct: (state, { payload }) => {
            const foundLikedProduct = state.likedProducts.find(product => product.id === payload.id);

            if (foundLikedProduct) {
                state.likedProducts = state.likedProducts.filter(product => product.id !== payload.id);
            } else {
                state.likedProducts.push(payload);
            }

            localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts))
        },
        getLikedProducts: state => {
            const likedProductsInStorage = JSON.parse(localStorage.getItem("likedProducts"));

            if (likedProductsInStorage) {
                state.likedProducts = [...likedProductsInStorage];
            } else {
                localStorage.setItem("likedProducts", JSON.stringify([]))
            }
        },

        addProductToLiked: (state, { payload }) => {
            const foundProduct = state.likedProducts.find(product => product.id === payload.id);

            if (!foundProduct) {
                state.likedProducts.push({ ...payload });
            }

            localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts))
        },
        deleteProductFromLiked: (state, { payload }) => {
            state.likedProducts = state.likedProducts.filter(product => product.id !== payload.id);
            state.filteredLikedProducts = state.filteredLikedProducts.filter(product => product.id !== payload.id);
            localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts));
        },
        getCartProducts: state => {
            const cartProductsInStorage = JSON.parse(localStorage.getItem("cartProducts"));

            if (cartProductsInStorage) {
                state.cart = [...cartProductsInStorage];
            } else {
                localStorage.setItem("cartProducts", JSON.stringify([]));
            }
        },
        addProductToCart: (state, { payload }) => {
            const foundProduct = state.cart.find(product => product.id === payload.id);

            if (foundProduct) {
                state.cart = state.cart.map(product => {
                    if (product.id === payload.id) {
                        return { ...product, count: payload.count };
                    }
                    return product;
                });
            } else {
                state.cart.push({ ...payload });
            }

            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        incrementProductCart: (state, { payload }) => {
            state.cart = state.cart.map(product => {
                if (product.id === payload) {
                    product.count += 1;
                }

                return product;
            });

            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        decrementProductCart: (state, { payload }) => {
            state.cart = state.cart.map(product => {
                if (product.id === payload && product.count > 1) {
                    product.count -= 1;
                }
                return product;
            });
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        deleteProductFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(product => product.id !== payload.id);
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        clearCard: state => {
            state.cart = [];
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        clearCategoryData: state => {
            state.categoryData = {};
            state.filteredCategoryData = [];
        },
        sortBy: (state, { payload }) => {
            let data = state.filteredProducts?.length > 0 ? state.filteredProducts : state.products;

            const getPrice = (product) => product.discont_price ?? product.price;

            if (payload.value === 'low-to-high') {
                state.filteredProducts = [...data].sort((a, b) => getPrice(a) - getPrice(b));
            } else if (payload.value === 'high-to-low') {
                state.filteredProducts = [...data].sort((a, b) => getPrice(b) - getPrice(a));
            } else if (payload.value === 'a-to-z') {
                state.filteredProducts = [...data].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
            } else if (payload.value === 'z-to-a') {
                state.filteredProducts = [...data].sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));
            } else {
                state.filteredProducts = data;
            }
        },
        sortByCategory: (state, { payload }) => {
            let data = state.filteredCategoryData?.length > 0 ? state.filteredCategoryData : state.categoryData?.data;

            const getPrice = (product) => product.discont_price ?? product.price;

            if (payload.value === 'low-to-high') {
                state.filteredCategoryData = [...data].sort((a, b) => getPrice(a) - getPrice(b));
            } else if (payload.value === 'high-to-low') {
                state.filteredCategoryData = [...data].sort((a, b) => getPrice(b) - getPrice(a));
            } else if (payload.value === 'a-to-z') {
                state.filteredCategoryData = [...data].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
            } else if (payload.value === 'z-to-a') {
                state.filteredCategoryData = [...data].sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));
            } else {
                state.filteredCategoryData = data;
            }
        },

        clearCategoryFilteredData: state => {
            state.filteredCategoryData = [];
        },
        sortBySale: (state, { payload }) => {
            let data = state.filteredDiscountedProducts?.length > 0 ? state.filteredDiscountedProducts : state.discountedProducts;
            const getPrice = (product) => product.discont_price ?? product.price;

            if (payload.value === 'low-to-high') {
                state.filteredDiscountedProducts = [...data].sort((a, b) => getPrice(a) - getPrice(b));
            } else if (payload.value === 'high-to-low') {
                state.filteredDiscountedProducts = [...data].sort((a, b) => getPrice(b) - getPrice(a));
            } else if (payload.value === 'a-to-z') {
                state.filteredDiscountedProducts = [...data].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
            } else if (payload.value === 'z-to-a') {
                state.filteredDiscountedProducts = [...data].sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));
            } else {
                state.filteredDiscountedProducts = data;
            }
        },
        sortByLiked: (state, { payload }) => {
            let data = state.filteredLikedProducts?.length > 0 ? state.filteredLikedProducts : state.likedProducts;
            const getPrice = (product) => product.discont_price ?? product.price;

            if (payload.value === 'low-to-high') {
                state.filteredLikedProducts = [...data].sort((a, b) => getPrice(a) - getPrice(b));
            } else if (payload.value === 'high-to-low') {
                state.filteredLikedProducts = [...data].sort((a, b) => getPrice(b) - getPrice(a));
            } else if (payload.value === 'a-to-z') {
                state.filteredLikedProducts = [...data].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
            } else if (payload.value === 'z-to-a') {
                state.filteredLikedProducts = [...data].sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));
            } else {
                state.filteredLikedProducts = data;
            }
        },
        filterByPrice: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;
            let data = state.filteredProducts?.length > 0 ? state.filteredProducts : state.products;

            state.filteredProducts = data.filter(item => {
                const price = item.discont_price ? item.discont_price : item.price;

                if (minPriceValue && maxPriceValue) {
                    return price >= minPriceValue && price <= maxPriceValue;
                } else if (minPriceValue) {
                    return price >= minPriceValue;
                } else if (maxPriceValue) {
                    return price <= maxPriceValue;
                }
                return true;
            });
        },
        filterByPriceCategory: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;;

            let data = state.filteredCategoryData?.length > 0 ? state.filteredCategoryData : state.categoryData?.data;

            state.filteredCategoryData = data?.filter(item => {
                const price = item.discont_price ? item.discont_price : item.price;

                if (minPriceValue && maxPriceValue) {
                    return price >= minPriceValue && price <= maxPriceValue;
                } else if (minPriceValue) {
                    return price >= minPriceValue;
                } else if (maxPriceValue) {
                    return price <= maxPriceValue;
                }
                return true;
            });
        },
        filterByPriceSale: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;

            let data = state.discountedProducts;


            state.filteredDiscountedProducts = data?.filter(item => {
                const price = item.discont_price ? item.discont_price : item.price;

                if (minPriceValue && maxPriceValue) {
                    return price >= minPriceValue && price <= maxPriceValue;
                } else if (minPriceValue) {
                    return price >= minPriceValue;
                } else if (maxPriceValue) {
                    return price <= maxPriceValue;
                }
                return true;
            });
        },
        filterByPriceLiked: (state, { payload }) => {
            const { minPrice, maxPrice } = payload;
            const minPriceValue = !isNaN(Number(minPrice)) ? Number(minPrice) : null;
            const maxPriceValue = !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;

            let data = state.likedProducts;

            state.filteredLikedProducts = data?.filter(item => {
                const price = item.discont_price ? item.discont_price : item.price;

                if (minPriceValue && maxPriceValue) {
                    return price >= minPriceValue && price <= maxPriceValue;
                } else if (minPriceValue) {
                    return price >= minPriceValue;
                } else if (maxPriceValue) {
                    return price <= maxPriceValue;
                }
                return true;
            });
        },
        filterDiscountedProducts: (state, { payload }) => {
            let data = state.filteredProducts?.length > 0 ? state.filteredProducts : state.products;

            if (payload.value) {
                state.filteredProducts = data.filter(product => product.discont_price);
            } else {
                state.filteredProducts = state.products;
            }

        },
        filterDiscountedProductsCategory: (state, { payload }) => {
            let data = state.filteredCategoryData?.length > 0 ? state.filteredCategoryData : state.categoryData?.data;

            if (payload.value) {
                state.filteredCategoryData = data.filter(product => product.discont_price);

            } else {
                state.filteredCategoryData = state.categoryData?.data;
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
                state.categoryData = {};
                state.filteredCategoryData = [];
                state.categoryData = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})


export const {
    sortBy,
    filterByPrice,
    filterDiscountedProducts,
    filterByPriceSale,
    sortBySale,
    filterByPriceCategory,
    sortByCategory,
    filterDiscountedProductsCategory,
    addProductToCart,
    incrementProductCart,
    decrementProductCart,
    deleteProductFromCart,
    clearCategoryFilteredData,
    clearCard,
    addProductToLiked,
    sortByLiked,
    filterByPriceLiked,
    deleteProductFromLiked,
    getLikedProducts,
    getCartProducts,
    clearCategoryData

} = productSlice.actions

export default productSlice.reducer