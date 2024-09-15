import React from 'react';
import "./ImagePopup.scss"

const ImagePopup = ({ togglePopup, product }) => {

    const handlePopupClose = (event) => {
        if (event.target.closest('.image-popup__img')) {
            return;
        }

        if (event.target.closest('.image-popup')) {
            togglePopup();
        }
    }

    return (
        <>
            {
                product && (
                    <div className='image-popup' onClick={(e) => handlePopupClose(e)}>
                        <div className="image-popup__content">
                            <div className="image-popup__img">
                                <img src={`${import.meta.env.APP_API_URL}/${product.image}`} alt={product.title} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ImagePopup
