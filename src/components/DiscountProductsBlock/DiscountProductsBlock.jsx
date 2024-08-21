import React from 'react';
import Heading from '../Heading/Heading';
import { useEffect } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import "./DiscountProductsBlock.scss";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getRandomElements } from '../../utils/functions';

const DiscountProductsBlock = ({discountedProducts}) => {
    const [randomDiscountedProducts, setRandomDiscountedProducts] = useState([]);
    const maxNumOfDiscountProducts = 4;

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
