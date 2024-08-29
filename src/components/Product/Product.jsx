import React, { useState, useEffect } from 'react';
import "./Product.scss";
import { useDispatch, useSelector } from 'react-redux';
import ImagePopup from '../ImagePopup/ImagePopup';
import { addProductToCart, addProductToLiked, decrementProductCart, deleteProductFromLiked, incrementProductCart } from '../../store/features/productSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const isProductLiked = useSelector(state => state.product?.likedProducts.includes(product));

  const productWithCount = {
    ...product,
    count: product?.count || 1,
    isLiked: isProductLiked,
  };

  let discountPercentage = null;
  let discountPrice = 0;

  if (productWithCount?.discont_price) {
    discountPercentage = Math.round(((productWithCount.price - productWithCount.discont_price) / productWithCount.price) * 100);
    discountPrice = Number.isInteger(productWithCount.discont_price)
      ? productWithCount.discont_price
      : (Math.round(productWithCount.discont_price * 100) / 100).toFixed(2);
  }

  const productPrice = Number.isInteger(productWithCount?.price)
    ? productWithCount?.price
    : productWithCount?.price?.toFixed(2);

  const [count, setCount] = useState(productWithCount.count); // Синхронизируем локальное состояние с productWithCount.count
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [charLimit, setCharLimit] = useState(150);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const tabletWidth = 768;
  const desktopWidth = 1000;

  const truncatedText = productWithCount.description?.length > charLimit
    ? `${productWithCount.description.slice(0, charLimit)}...`
    : productWithCount.description;

  const countPrice = (price) => {
    const currentPrice = price * count;
    return Number.isInteger(currentPrice)
      ? currentPrice
      : (Math.round(currentPrice * 100) / 100).toFixed(2);
  };

  const incrementCountProduct = (productId) => {
    dispatch(incrementProductCart(productId));
    setCount(count + 1);
  };

  const decrementCountProduct = (productId) => {
    if (count > 1) {
      dispatch(decrementProductCart(productId));
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth < 768) {
        setCharLimit(140);
      } else if (currentWidth >= 768 && currentWidth < 1000) {
        setCharLimit(170);
      } else if (currentWidth >= 1000 && currentWidth < 1440) {
        setCharLimit(200);
      } else {
        setCharLimit(250);
      }

      setWindowWidth(currentWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const addToCart = () => {
    dispatch(addProductToCart({ ...productWithCount, count }));
  };


  /*   const toggleWishlist = (product, event) => {
      event.stopPropagation();
      event.preventDefault();
  
      if (!isLiked) {
        dispatch(addProductToLiked({ ...product, isLiked: true, isInCart }));
      } else {
        dispatch(deleteProductFromLiked(product));
      }
  
      setIsLiked(!isLiked);
    }; */

  return (
    <>
      {productWithCount && (
        <section className="product">
          <div className="container">
            {windowWidth < tabletWidth && (
              <div className="product__header">
                <h2 className="product__title">{productWithCount.title}</h2>
                <button className={`product__icon  ${productWithCount.isLiked ? "product__icon--active" : ""}`}>
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
                </button>
              </div>
            )}
            <div className="product__wrapper">
              <div className="product__image" onClick={togglePopup}>
                <img src={`${import.meta.env.APP_API_URL}/${productWithCount.image}`} alt={productWithCount.title} />
                {windowWidth < tabletWidth && discountPercentage && (
                  <div className="product__percentage">
                    <span>-{discountPercentage}%</span>
                  </div>
                )}
              </div>
              <div className="product__content">
                {windowWidth >= tabletWidth && (
                  <div className="product__header">
                    <h2 className="product__title">{productWithCount.title}</h2>
                    <button className="product__icon">
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
                    </button>
                  </div>
                )}
                {productWithCount.discont_price ? (
                  <div className="product__price">
                    <span className="product__price-new">${countPrice(discountPrice)}</span>
                    <span className="product__price-old">${productPrice}</span>
                    {windowWidth >= tabletWidth && discountPercentage && (
                      <div className="product__percentage">
                        <span>-{discountPercentage}%</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="product__price">
                    <span className="product__price-new">${countPrice(productPrice)}</span>
                  </div>
                )}
                <div className="product__wrap">
                  <div className="product__count">
                    <button onClick={() => decrementCountProduct(productWithCount.id)}></button>
                    <input type="text" value={count} disabled readOnly />
                    <button onClick={() => incrementCountProduct(productWithCount.id)}></button>
                  </div>
                  <button className="product__btn btn--bright" onClick={addToCart}>
                    Add to cart
                  </button>
                </div>
                {windowWidth >= desktopWidth && (
                  <div className="product__descr">
                    <h3 className="product__descr-title">Description</h3>
                    <p>{isExpanded ? productWithCount.description : truncatedText}</p>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="product__descr-btn">
                      {isExpanded ? 'Hide' : 'Read more'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {windowWidth < desktopWidth && (
              <div className="product__descr">
                <h3 className="product__descr-title">Description</h3>
                <p>{isExpanded ? productWithCount.description : truncatedText}</p>
                <button onClick={() => setIsExpanded(!isExpanded)} className="product__descr-btn">
                  {isExpanded ? 'Hide' : 'Read more'}
                </button>
              </div>
            )}
          </div>
          {isPopupVisible && (
            <ImagePopup togglePopup={togglePopup} product={productWithCount} />
          )}
        </section>
      )}
    </>
  );
};

export default Product;
