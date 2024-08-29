import React from 'react';
import "./UtilityBar.scss";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UtilityBar = () => {

  const {cart, likedProducts} = useSelector(state => state.products);


  return (
    <div className="utility-bar">
      <ul className="utility-bar__list">
        <li className="utility-bar__item">
          <Link to="/liked-products" className="utility-bar__link" aria-label='Go to liked products'>
            <div className="utility-bar__count">
              <span>{likedProducts?.length}</span>
            </div>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_18393_8021)">
                <path
                  d="M39.4 32.2222C42.678 29.14 46 25.4456 46 20.6111C46 17.5317 44.7252 14.5783 42.456 12.4008C40.1868 10.2233 37.1091 9 33.9 9C30.028 9 27.3 10.0556 24 13.2222C20.7 10.0556 17.972 9 14.1 9C10.8909 9 7.8132 10.2233 5.54401 12.4008C3.27482 14.5783 2 17.5317 2 20.6111C2 25.4667 5.3 29.1611 8.6 32.2222L24 47L39.4 32.2222Z"
                  stroke="#424436"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_18393_8021">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </li>
        <li>
          <Link to="/cart" className="utility-bar__link utility-bar__link--cart" aria-label='Go to the cart'>
            <div className="utility-bar__count">
              <span>{cart?.length}</span>
            </div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 0C20.4961 0 16.0565 4.37372 16.0565 9.79592V11.7551H8.19492L8.10169 12.6122L4.12429 46.898L4 48H48L47.8757 46.898L43.8983 12.6122L43.8051 11.7551H35.9435V9.79592C35.9435 4.37372 31.5039 0 26 0ZM26 1.95918C30.4396 1.95918 33.9548 5.42219 33.9548 9.79592V11.7551H18.0452V9.79592C18.0452 5.42219 21.5604 1.95918 26 1.95918ZM9.99717 13.7143H16.0565V15.949C15.4622 16.2895 15.0621 16.9094 15.0621 17.6327C15.0621 18.7156 15.9516 19.5918 17.0508 19.5918C18.1501 19.5918 19.0395 18.7156 19.0395 17.6327C19.0395 16.9094 18.6395 16.2895 18.0452 15.949V13.7143H33.9548V15.949C33.3605 16.2895 32.9605 16.9094 32.9605 17.6327C32.9605 18.7156 33.8499 19.5918 34.9492 19.5918C36.0484 19.5918 36.9379 18.7156 36.9379 17.6327C36.9379 16.9094 36.5378 16.2895 35.9435 15.949V13.7143H42.0028L45.7627 46.0408H6.23729L9.99717 13.7143Z" fill="#424436" />
            </svg>
          </Link>
        </li>
      </ul>
    </div>

  )
}

export default UtilityBar
