import React, { useState, useEffect, useMemo } from 'react';
import "./Product.scss";
import { useDispatch, useSelector } from 'react-redux';
import ImagePopup from '@/components/ImagePopup/ImagePopup';
import { addProductToCart, addProductToLiked, deleteProductFromLiked } from '@/store/features/productSlice';
import Counter from "@/components/Counter/Counter";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { likedProducts, cart } = useSelector(state => state.products);
  const [isProductInLiked, setIsProductInLiked] = useState("");
  const [isProductInCart, setIsProductInCart] = useState("");
  const [productCount, setProductCount] = useState(1);//// Product quantity in cart
  const [isExpanded, setIsExpanded] = useState(false);// Control for description expansion
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [charLimit, setCharLimit] = useState(150);// Character limit for product description
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Sync cart product count with the local state
  useEffect(() => {
    let foundProduct = cart?.find(item => item.id === product?.id);

    if (foundProduct?.count) {
      setProductCount(foundProduct.count)
    }else {
      setProductCount(1)
    }

  }, [cart, product?.id]);

  product = { ...product, count: productCount }

  const discountPercentage = useMemo(() => {
    return product?.discont_price
      ? Math.round(((product.price - product.discont_price) / product.price) * 100)
      : null;
  }, [product.price, product.discont_price]);

  const discountPrice = useMemo(() => {
    return product?.discont_price
      ? Number.isInteger(product.discont_price)
        ? product.discont_price
        : (Math.round(product.discont_price * 100) / 100).toFixed(2)
      : 0;
  }, [product.discont_price]);

  const productPrice = Number.isInteger(product?.price)
    ? product?.price
    : product?.price?.toFixed(2);

  const tabletWidth = 768;
  const desktopWidth = 1000;

   // Shorten the product description based on the character limit
  const truncatedText = product.description?.length > charLimit
    ? `${product.description.slice(0, charLimit)}...`
    : product.description;

  const countPrice = (price) => {
    const currentPrice = price * product.count;

    return Number.isInteger(currentPrice)
      ? currentPrice
      : (Math.round(currentPrice * 100) / 100).toFixed(2);
  };

  const incrementCountProduct = () => {
    setProductCount(prevState => prevState += 1);
  };

  const decrementCountProduct = () => {
    if (productCount > 1) {
      setProductCount(prevState => prevState -= 1);
    }
  };

  const toggleWishlist = (product, event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isProductInLiked) {
      dispatch(addProductToLiked(product));
    } else {
      dispatch(deleteProductFromLiked(product));
    }
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const addToCart = () => {
    dispatch(addProductToCart({ ...product, count: productCount }));
  };

  useEffect(() => {
    setIsProductInLiked(likedProducts?.some(item => item.id === product?.id));
  }, [likedProducts, product?.id]);

  useEffect(() => {
    setIsProductInCart(cart?.some(item => item.id === product?.id));
  }, [cart, product?.id]);

 // Handle screen resizing and adjust character limit for description
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);

      if (currentWidth < 768) {
        setCharLimit(140);
      } else if (currentWidth >= 768 && currentWidth < 1000) {
        setCharLimit(170);
      } else if (currentWidth >= 1000 && currentWidth < 1440) {
        setCharLimit(200);
      } else {
        setCharLimit(250);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);  // Cleanup listener on unmount
    };
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

  return (
    <>
      {product && (
        <section className="product">
          <div className="container">
            {windowWidth < tabletWidth && (
              <div className="product__header">
                <h2 className="product__title">{product.title}</h2>
                <button
                  className={`product__icon  ${isProductInLiked ? "product__icon--active" : ""}`}
                  onClick={(event) => toggleWishlist(product, event)}
                >
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
                <img src={`${import.meta.env.APP_API_URL}/${product.image}`} alt={product.title} />
                {windowWidth < tabletWidth && discountPercentage && (
                  <div className="product__percentage">
                    <span>-{discountPercentage}%</span>
                  </div>
                )}
              </div>
              <div className="product__content">
                {windowWidth >= tabletWidth && (
                  <div className="product__header">
                    <h2 className="product__title">{product.title}</h2>

                    <button
                      className={`product__icon  ${isProductInLiked ? "product__icon--active" : ""}`}
                      onClick={(event) => toggleWishlist(product, event)}
                    >
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
                {product.discont_price ? (
                  <div className="product__price">
                    <span className="product__price-new">${countPrice(discountPrice)}</span>
                    <span className="product__price-old">${countPrice(productPrice)}</span>
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
                  <Counter product={product} incrementCount={incrementCountProduct} decrementCount={decrementCountProduct} />

                  <button className="product__btn btn--bright" onClick={addToCart}>
                    Add to cart
                  </button>
                </div>
                {windowWidth >= desktopWidth && (
                  <div className="product__descr">
                    <h3 className="product__descr-title">Description</h3>
                    <p>{isExpanded ? product.description : truncatedText}</p>
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
                <p>{isExpanded ? product.description : truncatedText}</p>
                <button onClick={() => setIsExpanded(!isExpanded)} className="product__descr-btn">
                  {isExpanded ? 'Hide' : 'Read more'}
                </button>
              </div>
            )}
          </div>
          {isPopupVisible && (
            <ImagePopup togglePopup={togglePopup} product={product} />
          )}
        </section>
      )}
    </>
  );
};

export default Product;