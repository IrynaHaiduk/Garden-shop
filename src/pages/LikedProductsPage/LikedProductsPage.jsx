import React from 'react'
import { useSelector } from 'react-redux';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import LikedProducts from '@/components/LikedProducts/LikedProducts';

const LikedProductsPage = () => {

  const { likedProducts, filteredLikedProducts } = useSelector(state => state.products);

  return (
    <>
      <Breadcrumbs />
      <LikedProducts likedProducts={likedProducts} filteredLikedProducts={filteredLikedProducts} />
    </>
  )
}

export default LikedProductsPage
