import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import logoImg from "../../images/logo.svg";
import iconHeart from "../../images/icons/icon-heart.svg";
import iconCart from "../../images//icons/icon-cart.svg";


const Navbar = () => {
    const setActiveLink = ({ isActive }) => isActive ? "main-menu__link main-menu__link--active" : "main-menu__link";

    return (
        <nav className='navbar'>
            <div className="container">
                <Link to="/" className='navbar__logo'>
                    <img src={logoImg} alt="logo" />
                </Link>

                <div className="navbar__menu main-menu">
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
                </div>

                <ul className="navbar__items">
                    <li>
                        <NavLink to="/liked-products">
                            <img src={iconHeart} alt="liked products" />
                        </NavLink>
                        <NavLink to="/cart">
                            <img src={iconCart} alt="cart" />
                        </NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar
