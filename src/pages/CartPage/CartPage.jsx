import React from 'react'
import Cart from '@/components/Cart/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCartProducts } from '@/store/features/productSlice';

const CartPage = ({cart}) => {

  return (
    <>
      <Cart cart={cart} />
    </>
  )
}

export default CartPage
