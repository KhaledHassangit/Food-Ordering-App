import Link from '@/components/link/link';
import { buttonVariants } from '@/components/ui/button';
// import { getCurrentLocale } from '@/lib/getCurrentLocale';
// import getTrans from '@/lib/translation';
import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';
import { Routes } from '../constants/enumbs';

const Hero = () => {
    return (
        <section className='section-gap'>
            <div className='container grid grid-cols-1 md:grid-cols-2 '>
                <div className='md:py-12'>
                    <h1 className='text-4xl font-semibold'>hero.title</h1>
                    <p className='text-accent my-4'>hero.description</p>
                    <div className='flex items-center gap-4'>
                        <Link
                            href={`/${Routes.MENU}`}
                            className={`${buttonVariants({
                                size: 'lg',
                            })} space-x-2 !px-4 !rounded-full uppercase`}
                        >
                            orderNow
                            <ArrowRightCircle
                                className={`!w-5 !h-5 'rotate-180 ' : ''
                                    }`}
                            />
                        </Link>
                        <Link
                            href={`/${Routes.ABOUT}`}
                            className='flex gap-2 items-center text-black hover:text-primary duration-200 transition-colors font-semibold'
                        >
                            hero.learnMore
                            <ArrowRightCircle
                                className={`!w-5 !h-5 'rotate-180 ' : ''
                                    }`}
                            />
                        </Link>
                    </div>
                </div>
                <div className='relative hidden md:block'>
                    <Image src="/assets/pizza.png" className='object-contain' alt='Pizza' fill priority loading='eager' />
                </div>
            </div>
        </section>
    )
}

export default Hero