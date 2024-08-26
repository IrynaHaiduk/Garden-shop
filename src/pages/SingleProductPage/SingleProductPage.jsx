import React from 'react'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Product from '@/components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '@/store/features/productSlice';
import { fetchCategoryById } from '../../store/features/productSlice';

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, categoryData } = useSelector(state => state.products);
  const categoryId = product?.categoryId;


  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [categoryId, dispatch]);

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <nav className="breadcrumbs__nav">

            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">
                  <span> Main Page</span>                
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="/categories" className="breadcrumbs__link">
                  <span>Categories</span>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/categories/${categoryId}`} className="breadcrumbs__link">
                  <span> {categoryData?.category?.title}</span>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  <span>{product?.title}</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div >
      <Product product={product} />
    </>
  )
}

export default SingleProductPage
