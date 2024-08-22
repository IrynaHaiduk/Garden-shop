import React from 'react';
import "./CategoriesProducts.scss";
import Heading from '@/components/Heading/Heading';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';
import Sort from '../Sort/Sort';
import { useDispatch } from 'react-redux';
import { filterDiscountedProductsCategory, filterByPriceCategory, sortByPriceCategory } from '@/store/features/productSlice';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';


const CategoriesProducts = ({ categoryData, filteredCategoryData }) => {
    const dispatch = useDispatch();

    let [minPrice, setMinPrice] = useState("");
    let [maxPrice, setMaxPrice] = useState("");
    const [sortByValue, setSortByValue] = useState({
        id: "1",
        label: "default",
        value: "default",
    });
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(!isChecked);
    };

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

        dispatch(filterDiscountedProductsCategory({ value: isChecked }));
        dispatch(filterByPriceCategory({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortByPriceCategory({ value: sortByValue.value }));

    }, [sortByValue, minPrice, maxPrice, isChecked, dispatch]);

    const data = filteredCategoryData?.length > 0 ? filteredCategoryData : categoryData?.data;
    
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

                {data &&
                    <ul className="categories-products__list">

                        {
                            data.map(product => (
                                <li key={product.id} className="categories-products__item">
                                    <ProductCard product={product} />
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>


        </section>
    )
}

export default CategoriesProducts
