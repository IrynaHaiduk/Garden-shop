import React from 'react'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import AllProducts from '@/components/AllProducts/AllProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/features/productSlice';
import { useEffect } from 'react';

const AllProductsPage = () => {
 const dispatch = useDispatch();
    const { products, filteredProducts } = useSelector(state => state.products);
   
    useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);
  return (
   
    <>
      <Breadcrumbs/>
      <AllProducts products={products} filteredProducts={filteredProducts}/>
    </>
  )
}

export default AllProductsPage
