import React from 'react'
import Link from '../link/link';
import { Routes } from '@/app/constants/enumbs';
import NavBar from './NavBar';
import CartButton from './CartButton';

const Header = () => {
    return (
        <header className='py-4 md:py-6'>
            <div className='container flex justify-between items-center '>
                <Link href={Routes.ROOT} className='text-primary font-semibold text-2xl'>
                🍕 Pizza
                </Link>
                <NavBar/>
                <CartButton />
            </div>
        </header>
    )
}

export default Header;