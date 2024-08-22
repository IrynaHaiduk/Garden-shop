import React from 'react';
import "./Product.scss";

const Product = ({ product }) => {

  console.log(product);



  return (
    <> {
      product && (
        <section className="product">
          <div className="container">

            <div className="product__header">
              <h2 className="product__title">
                {product.title}
              </h2>
              <div className="product__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M39.4 25.2222C42.678 22.14 46 18.4456 46 13.6111C46 10.5317 44.7252 7.57832 42.456 5.40082C40.1868 3.22331 37.1091 2 33.9 2C30.028 2 27.3 3.05556 24 6.22222C20.7 3.05556 17.972 2 14.1 2C10.8909 2 7.8132 3.22331 5.54401 5.40082C3.27482 7.57832 2 10.5317 2 13.6111C2 18.4667 5.3 22.1611 8.6 25.2222L24 40L39.4 25.2222Z"
                    fill="white"
                    stroke="#424436"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="product__wrapper">
              <div className="product__image">
                <img src={`${import.meta.env.APP_API_URL}/${product.image}`} alt={product.title} />
              </div>
              <div className="product__content">

              </div>
            </div>
          </div>
        </section>
      )
    }
    </>
  )
}

export default Product
