import React from 'react';

import formImg360 from "../../images/form/formBg-360.png";
import formImg480 from "../../images/form/formBg-480.png";
import formImg768 from "../../images/form/formBg-768.png";
import formImg1000 from "../../images/form/formBg-1000.png";
import formImg1440 from "../../images/form/formBg-1440.png";
import "./FormBlock.scss";
import DiscountForm from '../DiscountForm/DiscountForm';

const FormBlock = () => {
    return (
        <section className='form-block'>
            <div className="container">
                <div className="form-block__elem">
                    <h2 className="form-block__title">
                        5% off on the first order
                    </h2>
                    <div className="form-block__wrapper">
                        <DiscountForm />
                        <div className="form-block__img">
                            <picture>
                                <source media="(min-width: 1440px)" srcSet={formImg1440} />
                                <source media="(min-width: 1000px)" srcSet={formImg1000} />
                                <source media="(min-width: 768px)" srcSet={formImg768} />
                                <source media="(min-width: 480px)" srcSet={formImg480} />
                                <img src={formImg360} alt="bg" style={{ width: '100%' }} />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FormBlock
