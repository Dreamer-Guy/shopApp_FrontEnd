import OrdersList from "@/components/admin/Content/Order/ordersList";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useToast } from "@/hooks/use-toast";

const ROW_PER_PAGE=5;

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
    litmit:ROW_PER_PAGE,
    sort:{
        fullName:1,
    }
};

const ViewsOrdersPage = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {adminOrders,totalAdminOrders}=useSelector(state=>state.order);
    const [filter,setFilter]=useState(initFilter);
    const [showPaging,setShowPaging]=useState(initShowPaging);
    const totalPage=Math.ceil(totalAdminOrders/ROW_PER_PAGE);
    return (
        <div>
            <div>
                <h2 className="text-2xl font-semibold">Orders</h2>
            </div>
            <div className="flex flex-col justify-center items-start mt-2 gap-5">
                <div className="border border-black rounded-lg w-[100px] py-1 flex flex-row justify-center items-center">
                    All</div>
                <div className="flex flex-row gap-2">
                    <div className="border border-black rounded-lg bg-yellow-300 hover:bg-white 
                    hover:text-yellow-300 hover:cursor-pointer w-[100px] py-1 flex flex-row justify-center items-center">
                    Pending</div>
                    <div className="border border-black rounded-lg w-[100px] py-1 flex flex-row 
                    bg-blue-300 hover:cursor-pointer hover:text-blue-300 hover:bg-white justify-center items-center">
                    Processing</div>
                    <div className="border border-black rounded-lg w-[100px] py-1 flex 
                    bg-green-300 hover:text-green-300 hover:bg-white hover:cursor-pointer flex-row justify-center items-center">
                    Completed</div>
                </div>
            </div>
            <div className="flex flex-row mt-5">
                <div className="w-1/12">
                    <p className="text-sm font-semibold">No</p>
                </div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-1/4 flex flex-row justify-start items-center gap-1">
                        <p>Customer Name</p>
                    </div>
                    <div className="w-1/4 flex flex-row justify-center gap-1">
                        <p>Status</p>
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
                    <div className="w-1/4 flex flex-row justify-center gap-1">
                        <p>Payment Status</p>
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
                <OrdersList orders={orders}/>
                <div className="flex flex-row justify-end mt-5 mr-5">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div
                                onClick={()=>{
                                    setShowPaging(initShowPaging);
                                    setFilter(pre=>({
                                        ...pre,
                                        page:1
                                    }))
                                }} 
                                className="hover:cursor-pointer w-14 h-10 border border-black flex justify-center items-center rounded-lg">
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
                                    className="hover:cursor-pointer h-10 w-10 border border-black flex flex-row 
                                    justify-center items-center rounded-lg ">{showPaging.previous}</div>):null
                            }
                            <div 
                                onClick={()=>{
                                    return;
                                    setFilter(pre=>({
                                        ...pre,
                                        page:showPaging.current
                                    }))
                                }}
                                className="hover:cursor-pointer h-10 w-10 border border-black flex flex-row 
                                justify-center items-center rounded-lg bg-blue-200">
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
                                    className="hover:cursor-pointer h-10 w-10 border border-black flex 
                                    flex-row justify-center items-center rounded-lg">{showPaging.next}</div>):null
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
                                className="hover:cursor-pointer w-14 h-10 border border-black flex justify-center items-center rounded-lg">
                                Last
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ViewsOrdersPage;