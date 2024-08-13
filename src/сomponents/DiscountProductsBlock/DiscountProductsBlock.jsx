import React from 'react';
import Heading from '../Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDiscountedProducts } from '../../store/features/productSlice';
import ProductCard from "../ProductCard/ProductCard";
import "./DiscountProductsBlock.scss";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getRandomElements } from '../../utils/functions';

const DiscountProductsBlock = () => {
    const dispatch = useDispatch();
    const [randomDiscountedProducts, setRandomDiscountedProducts] = useState([]);
    const { discountedProducts } = useSelector(state => state.products);
    const maxNumOfDiscountProducts = 4;


    useEffect(() => {
        dispatch(fetchDiscountedProducts());
    }, [dispatch]);


    useEffect(() => {
        if (discountedProducts.length > 0) {
            const randomProducts = getRandomElements(discountedProducts, maxNumOfDiscountProducts);
            setRandomDiscountedProducts(randomProducts);
        }
    }, [discountedProducts]);
   
    return (
        <section className="discount-products-block">
            <div className="container">
                <Heading title="Sale" subtitle="All sales" link="discounted-products" />

                <ul className="discount-products-block__list">
                    {randomDiscountedProducts && randomDiscountedProducts.map(product => (

                        <li className="discount-products-block__item" key={product.id}>
                            <ProductCard product={product} />
                        </li>

                    ))}
                </ul>
                <Link to="/discounted-products" className='discount-products-block__btn btn--light'>
                    All sales
                </Link>
            </div>
        </section>
    )
}

export default DiscountProductsBlock
