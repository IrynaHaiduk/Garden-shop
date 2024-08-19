import React from 'react';
import "./CategoriesProducts.scss";
import { useParams } from 'react-router-dom';
import Heading from '@/components/Heading/Heading';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';
import Sort from '../Sort/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '@/store/features/productSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';


const CategoriesProducts = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const { products, categories, filteredProducts } = useSelector(state => state.products);
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentProducts, setCurrentProducts] = useState([]);
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
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            const searchedCategory = categories.find(category => category.id === categoryId);
            setCurrentCategory(searchedCategory);
        }
    }, [categories, categoryId]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const searchedProducts = products.filter(product => product.categoryId === categoryId);
            setCurrentProducts(searchedProducts);
        }
    }, [products, categoryId]);

    console.log(currentProducts);

    const data = filteredProducts.length > 0 ? filteredProducts : products;


    return (
        <section className="categories-products">
            <div className="container">
                <Heading title={currentCategory?.title} />

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

                {currentProducts &&
                    <ul className="categories-products__list">

                        {
                            currentProducts.map(product => (
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
