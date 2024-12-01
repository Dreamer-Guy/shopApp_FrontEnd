import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ShoppingHome = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/all`, {
          params: {
            page,
            rowPerPage: 12,
            sort: 'createdAt-desc',
            minPrice: 0,
            maxPrice: Number.MAX_VALUE
          },
          withCredentials: true
        });
        
        if (response.data.products) {
          setProducts(response.data.products);
          setTotalPages(Math.ceil(response.data.totalProducts / 12));
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link 
            key={product._id}
            to={`/shop/product/${product._id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="p-4">
              <div className="aspect-square overflow-hidden rounded-md mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-bold text-gray-800 truncate mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-semibold">${product.salePrice}</p>
                {product.salePrice < product.price && (
                  <p className="text-gray-400 line-through text-sm">${product.price}</p>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
              {reviews[product._id]?.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold mb-2">Latest Review:</p>
                  <div className="flex items-start space-x-2">
                    <img 
                      src={reviews[product._id][0].user.avatar || '/default-avatar.png'} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{reviews[product._id][0].user.name}</p>
                      <p className="text-sm text-gray-600">{reviews[product._id][0].comment}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ShoppingHome