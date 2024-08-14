import React from 'react'
import Heading from '@/components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/store/features/productSlice';
import Category from '@/components/Category/Category';
import "@/components/Categories/Categories.scss";

const Categories = () => {

    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return (
        <section className="categories">
            <div className="container">
                <Heading title="Categories" />

                <ul className="categories__list">

                    {
                        categories && categories.map(category => (
                            <li key={category.id}>
                                <Category category={category}/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}

export default Categories
