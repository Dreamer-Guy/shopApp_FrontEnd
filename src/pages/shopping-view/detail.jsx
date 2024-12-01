import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductReviews from '@/components/shopping-view/ProductReviews';
import { mockProducts } from '@/data/mockData';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment });
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label className="block mb-2">Rating</label>
                <select 
                    value={rating} 
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    {[5,4,3,2,1].map(num => (
                        <option key={num} value={num}>{num} stars</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block mb-2">Comment</label>
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                ></textarea>
            </div>
            <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit Review
            </button>
        </form>
    );
};

const ShoppingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            const foundProduct = mockProducts.find(p => p._id === id);
            if (foundProduct) {
                setProduct(foundProduct);
                setReviews(foundProduct.reviews || []);
            } else {
                setError('Product not found');
            }
            setLoading(false);
        }, 500);
    }, [id]);

    useEffect(() => {
        // Calculate average rating whenever reviews change
        if (reviews.length > 0) {
            const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
            setAverageRating(avg.toFixed(1));
        }
    }, [reviews]);

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

    const handleReviewSubmit = (reviewData) => {
        const newReview = {
            id: `r${reviews.length + 1}`,
            user: "Current User",
            avatar: "https://via.placeholder.com/40",
            date: new Date().toISOString().split('T')[0],
            ...reviewData
        };
        setReviews([...reviews, newReview]);
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
                            <div className="text-yellow-400 mt-2">
                                Rating: {product.rating} / 5
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-sm text-gray-500 mt-2">Category: {product.type}</p>
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
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-400 text-lg">{averageRating} / 5</span>
                    <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
                </div>
                <ProductReviews reviews={reviews} />
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                    <ReviewForm onSubmit={handleReviewSubmit} />
                </div>
            </div>
        </main>
    );
};

export default ShoppingDetail;
