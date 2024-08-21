import React from 'react'
import CategoriesProducts from '@/components/CategoriesProducts/CategoriesProducts'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCategoryById } from '@/store/features/productSlice';

const ProductsFromCategoryPage = () => {

  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { categoryData, filteredCategoryData } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs lastTitle={categoryData?.category?.title} />
      <CategoriesProducts categoryData={categoryData} filteredCategoryData={filteredCategoryData}/>
    </>

  )
}

export default ProductsFromCategoryPage
