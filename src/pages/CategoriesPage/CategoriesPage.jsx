import React from 'react'
import Categories from '@/components/Categories/Categories'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/store/features/productSlice';


const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs />
      <Categories categories={categories} />
    </>
  )
}

export default CategoriesPage
