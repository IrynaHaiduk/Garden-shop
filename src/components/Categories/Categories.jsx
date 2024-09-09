import React from 'react'
import Heading from '@/components/Heading/Heading';
import Category from '@/components/Category/Category';
import "@/components/Categories/Categories.scss";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CardSkeleton from '../CardSkeleton/CardSkeleton';



const Categories = ({ categories }) => {
    let { loading } = useSelector(state => state.products);
    const skeletonCardsCount = categories.length || 5;


    return (
        <section className="categories">
            <div className="container">
                <Heading title="Categories" />

                {loading && skeletonCardsCount ? (
                    <ul className="categories__list">
                        {Array(skeletonCardsCount).fill().map((item) => (
                            <li key={uuidv4()} className="categories__item">
                                <CardSkeleton />
                            </li>
                        ))}
                    </ul>
                ) : (
                    categories && categories.length > 0 && <>
                        <ul className="categories__list">
                            {
                                categories.map(category => (
                                    <li key={category.id} className="categories__item">
                                        <Category category={category} />
                                    </li>
                                ))
                            }
                        </ul>
                    </>

                )}

            </div>
        </section>
    )
}

export default Categories
