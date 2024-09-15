import React from 'react'
import Heading from '@/components/Heading/Heading';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { filterByPriceSale, sortBySale } from '@/store/features/productSlice';
import "./DiscountedProducts.scss";
import { useState } from 'react';
import PriceRangeFilter from '@/components/PriceRangeFilter/PriceRangeFilter';
import Sort from '@/components/Sort/Sort';
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock';
import 'react-loading-skeleton/dist/skeleton.css';

const DiscountedProducts = ({ discountedProducts, filteredDiscountedProducts }) => {

    const dispatch = useDispatch();
    let [minPrice, setMinPrice] = useState("");
    let [maxPrice, setMaxPrice] = useState("");
    // State for tracking the current sort selection
    const [sortByValue, setSortByValue] = useState({
        id: "1",
        label: "default",
        value: "default",
    });
    // Sort options for the dropdown menu
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
        {
            id: "4",
            label: "A to Z",
            value: "a-to-z",
        },
        {
            id: "5",
            label: "Z to A",
            value: "z-to-a",
        }
    ]);

    const defaultSkeletonCardsCount = 12;
    const skeletonCardsCount = discountedProducts.length || defaultSkeletonCardsCount;
    // Use filtered data if available, otherwise use discountedProducts from props
    const data = filteredDiscountedProducts.length > 0 ? filteredDiscountedProducts : discountedProducts;

    useEffect(() => {
        // Set default values if minPrice or maxPrice are not defined
        let minPriceVal = minPrice && minPrice > 0 ? minPrice : 0;
        let maxPriceVal = maxPrice ? maxPrice : Infinity;
        dispatch(filterByPriceSale({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortBySale({ value: sortByValue.value }));
    }, [sortByValue, minPrice, maxPrice, dispatch]);

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
