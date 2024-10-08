import React from 'react'
import { Link } from 'react-router-dom';
import "./ProductCard.scss";
import { useDispatch } from "react-redux";
import { addProductToLiked, deleteProductFromLiked } from '@/store/features/productSlice'
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { addProductToCart, deleteProductFromCart} from '@/store/features/productSlice';
import { useEffect } from 'react';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { likedProducts, cart } = useSelector(state => state.products);
    const [isProductInLiked, setIsProductInLiked] = useState(false);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [discountPercentage, discountPrice, productPrice] = useMemo(() => {
        let discount = null;
        let discountedPrice = 0;
        const price = Number.isInteger(product?.price) ? product?.price : product?.price.toFixed(2);
    
        if (product && product.discont_price) {
            discount = Math.round(((product.price - product.discont_price) / product.price) * 100);
            discountedPrice = Number.isInteger(product.discont_price) 
                ? product.discont_price 
                : (Math.round(product.discont_price * 100) / 100).toFixed(2);
        }
        return [discount, discountedPrice, price];
    }, [product]);
    
    const toggleWishlist = (product, event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!isProductInLiked) {
            dispatch(addProductToLiked({...product, isProductInLiked}));
        } else {
            dispatch(deleteProductFromLiked({...product, isProductInLiked}));
        }
    };

    const toggleCart = (product, event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!isProductInCart) {
            dispatch(addProductToCart({ ...product, count: 1 }));
        } else {
            dispatch(deleteProductFromCart({ ...product, count: 1 }));
        }
    };

    useEffect(() => {
        setIsProductInLiked(likedProducts?.some(item => item.id === product?.id));
    }, [likedProducts, product?.id]);

    useEffect(() => {
        setIsProductInCart(cart?.some(item => item.id === product?.id));
    }, [cart, product?.id]);

    return (
        <>
            {
                product && (
                    <Link to={`/products/${product.id}`} className="product-card">
                        <div className="product-card__image">
                            <img src={`${import.meta.env.APP_API_URL}/${product.image}`} alt={product.title} />
                            {discountPercentage && (
                                <div className="product-card__percentage">
                                    <span>
                                        -{discountPercentage}%
                                    </span>
                                </div>
                            )}

                            <ul className="product-card__utils">
                                <li className="product-card__utils-item">
                                    <button
                                        className={`product-card__utils-icon  ${isProductInLiked ? "product-card__utils-icon--active" : ""}`}
                                        onClick={(event) => toggleWishlist(product, event)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="42"
                                            viewBox="0 0 48 42"
                                            fill="none"
                                        >
                                            <path
                                                d="M39.4 25.2222C42.678 22.14 46 18.4456 46 13.6111C46 10.5317 44.7252 7.57832 42.456 5.40082C40.1868 3.22331 37.1091 2 33.9 2C30.028 2 27.3 3.05556 24 6.22222C20.7 3.05556 17.972 2 14.1 2C10.8909 2 7.8132 3.22331 5.54401 5.40082C3.27482 7.57832 2 10.5317 2 13.6111C2 18.4667 5.3 22.1611 8.6 25.2222L24 40L39.4 25.2222Z"
                                                fill="white"
                                                stroke="#424436"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </li>
                                <li className="product-card__utils-item">

                                    <button
                                        className={`product-card__utils-icon  ${isProductInCart ? "product-card__utils-icon--active" : ""}`}
                                        onClick={(event) => toggleCart(product, event)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 48 48"
                                            fill="none"
                                        >
                                            <path
                                                d="M40.5 13H7L3 47H44.5L40.5 13Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M24 0C18.4961 0 14.0565 4.37372 14.0565 9.79592V11.7551H6.19492L6.10169 12.6122L2.12429 46.898L2 48H46L45.8757 46.898L41.8983 12.6122L41.8051 11.7551H33.9435V9.79592C33.9435 4.37372 29.5039 0 24 0ZM24 1.95918C28.4396 1.95918 31.9548 5.42219 31.9548 9.79592V11.7551H16.0452V9.79592C16.0452 5.42219 19.5604 1.95918 24 1.95918ZM7.99717 13.7143H14.0565V15.949C13.4622 16.2895 13.0621 16.9094 13.0621 17.6327C13.0621 18.7156 13.9516 19.5918 15.0508 19.5918C16.1501 19.5918 17.0395 18.7156 17.0395 17.6327C17.0395 16.9094 16.6395 16.2895 16.0452 15.949V13.7143H31.9548V15.949C31.3605 16.2895 30.9605 16.9094 30.9605 17.6327C30.9605 18.7156 31.8499 19.5918 32.9492 19.5918C34.0484 19.5918 34.9379 18.7156 34.9379 17.6327C34.9379 16.9094 34.5378 16.2895 33.9435 15.949V13.7143H40.0028L43.7627 46.0408H4.23729L7.99717 13.7143Z"
                                                fill="#424436"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="product-card__content">
                            <h3 className="product-card__title">
                                {product.title}
                            </h3>

                            {product.discont_price ? (
                                <div className="product-card__price">
                                    <span className="product-card__price-new">
                                        ${discountPrice}
                                    </span>
                                    <span className="product-card__price-old">
                                        ${productPrice}
                                    </span>
                                </div>)
                                : (

                                    <div className="product-card__price">
                                        <span className="product-card__price-new">
                                            ${productPrice}
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    </Link>
                )
            }
        </>
    )
}

export default ProductCard
