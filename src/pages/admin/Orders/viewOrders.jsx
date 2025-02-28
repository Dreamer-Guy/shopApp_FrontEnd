import OrdersList from "@/components/admin/Content/Order/ordersList";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {getAllOrders} from "@/store/order/adminOrder.js";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useToast } from "@/hooks/use-toast";
import formatNumber from "@/utils/formatNumber.js";

const ROW_PER_PAGE=5;

const ORDER_STATUS={
    PENDING:"pending",
    PROCESSING:"processing",
    COMPLETED:"completed",
};

const orders = [
    {
      _id: "64fa1c2b3f2a2c3b5678d4e9",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678a1b2",
        fullName: "John Doe",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678b3c4",
          quantity: 2,
        },
        {
          productId: "64fa1c2b3f2a2c3b5678c4d5",
          quantity: 1,
        },
      ],
      total: 150.75,
      status: "pending",
      paymentStatus: false,
      createdAt: "2025-01-06T10:30:00.000Z",
    },
    {
      _id: "64fa1c2b3f2a2c3b5678d5e0",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678a3b4",
        fullName: "Jane Smith",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678d5e6",
          quantity: 3,
        },
      ],
      total: 90.5,
      status: "processing",
      paymentStatus: true,
      createdAt: "2025-01-05T09:20:00.000Z",
    },
    {
      _id: "64fa1c2b3f2a2c3b5678e6f1",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678b5c6",
        fullName: "Alice Johnson",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678e7f2",
          quantity: 5,
        },
        {
          productId: "64fa1c2b3f2a2c3b5678f8g3",
          quantity: 2,
        },
      ],
      total: 200.0,
      status: "completed",
      paymentStatus: true,
      createdAt: "2025-01-04T14:15:00.000Z",
    },
    {
      _id: "64fa1c2b3f2a2c3b5678f9g4",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678c7d8",
        fullName: "Bob Williams",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678g9h5",
          quantity: 1,
        },
      ],
      total: 45.25,
      status: "pending",
      paymentStatus: false,
      createdAt: "2025-01-03T11:00:00.000Z",
    },
];

const initShowPaging={
    previous:0,
    current:1,
    next:2,
};

const initFilter={
    page:1,
    limit:ROW_PER_PAGE,
    sort:{
        status:1,
    }
};

