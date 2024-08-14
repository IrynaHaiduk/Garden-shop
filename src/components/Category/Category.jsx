import React from 'react'
import { Link } from 'react-router-dom';
import "./Category.scss";

const Category = ({ category }) => {
    return (
        <Link to={`/categories/${category.id}`} className='category'>
            <div className="category__image">
                <img src={`${import.meta.env.APP_API_URL}/${category.image}`} alt={category.title} />
            </div>
            <div className="category__content">
                <h3 className="category__title">
                    {category.title}
                </h3>
            </div>
        </Link>
    )
}

export default Category

