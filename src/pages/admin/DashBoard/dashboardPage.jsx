import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {getTotalRevenue,getTotalOrders,getRecentOrders} from "@/store/order/index.js";
import {getTotalCustomers} from "@/store/customer/index.js";
import {getTotalSales,getTopSalesProducts} from "@/store/product";
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
  

const DashBoardPage=()=>{
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
        <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="mt-5">
                <div className="flex flex-col justify-between md:flex-row gap-3">
                    <div className="border border-black rounded-lg px-2 py-1 text-lg bg-gradient-to-br from-blue-400 to-green-500 w-2/3 md:w-1/5 text-white">
                        <div className="font-semibold ">Total Orders</div>
                        <div>{totalAdminOrders||0}</div>
                    </div>
                    <div className="border border-black rounded-lg px-2 py-1 text-lg bg-gradient-to-br from-teal-500 to-yellow-200 w-2/3 md:w-1/5 text-white">
                        <div className="font-semibold ">Total Sales</div>
                        <div>{totalSales||0}</div>
                    </div>
                    <div className="border border-black rounded-lg px-2 py-1 text-lg bg-gradient-to-br from-teal-300 to-green-400 w-2/3 md:w-1/5 text-white">
                        <div className="font-semibold ">Total Revenue</div>
                        <div>{totalRevenue||0}</div>
                    </div>
                    <div className="border border-black rounded-lg px-2 py-1 text-lg bg-gradient-to-br from-sky-300 to-teal-400  w-2/3 md:w-1/5 text-white">
                        <div className="font-semibold ">Total Customers</div>
                        <div>{totalCustomers||0}</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-5">
                    <div className="w-8/12 md:border-r-4 md:border-black md:pr-2 md:h-full">
                        <h3>Recent orders</h3>
                        <div className="flex flex-col gap-5 pl-8 md:px-4">
                        {
                            recentOrders.map((order,index)=>(
                                <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                    <div className="flex flex-row gap-1">
                                        <img src={order.userId?.avatar} alt={order.userId?.fullName} className="w-20 h-20"/>
                                        <div className="flex flex-col gap-1">
                                            <p>{order.userId?.fullName||"Default nam"}</p>
                                            <p>{order.userId?.email||"example@gmail.com"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p><span>Order At:</span> {order.createdAt}</p>
                                        <p><span>Total: </span>{CURRENCY}{order.total}</p>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    <div className="w-full md:w-4/12 md:px-2">
                        <h3>Top sales products</h3>
                        <div className="flex flex-col justify-between gap-5 pl-8 md:px-2">
                            {
                                topSalesProducts.map((product,index)=>(
                                    <div key={index} className="flex flex-row items-center gap-2">
                                        <div className="w-1/5">
                                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover"/>
                                        </div>
                                        <div className="w-4/5">
                                            <p>{product.name}</p>
                                            <p>Sales: {product.sales}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};


export default DashBoardPage;