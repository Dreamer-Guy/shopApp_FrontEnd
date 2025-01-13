import 
{getTotalNewCustomers,getTotalReturningCustomers,getTotalOrders,
getTotalStaffSalary,getTotalRevenue,getProfit,getTotalPurchasedItems}
from "@/store/metrics/index.js";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import formatNumber from "@/utils/formatNumber.js";

const heroSection=({totalRevenue,profit})=>{
    return(
        <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">Statistic this month</h1>
                <p className="text-lg mt-2">Track your business at a glance!</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 ">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold">+${formatNumber(totalRevenue)}</h2>
                    <p className="text-lg mt-2">Total Revenue This Month</p>
                </div>
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold">{profit<0?'-':'+'}${formatNumber(Math.abs(profit))}</h2>
                    <p className="text-lg mt-2">Total Profit This Month</p>
                </div>
            </div>
        </div>
    );
};

const MetricsPage=()=>{
    const dispatch=useDispatch();
    const {
        totalNewCustomers,
        totalReturningCustomers,
        totalOrders,
        totalStaffSalary,
        totalRevenue,
        profit,
        totalPurchasedItems,
    }=useSelector((state)=>state.metrics);
    useEffect(()=>{
        dispatch(getTotalNewCustomers());
        dispatch(getTotalReturningCustomers());
        dispatch(getTotalOrders());
        dispatch(getTotalStaffSalary());
        dispatch(getTotalRevenue());
        dispatch(getProfit());
        dispatch(getTotalPurchasedItems());
    },[])
    return( 
        <div>
            <div>
                {heroSection({totalRevenue,profit})}
            </div>
            <div className="flex flex-row justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-4/5">
                    <div 
                        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-2 
                        transition duration-300 border-t-8 border-teal-300 ">
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-xl font-bold">New Customers</h3>
                            <p className="text-4xl font-semibold">{totalNewCustomers}</p>
                        </div>
                        <p className="text-gray-600 mt-2">Details about new customers</p>
                    </div>
                    <div 
                        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-2 
                        transition duration-300 border-t-8 border-teal-300 ">
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-xl font-bold">Returning Customers</h3>
                            <p className="text-4xl font-semibold">{totalReturningCustomers}</p>
                        </div>
                        <p className="text-gray-600 mt-2">Details about returning customers</p>
                    </div>
                    <div 
                        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-2 
                        transition duration-300 border-t-8 border-teal-300">
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-xl font-bold">Orders </h3>
                            <p className="text-4xl font-semibold">{totalOrders}</p>
                        </div>
                        <p className="text-gray-600 mt-2">Details about new customers</p>
                    </div>
                    <div 
                        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-2 
                        transition duration-300 border-t-8 border-teal-300 ">
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-xl font-bold">Staff salary</h3>
                            <p className="text-4xl font-semibold">${formatNumber(totalStaffSalary)}</p>
                        </div>
                        <p className="text-gray-600 mt-2">Details about orders</p>
                    </div>
                    <div 
                        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-2 
                        transition duration-300 border-t-8 border-teal-300 ">
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className="text-xl font-bold">Purchased Items</h3>
                            <p className="text-4xl font-semibold">{totalPurchasedItems}</p>
                        </div>
                        <p className="text-gray-600 mt-2">Details about purchased items</p>
                    </div>
                </div>      
            </div>
        </div>
    )
};

export default MetricsPage;