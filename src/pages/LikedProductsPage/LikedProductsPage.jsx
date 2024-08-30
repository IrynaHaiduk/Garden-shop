import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import LikedProducts from '@/components/LikedProducts/LikedProducts';
import { getLikedProducts } from '../../store/features/productSlice';
import { useEffect } from 'react';

const LikedProductsPage = () => {

  const dispatch = useDispatch();
  const { likedProducts, filteredLikedProducts } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getLikedProducts());
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs />
      <LikedProducts likedProducts={likedProducts} filteredLikedProducts={filteredLikedProducts} />
    </>
  )
}

export default LikedProductsPage
