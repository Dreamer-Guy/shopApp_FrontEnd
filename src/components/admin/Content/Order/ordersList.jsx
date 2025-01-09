import OrderCard from './OrderCard';
const OrderSList = ({ orders }) => {
    return (
        <div className='flex flex-col gap-2'>
            {
                orders.map((order,index)=>(
                    <OrderCard key={index} order={order} index={index+1} />
                ))
            }
        </div>
    )
};

export default OrderSList;