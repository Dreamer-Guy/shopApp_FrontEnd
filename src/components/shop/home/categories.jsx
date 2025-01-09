import React from 'react';
import { useNavigate } from 'react-router-dom';
import laptopImg from '@/assets/categories/laptop.jpg';
import televisionImg from '@/assets/categories/television.jpg';
import phoneImg from '@/assets/categories/phone.jpg';
import watchImg from '@/assets/categories/watch.jpg';
import cameraImg from '@/assets/categories/camera.jpg';

const Categories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 1,
      name: 'Laptop',
      image: laptopImg,
      categoryId: 'laptop'
    },
    {
      id: 2,
      name: 'Television',
      image: televisionImg, 
      categoryId: 'television'
    },
    {
      id: 3,
      name: 'Phone',
      image: phoneImg,
      categoryId: 'phone'
    },
    {
      id: 4,
      name: 'Watch',
      image: watchImg,
      categoryId: 'watch'
    },
    {
      id: 5,
      name: 'Camera',
      image: cameraImg,
      categoryId: 'camera'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate('/shop/listing', {
      state: { 
        initialFilters: { category: [categoryId] },
        keepFilters: true
      },
      replace: true
    });
  };

  return (
    <div className="container pt-12">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 ml-5">
        shop by category
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="relative rounded-sm overflow-hidden group md:w-1/4 cursor-pointer"
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
              text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
