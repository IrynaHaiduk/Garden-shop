import React from 'react';
import "./ErrorBlock.scss";
import { Link } from 'react-router-dom';
import errorImg from "@/images/errorImg.png";
import errorImg2x from "@/images/errorImg_2x.png";

const ErrorBlock = () => {
  return (
    <section className='error-block'>
      <div className="container">
        <div className="error-block__wrapper">
          <div className="error-block__img">
            <img 
            src={errorImg}  
            srcSet={`${errorImg} 1x, ${errorImg2x} 2x`}  
            alt="error 404" />
          </div>
          <h1 className='error-block__title'>
            Page Not Found
          </h1>
          <div className="error-block__content">
            <p>
              We're sorry, the page you requested could not be found.
            </p>
            <p>
              Please go back to the homepage.
            </p>
          </div>
          <Link to="/" className='error-block__btn btn btn--bright'>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorBlock
