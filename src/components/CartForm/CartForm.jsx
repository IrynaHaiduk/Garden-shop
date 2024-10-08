import React from 'react';
import "./CartForm.scss";
import iconError from "@/images/icons/icon-error.svg"
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { clearCard, sendOrderData } from '@/store/features/productSlice';
import { useDispatch } from 'react-redux';
import SuccessPopup from '@/components/SuccessPopup/SuccessPopup';

const CartForm = ({ cart }) => {
    const dispatch = useDispatch();
    const [totalSum, setTotalSum] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const [formDataSent, setFormDataSent] = useState(false);

    const toggleFormDataSent = () => {
        setFormDataSent(prevState => !prevState);
    }

    const submitForm = async (formData) => {
        // Dispatching action to send order data (user data and cart)
        try {
            const result = await dispatch(sendOrderData({ userData: formData, orderData: cart })).unwrap();

            if (result) {
                toggleFormDataSent(); // Show success popup if order submission is successful
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };


    useEffect(() => {
        let sum = cart.reduce((acc, product) => {
            const price = product.discont_price || product.price;
            return acc + (price * product.count);
        }, 0);

        sum = Number.isInteger(sum) ? sum.toFixed(2) : (Math.round(sum * 100) / 100).toFixed(2);

        setTotalSum(sum);
    }, [cart]);


    return (

        <>
            {
                cart && (
                    <div className='cart-form'>
                        <h3 className='cart-form__title'>
                            Order details
                        </h3>
                        <div className="cart-form__info">
                            <p>{cart.length} items</p>
                            <div className="cart-form__wrap">
                                <p>Total</p>
                                <div className="cart-form__price">
                                    ${totalSum}
                                </div>
                            </div>
                        </div>
                        <form
                            className="cart-form__form"
                            onSubmit={handleSubmit(submitForm)}
                        >
                            <div className="cart-form__item">
                                <label htmlFor="name" className="cart-form__label visually-hidden">Name:</label>
                                <input
                                    {...register("name", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\s]+$/,
                                            message: "Wrong input. Try again"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "The length should be at least 3 characters"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "The length should be maximum 20 characters"
                                        },

                                    })}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="cart-form__input"
                                    placeholder='Name'
                                />

                                {
                                    errors.name && (
                                        <div className="cart-form__error">
                                            <img src={iconError} alt="error" />
                                            <p>{errors.name?.message}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="cart-form__item">
                                <label htmlFor="phone" className="cart-form__label visually-hidden">Phone number:</label>
                                <input
                                    {...register("phone", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^\+?[1-9]\d{1,14}$/,
                                            message: "Wrong input. Try again"
                                        }
                                    })}
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="cart-form__input"
                                    placeholder='Phone number'
                                />
                                {
                                    errors.phone && (
                                        <div className="cart-form__error">
                                            <img src={iconError} alt="error" />
                                            <p>{errors.phone?.message}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="cart-form__item">
                                <label htmlFor="email" className="cart-form__label visually-hidden">Email:</label>
                                <input
                                    {...register("email", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Wrong input. Try again"
                                        },
                                    })}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="cart-form__input"
                                    placeholder='Email'
                                />
                                {
                                    errors.email && (
                                        <div className="cart-form__error">
                                            <img src={iconError} alt="error" />
                                            <p>{errors.email?.message}</p>
                                        </div>
                                    )
                                }
                            </div>

                            <button type="submit" className="cart-form__btn btn--bright" disabled={isSubmitting}>
                                Order
                            </button>

                        </form>

                        {
                            formDataSent && <SuccessPopup 
                            toggleFormDataSent={toggleFormDataSent} 
                            reset={() => reset()}
                            clearCard={() => dispatch(clearCard())}
                            />
                        }

                    </div>
                )
            }
        </>
    )
}

export default CartForm
