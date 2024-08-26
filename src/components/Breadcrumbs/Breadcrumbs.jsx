

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ lastTitle }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((item) => item);

    const capitalizeFirstWord = (value) => {
        return value
            .split('-')
            .map((word, index) => index === 0
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                : word.toLowerCase()
            )
            .join(' ');
    };

    return (
        <div className="breadcrumbs">
            <div className="container">
                <nav className="breadcrumbs__nav">

                    <ul className="breadcrumbs__list">
                        <li className="breadcrumbs__item">
                            <Link to="/" className="breadcrumbs__link">
                                <span>
                                    Main Page
                                </span>
                            </Link>
                        </li>
                        {pathnames.map((value, index) => {
                            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={path} className="breadcrumbs__item">
                                    {isLast ? (
                                        <span className="breadcrumbs__link breadcrumbs__link--active">
                                            <span>
                                                {
                                                    !isNaN(+value)
                                                        ? lastTitle
                                                        : capitalizeFirstWord(value)
                                                }
                                            </span>


                                        </span>
                                    ) : (
                                        <Link to={path} className="breadcrumbs__link">
                                            <span>
                                              {capitalizeFirstWord(value)}  
                                            </span>                                          
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                </nav>
            </div>
        </div >
    );
};

export default Breadcrumbs;

