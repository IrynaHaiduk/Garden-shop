import React from 'react'
import { Link } from 'react-router-dom';
import "./CategoriesBlock.scss";
import Category from '../Category/Category';
import Heading from '../Heading/Heading';

const CategoriesBlock = ({categories}) => {
    const maxNumOfCategories = 4;

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
