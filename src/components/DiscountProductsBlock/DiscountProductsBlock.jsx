import React from 'react';
import Heading from '../Heading/Heading';
import { useEffect } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import "./DiscountProductsBlock.scss";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getRandomElements } from '../../utils/functions';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const DiscountProductsBlock = ({discountedProducts}) => {
    const [randomDiscountedProducts, setRandomDiscountedProducts] = useState([]);
    let { loading } = useSelector(state => state.products);
    const maxNumOfDiscountProducts = 4;
    const skeletonCardsCount = maxNumOfDiscountProducts;

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
                {loading && skeletonCardsCount ? (
                    <ul className="products-block__list">
                        {Array(skeletonCardsCount).fill().map((item) => (
                            <li key={uuidv4()} className="products-block__item">
                                <CardSkeleton />
                            </li>
                        ))}
                    </ul>
                ) : (
                    discountedProducts && discountedProducts.length > 0 && <>
                         <ul className="products-block__list">
                    {randomDiscountedProducts && randomDiscountedProducts.map(product => (

                        <li className="products-block__item" key={product.id}>
                            <ProductCard product={product} />
                        </li>

                    ))}
                </ul>
                    </>

                )}
                <Link to="/discounted-products" className='discount-products-block__btn btn--light'>
                    All sales
                </Link>
            </div>
        </section>
    )
}

export default DiscountProductsBlock
