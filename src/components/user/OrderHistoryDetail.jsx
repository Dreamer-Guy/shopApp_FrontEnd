import { useEffect } from "react";
import { useParams } from "react-router-dom";
import{useDispatch,useSelector} from 'react-redux'
import { formatDate, formatCurrency } from '@/lib/utils';
import { getOrderDetail } from '@/store/order/historyOrderSlice';

const OrderHistoryDetail = () => {
    const {orderId} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrderDetail({orderId}));
    },[dispatch,orderId]);
    const {currentOrder} = useSelector((state)=>state.ordersHistory);
   return(
    <div>
       <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Order Detail</h2>
            {currentOrder && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-gray-600 font-bold">Order ID:</p>
                        <p className="">{currentOrder._id}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-bold">Order Date:</p>
                        <p className="">{formatDate(currentOrder.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-bold my-2">Payment Status:</p>
                        <span className={`px-3 py-1 rounded-md text-sm ${
                            currentOrder.paymentStatus === 'true' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                        }`}>
                            {currentOrder.paymentStatus === 'true' ? 'Paid' : 'Unpaid'}
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-600 font-bold my-2">Order Status:</p>
                        <span className={`px-3 py-1 rounded-md text-sm ${
                            currentOrder.status === 'pending' 
                                ? 'bg-yellow-200 text-yellow-800'
                                : currentOrder.orderStatus === 'cancelled'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}>
                            {currentOrder.status}
                        </span>
                    </div>
                </div>                
                {/* Danh sách sản phẩm */}
                <div className="border-t pt-4">
                    <h3 className="font-bold mb-2">Products</h3>
                    <div className="space-y-4">
                        {currentOrder.items.map((item,index) => (
                            <div key={index} className="flex items-start sm:items-center gap-4 border-b pb-4">
                                <img 
                                    src={item.image} 
                                    alt='Product Image'
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-col flex flex-1 sm:justify-between sm:flex-row">
                                    <div className="">
                                        <p className="font-semibold truncate sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] max-w-[200px]">{item.name}</p>
                                        <p className="text-gray-600">
                                            {formatCurrency(item.price)} x {item.quantity}
                                        </p>
                                    </div>
                                    <div className="font-semibold text-red-600">
                                        {formatCurrency(item.price * item.quantity)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-xl text-blue-600">
                            {formatCurrency(currentOrder.total)}
                        </span>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
   )
}
export default OrderHistoryDetail;
