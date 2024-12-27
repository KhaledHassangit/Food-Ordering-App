import { RootState } from "@/store/store";
import { Extra, Size } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
    name: string;
    id: string;
    image: string;
    basePrice: number;
    quantity?: number;
    size?: Size;
    extras?: Extra[];
}

type CartState = {
    items:CartItem[]
}
const initialState :CartState  = {
    items:[],
}
export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
})



export const {} = cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state:RootState) => state.cart.items