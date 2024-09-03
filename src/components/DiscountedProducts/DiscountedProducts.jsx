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


    const data = filteredDiscountedProducts.length > 0 ? filteredDiscountedProducts : discountedProducts;


    return (
        <section className="discounted-products">
            <div className="container">

                <Heading title="Discounted items" />
                {data && data.length > 0 && <>
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

                    <ul className="discounted-products__list">

                        {
                            data.map(product => (
                                <li className="discounted-products__item" key={product.id}>
                                    <ProductCard product={product} />
                                </li>
                            ))
                        }

                    </ul>
                </>

                }

            </div>
        </section>
    )
}

export default DiscountedProducts
