import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserReviews } from '@/store/review/userReview';
import { formatDate, formatCurrency } from '@/lib/utils';
import { getUserFromLocalStorage } from '@/store/utils/localStorage';
import { Star } from 'lucide-react';
const UserReview = () => {
    const[currentPage,setCurrentPage] = useState(1);
    const reviewPerPage = 5;
    const user = getUserFromLocalStorage();
    const userId = user._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {reviews,totalPages} = useSelector((state)=>state.userReview);
    useEffect(()=>{
        dispatch(getUserReviews({
            userId,
            page:currentPage,
            limit:reviewPerPage
        }));
    },[dispatch,currentPage]);
    const handlePageChange = (page)=>{
        setCurrentPage(page);
    }
    const getPageNumbers = () => {
        const maxButtons = 3; // Số nút tối đa muốn hiển thị
        const pages = [];
        
        if (totalPages <= maxButtons) {
            // Hiển thị tất cả các trang nếu tổng số trang ít hơn maxButtons
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Luôn hiển thị trang đầu
        pages.push(1);

        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        if (start > 2) {
            pages.push('...');
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);

        return pages;
    };
    return (
        <div className="p-2 md:p-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">YOUR REVIEWS</h2>
            
            {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    You have no review
                </div>
            ) : (
                <>
                    <div className="w-full">
                        
                        {reviews.map((review,index) => (
                            <div 
                                key={index}
                                onClick={() => navigate("/shop/product/"+review.productId)}
                                className="px-3 py-2 md:px-6 flex  gap-2 md:gap-4 border border-gray-300 rounded-lg  mb-2 cursor-pointer hover:bg-gray-200"
                            >
                                <img src={review.productImage} alt="Product Image" className="w-20 h-20 my-auto object-cover rounded-full" />
                                <div className="ml-4 flex flex-col justify-between">
                                    <div className="font-semibold text-lg">{review.productName}</div>
                                     <p>{review.comment}</p>
                                    <div className="flex">
                                       {[1,2,3,4,5].map((star)=>(
                                        <Star key={star} className="w-4 h-4 " fill={review.rating >= star ? "yellow":"white"} />
                                       ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination - Điều chỉnh kích thước cho mobile */}
                    <div className="flex justify-center gap-1 md:gap-2 mt-4">
                        {getPageNumbers().map((pageNumber, index) => (
                            pageNumber === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-2 md:px-3 py-1">...</span>
                            ) : (
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
                            )
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
export default UserReview;
