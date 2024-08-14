import React from 'react'
import Promo from '@/components/Promo/Promo';
import CategoriesBlock from '@/components/CategoriesBlock/CategoriesBlock';
import DiscountProductsBlock from '@/components/DiscountProductsBlock/DiscountProductsBlock';
import FormBlock from '@/components/FormBlock/FormBlock';

const HomePage = () => {
  return (
    <div>
      <Promo />
      <CategoriesBlock />
      <FormBlock/>
      <DiscountProductsBlock/>
    </div>
  )
}

export default HomePage
