import React from 'react'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Product from '@/components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '@/store/features/productSlice';
import { fetchCategoryById } from '@/store/features/productSlice';

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, categoryData } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {

    if (product?.categoryId) {
      const categoryId = product?.categoryId;

      dispatch(fetchCategoryById(categoryId));
    }

  }, [product, productId, dispatch]);


  return (
    <>
      <Breadcrumbs categoryData={categoryData} lastTitle={product?.title} />
      <Product product={product} />
    </>
  )
}

export default SingleProductPage
