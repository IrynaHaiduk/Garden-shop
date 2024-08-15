import React from 'react';
import "./DiscountPopup.scss";
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '@/store/features/productSlice';
import { useState } from 'react';
import { getRandomElement } from '../../utils/functions';

const DiscountPopup = ({ togglePopup, isPopupVisible, }) => {

    const dispatch = useDispatch();
    const [discountProduct, setDiscountProduct] = useState();
    const { products } = useSelector(state => state.products);
    const discountPercentage = 50;


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const randomProduct = getRandomElement(products);
            const newPrice = randomProduct?.price * discountPercentage / 100;
            setDiscountProduct({ ...randomProduct, discont_price: newPrice });
        }
    }, [products]);

    const handlePopupClose = (event) => {

        if (event.target.closest('.discount-popup__card')) {
            return;
        }

        if (event.target.closest('.discount-popup')) {
            togglePopup();
        }
    }

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

                            <button className='discount-popup__btn btn--white'>Add to cart</button>
                        </div>
                    </div>

                </div>
            )}
        </>

    )
}

export default DiscountPopup
