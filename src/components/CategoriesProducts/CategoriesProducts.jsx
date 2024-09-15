import React from 'react';
import "./CategoriesProducts.scss";
import Heading from '@/components/Heading/Heading';
import PriceRangeFilter from '@/components/PriceRangeFilter/PriceRangeFilter';
import Sort from '@/components/Sort/Sort';
import { useDispatch } from 'react-redux';
import { filterDiscountedProductsCategory, filterByPriceCategory, sortByCategory } from '@/store/features/productSlice';
import { useState, useEffect } from 'react';
import CustomCheckbox from '@/components/CustomCheckbox/CustomCheckbox';
import { clearCategoryData, clearCategoryFilteredData } from '@/store/features/productSlice';
import 'react-loading-skeleton/dist/skeleton.css'
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock';

const CategoriesProducts = ({ categoryData, filteredCategoryData }) => {
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
    const skeletonCardsCount = categoryData.length || defaultSkeletonCardsCount;
    // Use filtered data if available, otherwise use categoryData from props
    const data = filteredCategoryData?.length > 0 ? filteredCategoryData : categoryData?.data;

    useEffect(() => {
        // Set default values if minPrice or maxPrice are not defined
        let minPriceVal = minPrice && minPrice > 0 ? minPrice : 0;
        let maxPriceVal = maxPrice ? maxPrice : Infinity;
        dispatch(clearCategoryFilteredData());
        dispatch(filterDiscountedProductsCategory({ value: isChecked }));
        dispatch(filterByPriceCategory({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortByCategory({ value: sortByValue.value }));

    }, [sortByValue, minPrice, maxPrice, isChecked, dispatch]);

    useEffect(() => {
        // Clean up category data when the component is unmounted to prevent stale data
        return () => {
            dispatch(clearCategoryData());
        };
    }, [dispatch]);

    return (
        <section className="categories-products">
            <div className="container">
                <Heading title={categoryData?.category?.title} />
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

export default CategoriesProducts
