import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ProductReviews from '@/components/shopping-view/ProductReviews';

const ShoppingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products-detail/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            // Add your cart logic here
            // For example:
            // await dispatch(addToCart(product));
            // Or make an API call:
            // await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/cart/add`, { productId: id });
        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };

    if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
    if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
    if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

    return (
        <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center gap-2"
            >
                <span>←</span> Back
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:grid md:grid-cols-2">
                    {/* Product Image */}
                    <div className="aspect-square">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-600">{product.brand}</p>
                        </div>

                        <p className="text-gray-600 mb-6">{product.description}</p>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-green-600">
                                    ${product.salePrice}
                                </span>
                                {product.salePrice < product.price && (
                                    <span className="text-xl line-through text-gray-400">
                                        ${product.price}
                                    </span>
                                )}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    Stock: {product.totalStock} units
                                </span>
                                {product.totalStock > 0 ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="detail">
                <ProductReviews />
            </div>
        </main>
    );
};

export default ShoppingDetail;
