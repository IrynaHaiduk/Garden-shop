import React from 'react';
import formImg360 from "@/images/form/formBg-360.png";
import formImg360_2x from "@/images/form/formBg-360_2x.png";
import formImg480 from "@/images/form/formBg-480.png";
import formImg480_2x from "@/images/form/formBg-480_2x.png";
import formImg768 from "@/images/form/formBg-768.png";
import formImg768_2x from "@/images/form/formBg-768_2x.png";
import formImg1000 from "@/images/form/formBg-1000.png";
import formImg1000_2x from "@/images/form/formBg-1000_2x.png";
import formImg1440 from "@/images/form/formBg-1440.png";
import formImg1440_2x from "@/images/form/formBg-1440_2x.png";
import "./FormBlock.scss";
import DiscountForm from '@/components/DiscountForm/DiscountForm';

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
                                <source
                                    media="(min-width: 1440px)"
                                    srcSet={`${formImg1440} 1x, ${formImg1440_2x} 2x`}
                                />
                                <source
                                    media="(min-width: 1000px)"
                                    srcSet={`${formImg1000} 1x, ${formImg1000_2x} 2x`}
                                />
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={`${formImg768} 1x, ${formImg768_2x} 2x`}
                                />
                                <source
                                    media="(min-width: 480px)"
                                    srcSet={`${formImg480} 1x, ${formImg480_2x} 2x`}
                                />
                                <img
                                    src={formImg360}
                                    srcSet={`${formImg360} 1x, ${formImg360_2x} 2x`}
                                    alt="bg"
                                    role="none" 
                                    aria-hidden="true"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FormBlock
