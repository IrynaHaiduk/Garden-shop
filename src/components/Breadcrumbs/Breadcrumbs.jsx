import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ lastTitle, categoryData }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((item) => item);

    // Capitalize first word function
    const capitalizeFirstWord = (value) => {
        if (!value || typeof value !== 'string') return '';  // Check if value is a valid string

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
                        {/* First link to Main Page */}
                        <li className="breadcrumbs__item">
                            <Link to="/" className="breadcrumbs__link">
                                <span>Main Page</span>
                            </Link>
                        </li>

                        {/* Iterate over path segments */}
                        {pathnames.map((value, index) => {
                            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            // If we have categoryData, skip adding "Products" segment
                            if (categoryData && value === 'products') {
                                return null;  // Skip rendering "Products"
                            }

                            if (isLast) {
                                return (
                                    <React.Fragment key={path}>
                                        {/* If categoryData exists, display category information */}
                                        {categoryData && (
                                            <>
                                                <li className="breadcrumbs__item">
                                                    <Link to="/categories" className="breadcrumbs__link">
                                                        <span>Categories</span>
                                                    </Link>
                                                </li>
                                                <li className="breadcrumbs__item">
                                                    <Link to={`/categories/${categoryData?.category?.id}`} className="breadcrumbs__link">
                                                        <span>{capitalizeFirstWord(categoryData?.category?.title)}</span>
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        {/* Last breadcrumb link (active, non-clickable) */}
                                        <li className="breadcrumbs__item">
                                            <span className="breadcrumbs__link breadcrumbs__link--active">
                                                <span>
                                                    {!isNaN(+value) ? lastTitle : capitalizeFirstWord(value)}
                                                </span>
                                            </span>
                                        </li>
                                    </React.Fragment>
                                );
                            }

                            // Render other links normally
                            return (
                                <li key={path} className="breadcrumbs__item">
                                    <Link to={path} className="breadcrumbs__link">
                                        <span>{capitalizeFirstWord(value)}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumbs;
