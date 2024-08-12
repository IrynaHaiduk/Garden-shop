import React from 'react'
import { Link } from 'react-router-dom';
import promoBg from "../../images/promo-bg.jpg";
import "./CategoriesBlock.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../store/features/productSlice';
import Category from '../Category/Category';

const CategoriesBlock = () => {

    const dispatch = useDispatch();
    const maxNumOfCategories = 4;

    const { categories } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    console.log(categories);
    return (
        <section className="categories-block">
            <div className="container">
                <div className="heading">
                    <h2 className="heading__title">
                        Categories
                    </h2>
                    <div className="heading__block">
                        <div className="heading__decor"></div>
                        <Link to="/categories" className='heading__link'>
                            All categories
                        </Link>
                    </div>

                </div>
                <ul className="categories-block__list">
                    {
                        categories && categories.slice(0, maxNumOfCategories).map(category => (
                            <Category key={category.id} category={category} />
                        ))
                    }
                </ul>
                <Link to="/categories" className='categories-block__btn btn--light'>
                    All categories
                </Link>
            </div>
        </section>
    )
}

export default CategoriesBlock
