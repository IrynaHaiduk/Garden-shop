import React from 'react'
import Promo from '../../сomponents/Promo/Promo';
import CategoriesBlock from '../../сomponents/CategoriesBlock/CategoriesBlock';
import DiscountProductsBlock from '../../сomponents/DiscountProductsBlock/DiscountProductsBlock';

const HomePage = () => {
  return (
    <div>
      <Promo />
      <CategoriesBlock />
      <DiscountProductsBlock/>
    </div>
  )
}

export default HomePage
