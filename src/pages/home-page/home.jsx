import React from 'react';
import Banner from '@/components/shop/home/banner';
import Features from '@/components/shop/home/feature';
import HomeSlider from '@/components/shop/home/slider';
import Categories from '@/components/shop/home/categories';
import TopProducts from '@/components/shop/home/topProducts';
import LatestProducts from '@/components/shop/home/latestProducts';

const ShoppingHome = () => {
  return (
    <div>
      <Banner />
      <Features />
      <HomeSlider />
      <Categories />
      <TopProducts />
      <LatestProducts />
    </div>
  );
};

export default ShoppingHome;