import React from 'react';
import "./ProductsBlock.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import ProductCard from '@/components/ProductCard/ProductCard';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const ProductsBlock = ({ data, skeletonCardsCount }) => {
    let { loading } = useSelector(state => state.products);

    return (
        <div className="products-block">
            {loading && skeletonCardsCount ? (
                <ul className="products-block__list">
                    {Array(skeletonCardsCount).fill().map((item) => (
                        <li key={uuidv4()} className="products-block__item products-block__item--no-border">
                            <CardSkeleton />
                        </li>
                    ))}
                </ul>
            ) : (
                data && data.length > 0 && <>
                    <ul className="products-block__list">
                        {
                            data.map(product => (
                                <li key={product.id} className="products-block__item">
                                    <ProductCard product={product} />
                                </li>
                            ))
                        }
                    </ul>
                </>

            )}
        </div>
    )
}

export default ProductsBlock;
