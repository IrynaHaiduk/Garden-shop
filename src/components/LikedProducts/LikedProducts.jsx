import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByPriceLiked, sortByPriceLiked } from '@/store/features/productSlice';
import { useEffect } from 'react';
import Heading from '../Heading/Heading';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';
import Sort from '../Sort/Sort';
import ProductCard from '@/components/ProductCard/ProductCard';
import "./LikedProducts.scss";
import { getLikedProducts } from '@/store/features/productSlice';


const LikedProducts = ({ likedProducts, filteredLikedProducts }) => {

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
        dispatch(filterByPriceLiked({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortByPriceLiked({ value: sortByValue.value }));
    }, [sortByValue, minPrice, maxPrice, dispatch]);

    useEffect(() => {
        dispatch(getLikedProducts());
    }, [dispatch])

    const data = filteredLikedProducts.length > 0 ? filteredLikedProducts : likedProducts;

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
                    data && (
                        <ul className="liked-products__list">

                            {
                                data.map(product => (
                                    <li className="liked-products__item" key={product.id}>
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

export default LikedProducts
