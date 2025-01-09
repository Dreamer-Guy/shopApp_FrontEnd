import React from 'react';
import Banner from '@/components/shop/home/banner';
import Features from '@/components/shop/home/feature';
import HomeSlider from '@/components/shop/home/slider';
import Categories from '@/components/shop/home/categories';
import TopProducts from '@/components/shop/home/topProducts';

const ShoppingHome = () => {
  return (
    <div>
      <Banner />
      <Features />
      <HomeSlider />
      <Categories />
      <TopProducts />
    </div>
  );
};

export default ShoppingHome;