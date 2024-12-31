import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
import ShoppingFooter from './footer'

const ShoppingLayout = () => {
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

export default ShoppingLayout;