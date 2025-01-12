import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviewDetails, replyToReview } from '@/store/admin/reviewSlice';
import { useToast } from "@/hooks/use-toast";
import { formatDateTime } from '@/helper/formatDateTime';

const ProductReviewDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [replyContent, setReplyContent] = useState('');
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;
    
    const { currentProduct, productReviews, loading, error, stats } = useSelector(state => state.adminReview);

    useEffect(() => {
        if (productId) {
            dispatch(getProductReviewDetails({
                productId,
                page: currentPage,
                limit: reviewsPerPage
            }));
        }
    }, [dispatch, productId, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedReviewId(null); 
        setReplyContent('');
        setIsEditing(false);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (currentPage > 1) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage < stats?.totalPages) pages.push(currentPage + 1);
        return pages;
    };

    const handleReply = async (reviewId) => {
        if (!replyContent.trim()) {
            toast({
                title: "Error",
                description: "Reply content cannot be empty",
                variant: "destructive"
            });
            return;
        }

        try {
            await dispatch(replyToReview({ 
                reviewId, 
                content: replyContent 
            })).unwrap();
            
            setReplyContent('');
            setSelectedReviewId(null);
            setIsEditing(false);
            
            dispatch(getProductReviewDetails(productId));
            
            toast({
                title: "Success",
                description: "Reply added successfully",
                className: "bg-green-500 text-white"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to add reply",
                variant: "destructive"
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentProduct) return <div>Product not found</div>;

    return (
        <div className="p-6">
            <button 
                onClick={() => navigate('/admin/products-reviews')}
                className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
            >
                <span>←</span> Back to Products
            </button>

            <div className="flex items-center gap-6 mb-8 bg-white p-4 rounded-lg shadow">
                <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    className="w-32 h-32 object-cover rounded"
                />
                <div>
                    <h2 className="text-2xl font-bold mb-2">{currentProduct.name}</h2>
                    <div className="flex gap-4 text-gray-600">
                        <p>Rating: {currentProduct.rating?.toFixed(1) || 'N/A'}</p>
                        <p>Total Reviews: {stats?.total || 0}</p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-6">
                {productReviews?.map(review => (
                    <div key={review._id} className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between mb-4">
                            <div>
                                <p className="font-medium text-lg">{review.userId?.fullName}</p>
                                <p className="text-gray-500">{review.userId?.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-yellow-500 font-bold">★ {review.rating}</p>
                                <p className="text-sm text-gray-500">{review.createdAt}</p>
                            </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{review.comment}</p>

                        {review.reply?.content ? (
                            <div className="bg-gray-50 p-4 rounded mt-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Admin Reply:</p>
                                        <p className="text-gray-600">{review.reply.content}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Replied by: {review.reply.staffId?.fullName || 'Admin'} on {formatDateTime(review.reply.createdAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedReviewId(review._id);
                                            setReplyContent(review.reply.content);
                                            setIsEditing(true);
                                        }}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit Reply
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setSelectedReviewId(review._id);
                                    setReplyContent('');
                                    setIsEditing(false);
                                }}
                                className="text-blue-500 hover:underline"
                            >
                                Reply to Review
                            </button>
                        )}

                        {selectedReviewId === review._id && (
                            <div className="mt-4">
                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                    placeholder="Write your reply..."
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleReply(review._id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        {isEditing ? 'Update Reply' : 'Send Reply'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedReviewId(null);
                                            setReplyContent('');
                                            setIsEditing(false);
                                        }}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {stats?.totalPages > 1 && (
                <div className="flex justify-center gap-1 md:gap-2 mt-4">
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-2 md:px-3 py-1 text-sm md:text-base rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            First
                        </button>
                    )}

                    {getPageNumbers().map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-2 md:px-3 py-1 text-sm md:text-base rounded-md ${
                                currentPage === pageNumber
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {currentPage < stats?.totalPages && (
                        <button
                            onClick={() => handlePageChange(stats.totalPages)}
                            className="px-2 md:px-3 py-1 text-sm md:text-base rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            Last
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductReviewDetail;
