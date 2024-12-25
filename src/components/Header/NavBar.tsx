"use client"
import Link from '../link/link'
import { Pages, Routes } from '@/app/constants/enumbs'
import { Button, buttonVariants } from '../ui/button';
import { useState } from 'react';
import { Menu, XIcon } from 'lucide-react';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const links = [
    { id: crypto.randomUUID(), title: "Menu", href: Routes.MENU },
    { id: crypto.randomUUID(), title: "About", href: Routes.ABOUT },
    {
      id: crypto.randomUUID(),
      title: "Contact",
      href: Routes.CONTACT,
    },
    {
      id: crypto.randomUUID(),
      title: "Login",
      href: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];
  return (
    <nav className='flex flex-1 justify-end'>
      <Button
        variant='secondary'
        size='sm'
        className='absolute top-10 right-10 lg:hidden'
        onClick={() => setOpenMenu(true)}
      >
        <Menu className='!w-6 !h-6' />
        </Button>
        <ul
        className={`fixed lg:static ${
          openMenu ? 'left-0 z-50' : '-left-full'} top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}>
        <Button
          variant='secondary'
          size='sm'
          className='absolute top-10 right-10 lg:hidden'
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className='!w-6 !h-6' />
        </Button>
        {
          links.map((li) => {
            return (
              <li key={li.id}>
                <Link href={`/${li.href}`} className={`${li.href === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({ size: 'lg' })} !px-8 !rounded-full`
                  : 'hover:text-primary duration-200 transition-colors'} font-semibold}`}
                >
                  {li.title}
                </Link>
              </li>
            )
          })
        }

      </ul>
    </nav>
  )
}

export default NavBar