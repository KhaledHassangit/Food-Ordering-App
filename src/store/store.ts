import { Environments } from '@/app/constants/enumbs'
import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  devTools:process.env.NODE_ENV === Environments.DEV
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch