import React from 'react'
import Cart from '@/components/Cart/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCartProducts } from '@/store/features/productSlice';

const CartPage = () => {
  const { cart } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts())
  }, [dispatch])

  return (
    <>
      <Cart cart={cart} />
    </>
  )
}

export default CartPage
