import React from 'react';
import "./DiscountPopup.scss";
import ProductCard from '@/components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '@/store/features/productSlice';
import { useState } from 'react';
import { getRandomElement } from '@/utils/functions';
import { addProductToCart } from '@/store/features/productSlice';

const DiscountPopup = ({ togglePopup }) => {

    const dispatch = useDispatch();
    let [discountProduct, setDiscountProduct] = useState(null);
    const { products } = useSelector(state => state.products);
    const discountPercentage = 50;
    const handlePopupClose = (event) => {

        if (event.target.closest('.discount-popup__card')) {
            return;
        }

        if (event.target.closest('.discount-popup')) {
            togglePopup();
        }
    }

    const handleAddToCart = (product) => {
        dispatch(addProductToCart({ ...product, count: 1 }));
    }

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const storedData = JSON.parse(localStorage.getItem("discountProductData"));
            const today = new Date().toISOString().split('T')[0]; // Get today's date in the format YYYY-MM-DD

            // If there is no product in storage or the date is out of date
            if (!storedData || storedData.date !== today) {
                // Generate a new product of the day
                const newDiscountProduct = getRandomElement(products);
                const newPrice = (newDiscountProduct?.price * (100 - discountPercentage)) / 100;
                const productWithDiscount = { ...newDiscountProduct, discont_price: newPrice };

                // Store the product and date in localStorage
                localStorage.setItem(
                    "discountProductData",
                    JSON.stringify({ product: productWithDiscount, date: today })
                );

                // Update the status of the product of the day
                setDiscountProduct(productWithDiscount);
            } else {
                // Use the product of the day from localStorage if the date is relevant
                setDiscountProduct(storedData.product);
            }
        }
    }, [products]);

    return (
        <>
            {discountProduct && (
                <div className="discount-popup" onClick={(e) => handlePopupClose(e)}>
                    <div className="discount-popup__card">
                        <div className="discount-popup__container">
                            <div className="discount-popup__wrapper">
                                <button onClick={togglePopup} className="discount-popup__btn-close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="44"
                                        height="44"
                                        viewBox="0 0 44 44"
                                        fill="none"
                                    >
                                        <path
                                            d="M33 11L11 33"
                                            stroke="#FFFFF1"
                                            strokeWidth="3.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11 11L33 33"
                                            stroke="#FFFFF1"
                                            strokeWidth="3.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <h2 className="discount-popup__title">
                                    {discountPercentage}% discount on product of the day!
                                </h2>
                            </div>

                            <ProductCard product={discountProduct} />

                            <button onClick={() => handleAddToCart(discountProduct)}
                                className='discount-popup__btn btn--white'
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </>

    )
}

export default DiscountPopup
