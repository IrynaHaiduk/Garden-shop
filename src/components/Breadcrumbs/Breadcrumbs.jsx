

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
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

    console.log(pathnames);

    return (
        <div className="breadcrumbs">
            <div className="container">
                <nav className="breadcrumbs__nav">

                    <ul className="breadcrumbs__list">
                        <li className="breadcrumbs__item">
                            <Link to="/" className="breadcrumbs__link">
                                Main Page
                            </Link>
                        </li>
                        {pathnames.map((value, index) => {
                            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={path} className="breadcrumbs__item">
                                    {isLast ? (
                                        <span className="breadcrumbs__link--active">
                                             {capitalizeFirstWord(value)}
                                        </span>
                                    ) : (
                                        <Link to={path} className="breadcrumbs__link">
                                              {capitalizeFirstWord(value)}
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

