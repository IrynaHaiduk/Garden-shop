import React from 'react'
import Cart from '@/components/Cart/Cart';
import { useSelector} from 'react-redux';

const CartPage = () => {
  const { cart } = useSelector(state => state.products);

  return (
    <>
      <Cart cart={cart} />
    </>
  )
}

export default CartPage;
