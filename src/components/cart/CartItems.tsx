import { selectCartItems } from '@/store/features/cart/cartSlice'
import { useAppSelector } from '@/store/hooks'
import React from 'react'

const CartItems = () => {
    const cart = useAppSelector(selectCartItems)
  return (
    <div>CartItems</div>
  )
}

export default CartItems