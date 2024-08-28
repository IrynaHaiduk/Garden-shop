import React from 'react'
import Heading from '@/components/Heading/Heading';
import "./Cart.scss";
import { Link } from 'react-router-dom';
import ProductBlock from '../ProductBlock/ProductBlock';
import CartForm from '@/components/CartForm/CartForm';


const Cart = ({ cart }) => {
    return (
        <>
            {

                <section className="cart">
                    <div className="container">
                        <Heading title="Shopping cart" subtitle="Back to the store" link="all-products" />
                        <div className="cart__wrapper">
                            {
                                cart &&
                                <ul className="cart__list">
                                    {cart.map(product => (
                                        <li key={product.id} className="cart__item">
                                            <ProductBlock product={product} />
                                        </li>
                                    ))
                                    }
                                </ul>
                            }
                            <div className="cart__form">
                                <CartForm cart={cart}/>
                                <Link to="/" className='cart__btn btn--light'>
                                    Back to the store
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            }
        </>
    )
}

export default Cart
