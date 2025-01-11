import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '@/store/order/historyOrderSlice';
import { formatDate, formatCurrency } from '@/lib/utils';
import { getUserFromLocalStorage } from '@/store/utils/localStorage';
const OrderHistory = () => {
    const[currentPage,setCurrentPage] = useState(1);
    const orderPerPage = 5;
    const user = getUserFromLocalStorage();
    const userId = user._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {orders,totalPages} = useSelector((state)=>state.ordersHistory);
    useEffect(()=>{
        dispatch(getUserOrders({
            userId,
            page:currentPage,
            limit:orderPerPage
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

        // Thêm dấu ... nếu cần
        if (start > 2) {
            pages.push('...');
        }

        // Thêm các trang ở giữa
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Thêm dấu ... và trang cuối
        if (end < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);

        return pages;
    };
    return (
        <div className="p-2 md:p-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">YOUR ORDERS</h2>
            
            {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    You have no orders
                </div>
            ) : (
                <>
                    <div className="w-full">
                        {/* Header - Ẩn trên mobile */}
                        <div className="hidden md:grid px-4 md:px-10 grid-cols-5 gap-4 border rounded-lg p-3 mb-2 font-bold">
                            <div>Order.No</div>
                            <div>Date</div>
                            <div>Payment</div>
                            <div>Status</div>
                            <div>Total</div>
                        </div>

                        {/* Order Items */}
                        {orders.map((order,index) => (
                            <div 
                                key={order._id}
                                onClick={() => navigate(`/user/orderHistory/${order._id}`)}
                                className="px-3 md:px-10 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 border border-gray-300 rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-200"
                            >
                                {/* Thêm labels cho mobile */}
                                <div className="md:hidden font-semibold">Order:</div>
                                <div>{index+1}</div>
                                
                                <div className="md:hidden font-semibold">Date:</div>
                                <div>{formatDate(order.createdAt)}</div>
                                
                                <div className="md:hidden font-semibold">Payment:</div>
                                <div>
                                    <span className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${
                                        order.paymentStatus === 'PAID' 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-red-500 text-white'
                                    }`}>
                                        {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                    </span>
                                </div>
                                
                                <div className="md:hidden font-semibold">Status:</div>
                                <div>
                                    <span className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${
                                        order.status === 'pending' 
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : order.status === 'cancelled'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                
                                <div className="md:hidden font-semibold">Total:</div>
                                <div className="text-blue-600 font-bold">{formatCurrency(order.total)}</div>
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
export default OrderHistory;
