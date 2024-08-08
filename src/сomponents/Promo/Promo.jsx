import React from 'react'
import { Link } from 'react-router-dom';
import promoBg from "../../images/promo-bg.jpg";
import "./Promo.scss";

const Promo = () => {
    return (
        <section className="promo">
            <h1 className="visually-hidden">
                Online home and garden shop
            </h1>
            <div className="promo__bg">
                <img src={promoBg} className="promo__bg-img" alt="promo bg" role="none" />
            </div>
            <div className="container">
                <h2 className="promo__title">
                    Amazing Discounts on Garden Products!
                </h2>
                <Link to="/discounted-products" className="promo__btn btn btn--bright">
                    Check out
                </Link>
            </div>
        </section>
    )
}

export default Promo
