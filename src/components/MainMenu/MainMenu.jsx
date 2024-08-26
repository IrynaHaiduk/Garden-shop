import React from 'react';
import "./MainMenu.scss";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DiscountPopup from '../DiscountPopup/DiscountPopup';

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

    useEffect(() => {
    
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsToggle(true); 
            } else {
                setIsToggle(false); 
            }
        };

        handleResize(); 
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (window.innerWidth < 768 && isToggle) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isToggle]);

    useEffect(() => {
        if (isPopupVisible) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isPopupVisible]);

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
                                    <NavLink to="/all-products" className={setActiveLink}>
                                        All products
                                    </NavLink>
                                </li>
                                <li className="main-menu__item">
                                    <NavLink to="/all-sales" className={setActiveLink}>
                                        All sales
                                    </NavLink>
                                </li>
                            </ul>
                            <button className='main-menu__ref btn--bright' onClick={togglePopup}>
                                1 day discount!
                            </button>
                        </div>
                       
                        {isPopupVisible && (
                            <DiscountPopup togglePopup={togglePopup}/>
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
