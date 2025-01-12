import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsWithReviews } from '@/store/admin/reviewSlice';
import ProductReviewCard from './ProductReviewCard';
import { FaChevronDown } from 'react-icons/fa';

const ProductReviewList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [filterStatus, setFilterStatus] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const { products, totalPages, loading, error } = useSelector(state => state.adminReview || {
        products: [],
        totalPages: 0,
        loading: false,
        error: null
    });

    useEffect(() => {
        dispatch(getProductsWithReviews({ 
            page, 
            limit,
            status: filterStatus === 'all' ? null : filterStatus 
        }));
    }, [dispatch, page, limit, filterStatus]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        setPage(1);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (page > 1) pages.push(page - 1);
        pages.push(page);
        if (page < totalPages) pages.push(page + 1);
        return pages;
    };

    const filterOptions = [
        { value: 'all', label: 'All Reviews' },
        { value: 'pending', label: 'Pending Reviews' },
        { value: 'replied', label: 'Replied Reviews' },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Products & Reviews</h2>
                
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 
                            rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
                    >
                        <span className="text-gray-700">
                            {filterOptions.find(option => option.value === filterStatus)?.label}
                        </span>
                        <FaChevronDown 
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 
                                ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 
                            rounded-lg shadow-lg py-1 z-10">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        handleFilterChange(option.value);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 
                                        transition-colors duration-200 ${
                                            filterStatus === option.value 
                                                ? 'text-blue-600 bg-blue-50/50'
                                                : 'text-gray-700'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid gap-4">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <ProductReviewCard 
                            key={product._id} 
                            product={product}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No products found
                    </div>
                )}
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-center gap-1 md:gap-2 mt-4">
                    {page > 1 && (
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
                                page === pageNumber
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {page < totalPages && (
                        <button
                            onClick={() => handlePageChange(totalPages)}
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

export default ProductReviewList;
