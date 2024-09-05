import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPriceLiked, sortByPriceLiked } from '@/store/features/productSlice';
import { useEffect } from 'react';
import Heading from '../Heading/Heading';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';
import Sort from '../Sort/Sort';
import ProductCard from '@/components/ProductCard/ProductCard';
import "./LikedProducts.scss";
import { getLikedProducts } from '@/store/features/productSlice';
import { Link } from 'react-router-dom';


const LikedProducts = () => {
    const { likedProducts, filteredLikedProducts, cart } = useSelector(state => state.products);

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

                {
                    data && data.length > 0 ? (<>
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

                        <ul className="liked-products__list">

                            {
                                data.map(product => (
                                    <li className="liked-products__item" key={product.id}>
                                        <ProductCard product={product} />
                                    </li>
                                ))
                            }

                        </ul>
                    </>
                    )
                        :
                        (
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

                }

            </div>
        </section>
    )
}

export default LikedProducts
