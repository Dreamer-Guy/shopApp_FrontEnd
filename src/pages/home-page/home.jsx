import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '@/components/shop/home/banner';
import Features from '@/components/shop/home/feature';
import HomeSlider from '@/components/shop/home/slider';
import Categories from '@/components/shop/home/categories';
import TopProducts from '@/components/shop/home/topProducts';
import LatestProducts from '@/components/shop/home/latestProducts';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeletonView = () => {
  return (
    <div>
      {/* Banner */}
      <div className="relative h-[600px]">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Features */}
      <div className="container py-16 mx-auto px-4">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          {Array(3).fill().map((i) => (
            <Skeleton key={i} className="h-32 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(5).fill().map((i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Products */}
      {Array(2).fill().map((section) => (
        <div key={section} className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4).fill().map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <LoadingSkeletonView />;
  }

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