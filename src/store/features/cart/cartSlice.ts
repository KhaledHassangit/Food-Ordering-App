import { RootState } from "@/store/store";
import { Extra, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
const initialCartItems = localStorage.getItem('cartItems');

const initialState: CartState = {
  items: initialCartItems ? JSON.parse(initialCartItems) : [],
};

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCartItem:(state,action:PayloadAction<CartItem>)=>{
            const addedItem = state.items.find((item)=> item.id === action.payload.id)
            if(addedItem){
                addedItem.quantity = (addedItem.quantity || 0 ) +1 ;
                addedItem.size = action.payload.size
                addedItem.extras = action.payload.extras
            }else{
                state.items.push({...action.payload,quantity:1});
            }
        }  ,
        removeCartItem:(state,action:PayloadAction<{id:string}>) => {
            const item = state.items.find((item)=> item.id === action.payload.id)
            if(item && item.quantity){
                if(item.quantity === 1){
                    state.items = state.items.filter((item) => item.id !== action.payload.id)
                }else{
                    item.quantity! -= 1 ;
                }  
            }
        },
        removeItem :(state,action:PayloadAction<{id:string}>)=>{
            state.items = state.items.filter((item) => item.id !== action.payload.id)
        },
        resetCart :(state)=>{
            state.items = []
        }
    },
})



export const {addCartItem,removeCartItem ,removeItem,resetCart} = cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state:RootState) => state.cart.items