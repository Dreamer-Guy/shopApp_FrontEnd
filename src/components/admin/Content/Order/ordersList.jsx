import OrderCard from './OrderCard';

const OrdersList = ({ orders }) => {
    return (
        <div className='flex flex-col gap-4'>
            {
                orders.map((order, index) => (
                    <OrderCard key={index} order={order} index={index + 1} />
                ))
            }
        </div>
    )
};

export default OrdersList;