const ViewsOrdersPage = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {adminOrders,totalAdminOrders}=useSelector(state=>state.order);
    const [filter,setFilter]=useState(initFilter);
    const [showPaging,setShowPaging]=useState(initShowPaging);
    const totalPage=Math.ceil(totalAdminOrders/ROW_PER_PAGE);
    useEffect(()=>{
        dispatch(getAllOrders(filter));
    },[filter]);
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <div className="flex flex-col justify-center items-start mt-2 gap-5">
                <div
                    onClick={()=>setFilter(pre=>initFilter)} 
                    className="border border-black rounded-lg w-[100px] py-1 flex flex-row justify-center items-center 
                    hover:cursor-pointer hover:text-white hover:bg-black">
                    All</div>
                <div className="flex flex-col md:flex-row gap-2">
                    <div
                        onClick={() => setFilter(pre => initFilter)}
                        className="border border-gray-200 rounded-lg w-[100px] py-2 flex justify-center items-center font-semibold bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">
                        All
                    </div>
                    <div className="flex flex-row gap-2">
                        <div
                            onClick={() => setFilter(pre => ({ ...pre, status: ORDER_STATUS.PENDING }))}
                            className="border border-yellow-300 rounded-lg bg-yellow-300 font-semibold hover:bg-white hover:text-yellow-300 transition-colors cursor-pointer w-[100px] py-2 flex justify-center items-center">
                            Pending
                        </div>
                        <div
                            onClick={() => setFilter(pre => ({ ...pre, status: ORDER_STATUS.PROCESSING }))}
                            className="border border-blue-300 rounded-lg bg-blue-300 font-semibold hover:bg-white hover:text-blue-300 transition-colors cursor-pointer w-[100px] py-2 flex justify-center items-center">
                            Processing
                        </div>
                        <div
                            onClick={() => setFilter(pre => ({ ...pre, status: ORDER_STATUS.COMPLETED }))}
                            className="border border-green-300 rounded-lg bg-green-300 font-semibold hover:bg-white hover:text-green-300 transition-colors cursor-pointer w-[100px] py-2 flex justify-center items-center">
                            Completed
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-row mt-5">
                <div className="w-1/12">
                    <p className="text-sm font-semibold">No</p>
                </div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-1/4 flex flex-row justify-start items-center gap-1">
                        <p className="font-semibold">Customer Name</p>
                    </div>
                    <div className="w-2/4 flex flex-row justify-between">
                        <div className="w-1/2 flex flex-row justify-start gap-1">
                            <p className="font-semibold">Status</p>
                            <div
                                onClick={()=>{
                                    setFilter(pre=>({
                                        ...pre,
                                        sort:{
                                            status:pre.sort?.status===1?-1:1
                                        }
                                    }))
                                }} 
                                className="hover:cursor-pointer font-bold">
                                <FaChevronUp size={12} className=""/>
                                <FaChevronDown size={12} className=""/>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-row justify-end gap-1">
                            <p className="font-semibold">Payment Status</p>
                            <div
                                onClick={()=>{
                                    setFilter(pre=>({
                                        ...pre,
                                        sort:{
                                            paymentStatus:pre.sort?.paymentStatus===1?-1:1
                                        }
                                    }))
                                }} 
                                className="hover:cursor-pointer font-bold">
                                <FaChevronUp size={12} className=""/>
                                <FaChevronDown size={12} className=""/>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-row justify-end gap-1 font-semibold">
                        <p>Total</p>
                        <div
                            onClick={()=>{
                                setFilter(pre=>({
                                    ...pre,
                                    sort:{
                                        total:pre.sort?.total===1?-1:1
                                    }
                                }))
                            }} 
                            className="hover:cursor-pointer font-bold">
                            <FaChevronUp size={12} className=""/>
                            <FaChevronDown size={12} className=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <OrdersList orders={adminOrders}/>
                <div className="flex flex-row justify-end mt-5 mr-5">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div
                            onClick={() => { setShowPaging(initShowPaging); setFilter(pre => ({ ...pre, page: 1 })); }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                            border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            First
                        </div>
                        {
                            showPaging.previous>0?
                            (<div
                                onClick={()=>{
                                    setShowPaging(pre=>({
                                        previous:pre.previous-1,
                                        current:pre.current-1,
                                        next:pre.next-1
                                    }));
                                    setFilter(pre=>({
                                        ...pre,
                                        page:showPaging.previous
                                    }))
                                }} 
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                                border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">{showPaging.previous}</div>):null
                        }
                        <div 
                            onClick={()=>{
                                return;
                                setFilter(pre=>({
                                    ...pre,
                                    page:showPaging.current
                                }))
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                            rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                            {showPaging.current}
                        </div>
                        {
                            showPaging.next<=totalPage?
                            (<div
                                onClick={()=>{
                                    setShowPaging(pre=>({
                                        previous:pre.previous+1,
                                        current:pre.current+1,
                                        next:pre.next+1
                                    }));
                                    setFilter(pre=>({
                                        ...pre,
                                        page:showPaging.next
                                    }))
                                }} 
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                                border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">{showPaging.next}</div>):null
                        }
                        <div
                            onClick={()=>{  
                                setShowPaging(pre=>({
                                    previous:totalPage-1,
                                    current:totalPage,
                                    next:totalPage+1,
                                }));
                                setFilter(pre=>({
                                    ...pre,
                                    page:totalPage,
                                }))
                            }} 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                            border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            Last
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ViewsOrdersPage;