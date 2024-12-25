import React from 'react'
import Menu from '@/components/menu/Menu'
import MainHeading from '@/components/Mian-Heading/Main-Heading'
import { getBestSellers } from '@/server/db/products'

const  BestSellers = async () => {

  const bestSellers = await getBestSellers()

  return ( 
    <section className='section-gap'>
        <div className='container'>
            <div className='text-center mb-8'>
                <MainHeading subTitle='CheckOut' title='Our Best Sellers'/>
            </div>
          <Menu items={bestSellers}/>
        </div>
    </section>
  )
}

export default BestSellers