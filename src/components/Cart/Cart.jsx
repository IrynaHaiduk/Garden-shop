import React from 'react'
import Heading from '@/components/Heading/Heading';
import "./Cart.scss";
import { Link } from 'react-router-dom';
import ProductBlock from '../ProductBlock/ProductBlock';
import CartForm from '@/components/CartForm/CartForm';


const Cart = ({ cart }) => {
    console.log(cart);
    return (
        <>
            {
                <section className="cart">
                    <div className="container">
                        <Heading title="Shopping cart" subtitle="Back to the store" link=" " />
                        {cart && cart.length > 0 ? (
                            <div className="cart__wrapper">
                                <ul className="cart__list">
                                    {cart.map(product => (
                                        <li key={product.id} className="cart__item">
                                            <ProductBlock product={product} />
                                        </li>
                                    ))
                                    }
                                </ul>
                                <div className="cart__form">
                                    <CartForm cart={cart} />
                                </div>
                            </div>
                        ) : (
                            <div className="cart__container">
                                <div className="cart__info">
                                    <p>
                                        Looks like you have no items in your basket currently.
                                    </p>
                                </div>
                                <Link to="/all-products" className='cart__link btn--bright'>
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                        <Link to="/" className='cart__btn btn--light'>
                            Back to the store
                        </Link>
                    </div>
                </section>
            }
        </>
    )
}

export default Cart
