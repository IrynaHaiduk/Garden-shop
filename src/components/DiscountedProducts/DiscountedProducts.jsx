import React from 'react'
import Heading from '../../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDiscountedProducts } from '../../store/features/productSlice';
import ProductCard from '@/components/ProductCard/ProductCard';
import "./DiscountedProducts.scss";

const DiscountedProducts = () => {

    const dispatch = useDispatch();
    const { discountedProducts } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchDiscountedProducts());
    }, [dispatch]);

    return (
        <section className="discounted-products">
            <div className="container">

                <Heading title="Discounted items" />

                {
                    discountedProducts && (
                        <ul className="discounted-products__list">

                            {
                                discountedProducts.map(product => (
                                    <li className="discounted-products__item" key={product.id}>
                                        <ProductCard product={product} />
                                    </li>
                                ))
                            }

                        </ul>
                    )
                }



            </div>
        </section>
    )
}

export default DiscountedProducts
