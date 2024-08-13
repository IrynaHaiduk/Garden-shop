import React from 'react'
import Promo from '../../сomponents/Promo/Promo';
import CategoriesBlock from '../../сomponents/CategoriesBlock/CategoriesBlock';
import DiscountProductsBlock from '../../сomponents/DiscountProductsBlock/DiscountProductsBlock';
import FormBlock from '../../сomponents/FormBlock/FormBlock';

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
