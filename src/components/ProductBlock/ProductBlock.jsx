import React from 'react';
import "./ProductBlock.scss";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementProductCart, deleteProductFromCart, incrementProductCart } from '@/store/features/productSlice';
import Counter from "@/components/Counter/Counter";

const ProductBlock = ({ product }) => {

    const dispatch = useDispatch();
    let discountPercentage = null;
    let discountPrice = 0;

    if (product && product.discont_price !== undefined && product.discont_price) {
        discountPercentage = Math.round(((product.price - product.discont_price) / product.price) * 100);
        discountPrice = Number.isInteger(product.discont_price) ? product.discont_price : (Math.round(product.discont_price * 100) / 100).toFixed(2);
    }

    const productPrice = Number.isInteger(product?.price) ? product?.price : product?.price.toFixed(2);

    const countPrice = (price) => {
        const currentPrice = price * product.count;
        return Number.isInteger(currentPrice) ? currentPrice : (Math.round(currentPrice * 100) / 100).toFixed(2);
    }

    const incrementCountProduct = (productId) => {
        dispatch(incrementProductCart(productId))
    }

    const decrementCountProduct = (productId) => {
        dispatch(decrementProductCart(productId))
    }

    const deleteProduct = (product) => {
        dispatch(deleteProductFromCart(product));
    }

    return (
        <>
            {product && (
                <div className="product-block">
                    <Link to={`/products/${product.id}`} className="product-block__image">
                        <img src={`${import.meta.env.APP_API_URL}/${product.image}`} alt={product.title} />
                    </Link>
                    <div className="product-block__content">

                        <div className="product-block__header">
                            <h2 className="product-block__title">
                                {product.title}
                            </h2>
                            <button className="product-block__icon" onClick={() => deleteProduct(product)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18" stroke="#424436" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6L18 18" stroke="#424436" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="product-block__wrap">
                            <Counter product={product} incrementCount={incrementCountProduct} decrementCount={decrementCountProduct} />
                            {product.discont_price ? (
                                <div className="product-block__price">
                                    <span className="product-block__price-new">
                                        ${countPrice(discountPrice)}
                                    </span>
                                    <span className="product-block__price-old">
                                        ${countPrice(productPrice)}
                                    </span>
                                </div>)
                                : (
                                    <div className="product-block__price">
                                        <span className="product-block__price-new">
                                            ${countPrice(productPrice)}
                                        </span>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default ProductBlock
