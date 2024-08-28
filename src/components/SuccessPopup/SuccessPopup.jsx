import React from 'react';
import "./SuccessPopup.scss";

const SuccessPopup = ({ toggleFormDataSent }) => {

    const handlePopupClose = (event) => {

        if (event.target.closest('.success-popup__card')) {
            return;
        }

        if (event.target.closest('.success-popup')) {
            toggleFormDataSent();
        }
    }

    return (
        <div className='success-popup' onClick={(e) => handlePopupClose(e)}>
            <div className="success-popup__card">
                <div className="success-popup__wrapper">
                    <button onClick={toggleFormDataSent} className="success-popup__btn-close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                        >
                            <path
                                d="M33 11L11 33"
                                stroke="#FFFFF1"
                                strokeWidth="3.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11 11L33 33"
                                stroke="#FFFFF1"
                                strokeWidth="3.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <h2 className="success-popup__title">
                        Congratulations!
                    </h2>
                </div>
                <div className="success-popup__info">
                    <p>
                        Your order has been successfully placed on the website.
                    </p>
                    <p>
                        A manager will contact you shortly to confirm your order.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default SuccessPopup
