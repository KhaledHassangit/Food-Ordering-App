'use client';
import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import Link from '../link/link';
import { Routes } from '@/app/constants/enumbs';

const CartButton = () => {
  return (
    <Link href={`/${Routes.CART}`} className='block relative group'>
      <span className='absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center'>
        0
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  );
};

export default CartButton;