import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {getTotalRevenue,getTotalOrders,getRecentOrders} from "@/store/order/adminOrder.js";
import {getTotalCustomers} from "@/store/customer/index.js";
import {getTotalSales,getTopSalesProducts} from "@/store/product";
import { formatDateTime } from "@/helper/formatDateTime";
import { formatNumber } from "@/components/currencyFormatter";

const NUMBER_OF_RECENT_ORDERS = 5;
const NUMBER_OF_TOP_SALES_PRODUCTS = 5;

const mockProducts = [
    {
      image: "https://github.com/shadcn.png",
      name: "Wireless Earbuds",
      sales: 320,
    },
    {
      image: "https://github.com/shadcn.png",
      name: "Smartphone Case",
      sales: 780,
    },
    {
      image: "https://github.com/shadcn.png",
      name: "Gaming Mouse",
      sales: 150,
    },
    {
      image: "https://github.com/shadcn.png",
      name: "Bluetooth Speaker",
      sales: 170,
    },
    {
      image: "https://github.com/shadcn.png",
      name: "Fitness Tracker",
      sales: 220,
    },
  ];
  
  const orders = [
    {
      userId: {
        fullName: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://github.com/shadcn.png",
      },
      createdAt: "2025-01-01",
      total: 150.75,
    },
    {
      userId: {
        fullName: "Jane Smith",
        email: "janesmith@example.com",
        avatar: "https://github.com/shadcn.png",
      },
      createdAt: "2025-01-02",
      total: 89.99,
    },
    {
      userId: {
        fullName: "Alice Brown",
        email: "alicebrown@example.com",
        avatar: "https://github.com/shadcn.png",
      },
      createdAt: "2025-01-03",
      total: 245.50,
    },
    {
      userId: {
        fullName: "Michael Green",
        email: "michaelgreen@example.com",
        avatar: "https://github.com/shadcn.png",
      },
      createdAt: "2025-01-04",
      total: 399.00,
    },
    {
      userId: {
        fullName: "Emily White",
        email: "emilywhite@example.com",
        avatar: "https://github.com/shadcn.png",
      },
      createdAt: "2025-01-05",
      total: 129.99,
    },
  ];
  const CURRENCY='$'
  

const DashBoardPage = () => {
    const dispatch = useDispatch();
    const {totalSales,topSalesProducts}=useSelector(state=>state.product);
    const {totalAdminOrders,totalRevenue,recentOrders}=useSelector(state=>state.order);
    const {totalCustomers}=useSelector(state=>state.customer);

    useEffect(()=>{
        dispatch(getTotalOrders());
        dispatch(getTotalCustomers());
        dispatch(getTotalRevenue());
        dispatch(getTotalSales());
        dispatch(getTopSalesProducts(NUMBER_OF_TOP_SALES_PRODUCTS));
        dispatch(getRecentOrders(NUMBER_OF_RECENT_ORDERS));
    },[]);
    
    return (
        <div className="p-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white text-sm font-medium opacity-80">Total Orders</p>
                                <p className="text-white text-2xl font-bold mt-1">{totalAdminOrders || 0}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white text-sm font-medium opacity-80">Total Sales</p>
                                <p className="text-white text-2xl font-bold mt-1">{totalSales || 0}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white text-sm font-medium opacity-80">Total Revenue</p>
                                <p className="text-white text-2xl font-bold mt-1">${formatNumber(totalRevenue) || 0}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white text-sm font-medium opacity-80">Total Customers</p>
                                <p className="text-white text-2xl font-bold mt-1">{totalCustomers || 0}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                        <div className="space-y-4">
                            {recentOrders.map((order, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <img 
                                            src={order.userId?.avatar} 
                                            alt={order.userId?.fullName} 
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="font-medium text-gray-900 truncate">{order.userId?.fullName || "Default name"}</h4>
                                            <p className="text-sm text-gray-500 truncate">{order.userId?.email || "example@gmail.com"}</p>
                                        </div>
                                    </div>

                                    <div className="mt-2 sm:mt-0 ml-auto text-right">
                                        <p className="font-medium text-gray-900 whitespace-nowrap">
                                            Total: {CURRENCY}{formatNumber(order.total)}
                                        </p>
                                        <p className="text-sm text-gray-500 whitespace-nowrap">
                                            {formatDateTime(order.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
                        <div className="space-y-4">
                            {topSalesProducts.map((product, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                                        <p className="text-sm text-gray-500">Sales: {product.sales}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DashBoardPage;