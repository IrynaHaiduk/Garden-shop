import React from 'react';
import { useForm } from "react-hook-form"
import "./DiscountForm.scss";
import iconError from "@/images/icons/icon-error.svg"
import { useState, useEffect } from 'react';
import { sendDiscountData } from '@/store/features/productSlice';
import { useDispatch } from 'react-redux';

const DiscountForm = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);


    const submitForm = async (formData) => {
        try {
            const result = await dispatch(sendDiscountData(formData)).unwrap();

            if (result) {
                setIsSubmitted(true);
                setShowMessage(true);
                setTimeout(() => {
                    reset();
                }, 2000);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="form-block__form discount-form"
        >
            <div className="discount-form__item">
                <label htmlFor="name" className="discount-form__label visually-hidden">Name:</label>
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
                    className="discount-form__input"
                    placeholder='Name'
                />

                {
                    errors.name && (
                        <div className="discount-form__error">
                            <img src={iconError} alt="error" />
                            <p>{errors.name?.message}</p>
                        </div>
                    )
                }


            </div>
            <div className="discount-form__item">
                <label htmlFor="phone" className="discount-form__label visually-hidden">Phone number:</label>
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
                    className="discount-form__input"
                    placeholder='Phone number'
                />
                {
                    errors.phone && (
                        <div className="discount-form__error">
                            <img src={iconError} alt="error" />
                            <p>{errors.phone?.message}</p>
                        </div>
                    )
                }
            </div>
            <div className="discount-form__item">
                <label htmlFor="email" className="discount-form__label visually-hidden">Email:</label>
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
                    className="discount-form__input"
                    placeholder='Email'
                />
                {
                    errors.email && (
                        <div className="discount-form__error">
                            <img src={iconError} alt="error" />
                            <p>{errors.email?.message}</p>
                        </div>
                    )
                }
            </div>
            {showMessage && <div className="discount-form__success">
                <p>Data was sent successfully!</p>
            </div>
            }

            <button type="submit" className="discount-form__btn btn--white" disabled={isSubmitting}>
                Get a discount
            </button>

        </form>
    )
}

export default DiscountForm
