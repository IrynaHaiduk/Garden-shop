import React from 'react';
import "./AllProducts.scss";
import Heading from '@/components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/features/productSlice';
import  ProductCard  from '@/components/ProductCard/ProductCard';
import { useEffect } from 'react';

const AllProducts = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);


    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <section className="all-products">
            <div className="container">
                <Heading title="All products" />

                <ul className="all-products__list">

                    {products && products.map(product => (
                        <li key={product.id} className="all-products__item">
                            <ProductCard product={product}/>
                        </li>
                    ))}
                </ul>
            </div>


        </section>
    )
}

export default AllProducts
