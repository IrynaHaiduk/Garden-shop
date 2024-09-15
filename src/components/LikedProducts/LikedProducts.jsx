import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPriceLiked, sortByLiked } from '@/store/features/productSlice';
import { useEffect } from 'react';
import Heading from '@/components//Heading/Heading';
import PriceRangeFilter from '@/components/PriceRangeFilter/PriceRangeFilter';
import Sort from '@/components/Sort/Sort';
import "./LikedProducts.scss";
import { getLikedProducts } from '@/store/features/productSlice';
import { Link } from 'react-router-dom';
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock';

const LikedProducts = () => {
    const { likedProducts, filteredLikedProducts } = useSelector(state => state.products);

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
    const skeletonCardsCount = likedProducts.length || defaultSkeletonCardsCount;
    // Use filtered data if available, otherwise use likedProducts from props
    const data = filteredLikedProducts.length > 0 ? filteredLikedProducts : likedProducts;

    useEffect(() => {
        // Set default values if minPrice or maxPrice are not defined
        let minPriceVal = minPrice && minPrice > 0 ? minPrice : 0;
        let maxPriceVal = maxPrice ? maxPrice : Infinity;
        dispatch(filterByPriceLiked({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortByLiked({ value: sortByValue.value }));
    }, [sortByValue, minPrice, maxPrice, dispatch]);

    useEffect(() => {
        dispatch(getLikedProducts());
    }, [dispatch]);


    return (
        <section className="liked-products">
            <div className="container">
                <Heading title="Liked products" />

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

                {
                    !data || data.length === 0 ? (
                        <div className="liked-products__container">
                            <div className="liked-products__info">
                                <p>
                                    Looks like you currently have no liked products.
                                </p>
                            </div>
                            <Link to="/all-products" className='liked-products__link btn--bright'>
                                Continue Shopping
                            </Link>
                        </div>
                    )
                        :
                        (
                            <ProductsBlock data={data} skeletonCardsCount={skeletonCardsCount} />
                        )
                }
            </div>
        </section>
    )
}

export default LikedProducts
