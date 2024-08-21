import React from 'react'
import Heading from '@/components/Heading/Heading';
import Category from '@/components/Category/Category';
import "@/components/Categories/Categories.scss";

const Categories = ({categories}) => {

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
