import React from 'react'
import { Link } from 'react-router-dom';
import promoBg from "../../images/promo-bg.jpg";
import "./CategoriesBlock.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../store/features/productSlice';
import Category from '../Category/Category';
import Heading from '../Heading/Heading';

const CategoriesBlock = () => {

    const dispatch = useDispatch();
    const maxNumOfCategories = 4;

    const { categories } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <section className="categories-block">
            <div className="container">
                <Heading title="Categories" subtitle="All categories" link="categories" />

                <ul className="categories-block__list">
                    {
                        categories && categories.slice(0, maxNumOfCategories).map(category => (
                            <li key={category.id}>
                                <Category category={category} />
                            </li>
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
