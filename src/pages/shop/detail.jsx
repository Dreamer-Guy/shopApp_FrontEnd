import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductReviews from '@/components/shop/ProductReviews';
import {getAllReviews, addReview, getProductReviews} from '@/store/review/review-slice.js';
import { useDispatch,useSelector } from "react-redux";
import ReviewForm from '@/components/shop/reviewForm.jsx';
import { addItemToCart } from "@/store/cart/index.js";
import { useToast } from "@/hooks/use-toast";

const calculateAverageRating = (reviews) => {
    if (!reviews?.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
};

const ShoppingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); // Add this new state
    
    const { reviews, totalPages, totalReviews } = useSelector((state) => state.review);
    const numReviews = totalReviews || 0; // Sử dụng totalReviews thay vì reviews.length
    const { toast } = useToast();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get product data from navigation state
                const productData = location.state?.productData;
                console.log('Retrieved product from navigation:', productData);

                if (!productData) {
                    // Fallback to API if no state data
                    const productResponse = await axios.get(
                        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/detail/${id}`,
                        { withCredentials: true }
                    );
                    if (!productResponse.data) {
                        throw new Error('Product not found');
                    }
                    setProduct(productResponse.data);
                } else {
                    setProduct(productData);
                }

                // Fetch product specifications
                const detailResponse = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/product-details/get/${id}`,
                    { withCredentials: true }
                );

                if (detailResponse.data) {
                    console.log('Fetched product details:', detailResponse.data);
                    // Update product with specifications
                    setProduct(prev => ({
                        ...(prev || {}),
                        attributes: detailResponse.data.map(detail => ({
                            name: detail.name,
                            value: detail.value
                        }))
                    }));
                }

            } catch (err) {
                console.error('Error in fetchProduct:', err);
                setError(err.response?.data?.message || 'Failed to fetch product');
                setTimeout(() => {
                    navigate('/shop/home');
                }, 2000);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, navigate, location]);

    // useEffect(() => {
    //     dispatch(getAllReviews(id));
    // }, [dispatch, id]);

    useEffect(() => {
        dispatch(getProductReviews({
            productId: id,
            page: currentPage,
            limit: reviewsPerPage
        }));
    }, [dispatch, id, currentPage]);

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, Math.min(value, product.totalStock));
        setQuantity(newQuantity);
    };

    const handleAddToCart = async () => {
        try {
            setIsAddingToCart(true);
            await dispatch(addItemToCart({
                productId: id,
                quantity: quantity
            })).unwrap();

            toast({
                title: "Success",
                description: `Added ${quantity} item(s) to cart successfully`,
                className: "bg-green-500 text-white",
                duration: 3000
            });
        } catch (error) {
            toast({
                title: "Error", 
                description: error || "Could not add to cart",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleReviewSubmit = async (reviewData) => {
        try {
            const reviewPayload = {
                productId: id,
                ...reviewData
            };

            const result = await dispatch(addReview(reviewPayload)).unwrap();
            
            toast({
                title: "Success",
                description: "Review submitted successfully",
                className: "bg-green-500 text-white",
                duration: 3000
            });

            dispatch(getProductReviews({
                productId: id,
                page: currentPage,
                limit: reviewsPerPage
            }));

            return result; 
            
        } catch (error) {
            console.error('Review submission error:', error);
            toast({
                title: "Error",
                description: error?.message || "Failed to submit review",
                variant: "destructive",
                duration: 3000
            });
            throw error; // Re-throw to handle in the form
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-8 w-2/3 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
            </div>
        </div>
    );

    if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
    if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center gap-2"
                >
                    <span>←</span> Back
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Product Image */}
                        <div className="relative h-[350px] md:h-[500px] p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-contain object-top"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-6 flex flex-col h-full">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-gray-600">{product.brand}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="text-yellow-400">
                                        Rating: {calculateAverageRating(reviews)}
                                    </div>
                                    <span className="text-gray-400">
                                        ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                            </div>

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

                            <div className="mb-6">
                                {/* Quantity Selector */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-gray-600">Quantity:</span>
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            disabled={quantity <= 1}
                                            className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max={product.totalStock}
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                            className="w-16 text-center focus:outline-none"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            disabled={quantity >= product.totalStock}
                                            className="px-3 py-1 border-l hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {product.totalStock} available
                                    </span>
                                </div>

                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.totalStock === 0 || isAddingToCart}
                                    className={`w-full py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2
                                        ${product.totalStock === 0 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-black text-white hover:bg-gray-800'}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {isAddingToCart ? "Adding..." : product.totalStock === 0 ? "Out of Stock" : `Add ${quantity} to Cart`}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-t sticky top-0 bg-white z-10">
                        <div className="flex border-b">
                            <button
                                className={`px-6 py-3 ${activeTab === 'details' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('details')}
                            >
                                Details & Specifications
                            </button>
                            <button
                                className={`px-6 py-3 ${activeTab === 'reviews' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews
                            </button>
                        </div>
                    </div>

                    {/* Tabs Content */}
                    <div className="bg-white">
                        {activeTab === 'details' ? (
                            <div className="p-6">
                                {/* Product Details */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Product Description</h2>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>

                                {/* Specifications */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            {/* Base product info */}
                                            <div className="flex border-b py-2">
                                                <span className="font-medium w-1/3">Brand</span>
                                                <span className="text-gray-600">{product.brand}</span>
                                            </div>
                                            <div className="flex border-b py-2">
                                                <span className="font-medium w-1/3">Category</span>
                                                <span className="text-gray-600">{product.category}</span>
                                            </div>

                                            {/* Product attributes */}
                                            {product.attributes && product.attributes.map((attr, index) => (
                                                <div key={index} className="flex border-b py-2">
                                                    <span className="font-medium w-1/3">{attr.name}</span>
                                                    <span className="text-gray-600">{attr.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Product Reviews</h2>
                                <ProductReviews 
                                    reviews={reviews} 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                                <div className="mt-8 border-t pt-6">
                                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                                    <ReviewForm onSubmit={handleReviewSubmit} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingDetail;
