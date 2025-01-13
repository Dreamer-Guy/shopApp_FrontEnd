import { useNavigate } from "react-router-dom";


const DEFAULT_NAME='Not a name';
const currency='$';

const orderStatusToTextColorMapping={
    pending:"text-yellow-500",
    processing:"text-blue-500",
    completed:"text-green-500",
};

const paymentStatusToTextColorMapping={
    false:"text-red-500",
    true:"text-green-500",
};

const displayOrderStatus=({status})=>{
    return <div>
        <p className={`text-sm ${orderStatusToTextColorMapping[status]}`}>{status}</p>
    </div>
}


const displayPaymentStatus=({paymentStatus})=>{
    return <div>
        <p className={`text-sm ${paymentStatusToTextColorMapping[paymentStatus.toString()]}`}>
            {paymentStatus.toString()==='true'?'paid':'unpaid'}
        </p>
    </div>

};

const formatIndex=(index)=>{
    const DIGIT_LENGTH=3;
    return index.toString().padStart(DIGIT_LENGTH,'0');
};

const OrderCard=({order,index})=>{
    const navigate=useNavigate();
    return (
        <div
            onClick={()=>{navigate(`/admin/orders/detail/${order._id}`)}} 
            className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md p-4 hover:cursor-pointer transition-transform transform hover:scale-105 bg-white">
            <div className="md:w-1/12">
                <span className="md:hidden font-semibold">No: </span>{formatIndex(index)}
            </div>
            <div className="w-full md:w-11/12 flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 flex flex-row justify-start">
                    <p className="font-medium"><span className="md:hidden font-semibold">Name: </span>{order?.userId?.fullName ?? DEFAULT_NAME}</p>
                </div>
                <div className="w-full md:w-2/4 flex flex-row justify-between items-center">
                    <div className="w-full md:h-1/2 flex flex-row items-center justify-start gap-1">  
                        <span className="md:hidden font-semibold">Order Status: </span>{displayOrderStatus({status:order?.status})}
                    </div>
                    <div className="w-full md:h-1/2 flex flex-row items-center justify-end gap-1">  
                        <span className="md:hidden font-semibold">Payment Status: </span>{displayPaymentStatus({paymentStatus:order?.paymentStatus})}
                    </div>
                </div>
                <div className="w-full md:w-1/4 flex flex-row justify-start md:justify-end gap-2 font-semibold">
                    <div className="flex flex-row md:justify-between gap-2 w-1/4">
                        <span className="md:hidden font-semibold">Total:</span>
                        <p>{currency}</p>
                        <p>{order.total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrderCard;