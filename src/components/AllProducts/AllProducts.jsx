import React from 'react';
import "./AllProducts.scss";
import Heading from '@/components/Heading/Heading';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sortBy } from '@/store/features/productSlice';
import { useState } from 'react';
import Sort from '@/components/Sort/Sort';
import { filterByPrice } from '@/store/features/productSlice';
import CustomCheckbox from '@/components/CustomCheckbox/CustomCheckbox';
import { filterDiscountedProducts } from '@/store/features/productSlice';
import PriceRangeFilter from '@/components/PriceRangeFilter/PriceRangeFilter';
import 'react-loading-skeleton/dist/skeleton.css';
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock';

const AllProducts = ({ products, filteredProducts }) => {

    const dispatch = useDispatch();
    let [minPrice, setMinPrice] = useState("");
    let [maxPrice, setMaxPrice] = useState("");
    // State for tracking the current sort selection
    const [sortByValue, setSortByValue] = useState({
        id: "1",
        label: "default",
        value: "default",
    });
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(!isChecked);
    };

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
    const skeletonCardsCount = products.length || defaultSkeletonCardsCount;
    // Use filtered products if they exist, otherwise use all products
    const data = filteredProducts.length > 0 ? filteredProducts : products;

    useEffect(() => {
        // Set default values if minPrice or maxPrice are not defined
        let minPriceVal = minPrice && minPrice > 0 ? minPrice : 0;
        let maxPriceVal = maxPrice ? maxPrice : Infinity;

        dispatch(filterDiscountedProducts({ value: isChecked }));
        dispatch(filterByPrice({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortBy({ value: sortByValue.value }));

    }, [sortByValue, minPrice, maxPrice, isChecked, dispatch]);

    return (
        <section className="all-products">
            <div className="container">
                <Heading title="All products" />
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
                        <CustomCheckbox
                            title="Discounted items"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
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

export default AllProducts
