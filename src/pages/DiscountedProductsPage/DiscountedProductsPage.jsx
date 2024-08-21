import React from 'react'
import DiscountedProducts from '@/components/DiscountedProducts/DiscountedProducts'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { fetchDiscountedProducts } from '@/store/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const DiscountedProductsPage = () => {
  const dispatch = useDispatch();
  const { discountedProducts, filteredDiscountedProducts } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(fetchDiscountedProducts());
}, [dispatch]);

  return (
    <>
      <Breadcrumbs />
      <DiscountedProducts discountedProducts={discountedProducts} filteredDiscountedProducts={filteredDiscountedProducts} />
    </>
  )
}

export default DiscountedProductsPage
