import React from 'react'
import Heading from '../../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterByPriceSale, sortByPriceSale } from '@/store/features/productSlice';
import ProductCard from '@/components/ProductCard/ProductCard';
import "./DiscountedProducts.scss";
import { useState } from 'react';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';
import Sort from '../Sort/Sort';
import ProductsBlock from '../ProductsBlock/ProductsBlock';
import 'react-loading-skeleton/dist/skeleton.css';

const DiscountedProducts = ({ discountedProducts, filteredDiscountedProducts }) => {

    const dispatch = useDispatch();
    let [minPrice, setMinPrice] = useState("");
    let [maxPrice, setMaxPrice] = useState("");
    const [sortByValue, setSortByValue] = useState({
        id: "1",
        label: "default",
        value: "default",
    });

    const [sortLabels, setSortlabels] = useState([
        {
            id: "1",
            label: "default",
            value: "default",
        },
        {
            id: "2",
            label: "low to high",
            value: "low-to-high",
        },
        {
            id: "3",
            label: "high to low",
            value: "high-to-low",
        },
    ]);

    useEffect(() => {

        let minPriceVal = minPrice && minPrice > 0 ? minPrice : 0;
        let maxPriceVal = maxPrice ? maxPrice : Infinity;
        dispatch(filterByPriceSale({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortByPriceSale({ value: sortByValue.value }));
    }, [sortByValue, minPrice, maxPrice, dispatch]);


    const skeletonCardsCount = discountedProducts.length || 12;

    const data = filteredDiscountedProducts.length > 0 ? filteredDiscountedProducts : discountedProducts;


    return (
        <section className="discounted-products">
            <div className="container">

                <Heading title="Discounted items" />

                <div className="filters">

                    <div className="filters__item">
                        <p>Price</p>
                        <PriceRangeFilter
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                        />

                    </div>

                    <div className='filters__item'>
                        <p>Sorted</p>
                        <Sort
                            labels={sortLabels}
                            onSelect={setSortByValue}
                            defaultSelect={sortByValue}
                        />
                    </div>

                </div>

                <ProductsBlock data={data} skeletonCardsCount={skeletonCardsCount} />
            </div>
        </section>
    )
}

export default DiscountedProducts
