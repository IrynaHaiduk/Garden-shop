import React from 'react'
import { Link } from 'react-router-dom';
import promoBg from "../../images/promo-bg.jpg";
import "./CategoriesBlock.scss";

const CategoriesBlock = () => {
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
                    <li className="categories-block__item category">
                        <Link to="/" className='category__link'>
                            <div className="category__image">
                                <img src={promoBg} alt="" />
                            </div>
                            <div className="category__content">
                                <h3 className="category__title">
                                    Fertilizer
                                </h3>
                            </div>

                        </Link>
                    </li>
                    <li className="categories-block__item category">
                        <Link to="/" className='category__link'>
                            <div className="category__image">
                                <img src={promoBg} alt="" />
                            </div>
                            <div className="category__content">
                                <h3 className="category__title">
                                    Protective products and septic tanks
                                </h3>
                            </div>

                        </Link>
                    </li>
                    <li className="categories-block__item category">
                        <Link to="/" className='category__link'>
                            <div className="category__image">
                                <img src={promoBg} alt="" />
                            </div>
                            <div className="category__content">
                                <h3 className="category__title">
                                    Fertilizer
                                </h3>
                            </div>

                        </Link>
                    </li>
                    <li className="categories-block__item category">
                        <Link to="/" className='category__link'>
                            <div className="category__image">
                                <img src={promoBg} alt="" />
                            </div>
                            <div className="category__content">
                                <h3 className="category__title">
                                    Fertilizer
                                </h3>
                            </div>

                        </Link>
                    </li>
                </ul>
                <Link to="/categories" className='categories-block__btn btn--light'>
                    All categories
                </Link>
            </div>
        </section>
    )
}

export default CategoriesBlock
