import React from 'react'
import { Link } from 'react-router-dom';
import "./CategoriesBlock.scss";
import Category from '../Category/Category';
import Heading from '../Heading/Heading';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const CategoriesBlock = ({ categories }) => {
    let { loading } = useSelector(state => state.products);
    const maxNumOfCategories = 4;
    const skeletonCardsCount = maxNumOfCategories;

    return (
        <section className="categories-block">
            <div className="container">
                <Heading title="Categories" subtitle="All categories" link="categories" />
                {loading && skeletonCardsCount ? (
                    <ul className="categories-block__list">
                        {Array(skeletonCardsCount).fill().map((item) => (
                            <li key={uuidv4()} className="categories-block__item">
                                <CardSkeleton />
                            </li>
                        ))}
                    </ul>
                ) : (
                    categories && categories.length > 0 && <>
                        <ul className="categories-block__list">
                            {categories.slice(0, maxNumOfCategories).map(category => (
                                <li key={category.id} className="categories-block__item">
                                    <Category category={category} />
                                </li>
                            ))
                            }
                        </ul>
                    </>

                )}


                <Link to="/categories" className='categories-block__btn btn--light'>
                    All categories
                </Link>
            </div>
        </section>
    )
}

export default CategoriesBlock
