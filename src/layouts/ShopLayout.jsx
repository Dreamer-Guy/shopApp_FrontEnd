import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from '@/components/shop/header'
import ShoppingFooter from '@/components/shop/footer'

const ShopLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <ShoppingHeader />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        <ShoppingFooter/>
    </div>
  )
}

export default ShopLayout;