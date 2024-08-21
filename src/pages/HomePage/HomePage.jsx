import React from 'react'
import Promo from '@/components/Promo/Promo';
import CategoriesBlock from '@/components/CategoriesBlock/CategoriesBlock';
import DiscountProductsBlock from '@/components/DiscountProductsBlock/DiscountProductsBlock';
import FormBlock from '@/components/FormBlock/FormBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchDiscountedProducts } from '../../store/features/productSlice';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useDispatch();

  const { categories, discountedProducts } = useSelector(state => state.products);

  useEffect(() => {
      dispatch(fetchCategories());
      dispatch(fetchDiscountedProducts());
  }, [dispatch]);

  return (
    <div>
      <Promo />
      <CategoriesBlock categories={categories}/>
      <FormBlock/>
      <DiscountProductsBlock discountedProducts={discountedProducts}/>
    </div>
  )
}

export default HomePage
