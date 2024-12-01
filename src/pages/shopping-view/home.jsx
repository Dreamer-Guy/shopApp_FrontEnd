import React from 'react'
import { Link } from 'react-router-dom'
import ProductsGrid from '@/components/shopping-view/productGrid';
 
const mockProduct = {
  _id: 1,
  type: "Electronics",
  name: "Wireless Earbuds",
  price: 99.99,
  salePrice: 79.99,
  brand: "Brand A",
  rating: 4.5,
  totalStock: 150,
  image: "https://via.placeholder.com/150",
  description: "High-quality wireless earbuds with noise cancellation"
};

const ShoppingHome = () => {
  const handleProductClick = (product) => {
    // Store product info in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  return (
    <div>
      <Link 
        to={`/shop/detail/${mockProduct._id}`} 
        onClick={() => handleProductClick(mockProduct)}
        className="block"
      >
        <div className="border p-4 rounded hover:shadow-lg transition">
          <img 
            src={mockProduct.image} 
            alt={mockProduct.name} 
            className="w-full h-48 object-cover"
          />
          <h3 className="mt-2 font-bold">{mockProduct.name}</h3>
          <p className="text-green-600">${mockProduct.salePrice}</p>
        </div>
      </Link>
    </div>
  )
}

export default ShoppingHome