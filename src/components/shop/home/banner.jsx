import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '@/assets/banner.jpg';

const Banner = () => {
  return (
    <div 
      className="relative bg-cover bg-no-repeat bg-center h-[600px] flex items-center" 
      style={{ 
        backgroundImage: `url(${bannerImg})`,
        backgroundColor: 'rgba(220, 237, 225, 0.2)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl text-gray-800 font-bold mb-6 leading-tight">
            Best Place To Shop
            <br />
            <span className="text-primary">Smart Device</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            We always strive to bring the highest quality products to our users
          </p>

          <Link 
            to="/shop/listing"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg
              font-semibold text-lg transition-all duration-300
              hover:bg-transparent hover:text-primary border-2 border-primary
              hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"
        style={{ mixBlendMode: 'overlay' }}
      />
    </div>
  );
};

export default Banner;