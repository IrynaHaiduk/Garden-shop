import React from 'react';
import "./MainMenu.scss";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {

    const setActiveLink = ({ isActive }) => isActive ? "main-menu__link main-menu__link--active" : "main-menu__link";
    const [isToggle, setIsToggle] = useState(false);

    const handleToggleMenu = () => {
        setIsToggle(!isToggle);
    }

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className="main-menu">
            {
                isToggle ?
                    <div className="main-menu__wrapper">
                        <div className="main-menu__content">

                            <button className='main-menu__btn main-menu__btn--open' onClick={handleToggleMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                    <path d="M33 11L11 33" stroke="#424436" strokeWidth="3.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11 11L33 33" stroke="#424436" strokeWidth="3.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <ul className="main-menu__list">
                                <li className="main-menu__item">
                                    <NavLink to="/" className={setActiveLink}>
                                        Main Page
                                    </NavLink>
                                </li>
                                <li className="main-menu__item">
                                    <NavLink to="/categories" className={setActiveLink}>
                                        Categories
                                    </NavLink>
                                </li>
                                <li className="main-menu__item">
                                    <NavLink to="/products" className={setActiveLink}>
                                        All products
                                    </NavLink>
                                </li>
                                <li className="main-menu__item">
                                    <NavLink to="/discounted-products" className={setActiveLink}>
                                        All sales
                                    </NavLink>
                                </li>
                            </ul>
                            <button className='main-menu__ref btn--bright' onClick={togglePopup}>
                                1 day discount!
                            </button>
                        </div>
                        {isPopupVisible && (
                            <div className="discount-popup">
                                <div className="discount-popup__content">
                                    <div className="discount-popup__wrapper">
                                        <button onClick={togglePopup} className="discount-popup__btn">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="44"
                                                height="44"
                                                viewBox="0 0 44 44"
                                                fill="none"
                                            >
                                                <path
                                                    d="M33 11L11 33"
                                                    stroke="#FFFFF1"
                                                    strokeWidth="3.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M11 11L33 33"
                                                    stroke="#FFFFF1"
                                                    strokeWidth="3.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <h2 className="discount-popup__title">
                                            50% discount on product of the day!
                                        </h2>
                                    </div>

                                    <div className="discount-product">
                                        <div className="discount-product__image">
                                            <img src="" alt="" />
                                        </div>
                                        <div className="discount-product__content">
                                            <h3 className="discount-product__title">

                                            </h3>
                                            <div className="discount-product__price">
                                                <span className="discount-product__price-new">

                                                </span>
                                                <span className="discount-product__price-old">

                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <button className='discount-popup__btn'>Add to cart</button>
                                </div>

                            </div>
                        )
                        }
                    </div >
                    :
                    <button className='main-menu__btn main-menu__btn--close' onClick={handleToggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M6 22H38" stroke="#424436" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
                            <path d="M6 12H38" stroke="#424436" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
                            <path d="M6 32H38" stroke="#424436" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
                        </svg>
                    </button>


            }

        </div >
    )
}

export default MainMenu
