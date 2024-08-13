import React from 'react';
import "./DiscountPopup.scss";
import ProductCard from '../ProductCard/ProductCard';

const DiscountPopup = ({togglePopup}) => {
    return (
        <div className="discount-popup">
            <div className="discount-popup__content">
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
                        50% discount on product of the day!
                    </h2>
                </div>

                <ProductCard />

                <button className='discount-popup__btn'>Add to cart</button>
            </div>

        </div>
    )
}

export default DiscountPopup
