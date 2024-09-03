import React from 'react';
import "./AllProducts.scss";
import Heading from '@/components/Heading/Heading';
import { useDispatch } from 'react-redux';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useEffect } from 'react';
import { sortByPrice } from '@/store/features/productSlice';
import { useState } from 'react';
import Sort from '../Sort/Sort';
import { filterByPrice } from '@/store/features/productSlice';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { filterDiscountedProducts } from '../../store/features/productSlice';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';

const AllProducts = ({ products, filteredProducts }) => {

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

        dispatch(filterDiscountedProducts({ value: isChecked }));
        dispatch(filterByPrice({ minPrice: minPriceVal, maxPrice: maxPriceVal }));
        dispatch(sortByPrice({ value: sortByValue.value }));

    }, [sortByValue, minPrice, maxPrice, isChecked, dispatch]);


    const data = filteredProducts.length > 0 ? filteredProducts : products;


    return (
        <section className="all-products">
            <div className="container">
                <Heading title="All products" />
                {data && data.length > 0 &&  <>
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


                    <ul className="all-products__list">

                        {
                            data.map(product => (
                                <li key={product.id} className="all-products__item">
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

export default AllProducts
