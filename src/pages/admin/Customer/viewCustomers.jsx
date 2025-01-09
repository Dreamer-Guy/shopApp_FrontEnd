import ItemsList from "@/components/admin/Content/Customer/ItemsList";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {getAllCustomers} from "@/store/customer/index.js";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
const ROW_PER_PAGE=8;
const mockUsers = [
    {
        fullName: "John Doe",
        userName: "john_doe",
        email: "john.doe@example.com",
        password: "password123",
        avatar: "https://github.com/shadcn.png",
        role: "admin",
        createdAt: "January 1, 2024",
        status: "active",
    },
    {
        fullName: "Jane Smith",
        userName: "jane_smith",
        email: "jane.smith@example.com",
        password: "securepass456",
        avatar: "https://github.com/shadcn.png",
        role: "user",
        createdAt: "February 1, 2024",
        status: "active",
    },
    {
        fullName: "Mike Johnson",
        userName: "mikej123",
        email: "mike.johnson@example.com",
        password: "mikepass789",
        avatar: "https://github.com/shadcn.png",
        role: "moderator",
        createdAt: "March 1, 2024",
        status: "banned",
    },
    {
        fullName: "Emily Davis",
        userName: "emily_d",
        email: "emily.davis@example.com",
        password: "mypassword321",
        avatar: "https://github.com/shadcn.png",
        role: "user",
        createdAt: "April 1, 2024",
        status: "banned",
    },
    {
        fullName: "Chris Brown",
        userName: "chris_b",
        email: "chris.brown@example.com",
        password: "pass456789",
        avatar: "https://github.com/shadcn.png",
        role: "user",
        createdAt: "May 1, 2024",
        status: "active",
    },
    {
        fullName: "Sophia Wilson",
        userName: "sophia_w",
        email: "sophia.wilson@example.com",
        password: "wilsonpass123",
        avatar: "https://github.com/shadcn.png",
        role: "editor",
        createdAt: "June 1, 2024",
        status: "banned",
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
        fullName:1,
    }
};

const ViewCustomers = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {customers,totalCustomers}=useSelector(state=>state.customer);
    const [filter,setFilter]=useState(initFilter);
    const [showPaging,setShowPaging]=useState(initShowPaging);
    const totalPage=Math.ceil(totalCustomers/ROW_PER_PAGE);
    useEffect(() => {
        dispatch(getAllCustomers(filter));
    }, [filter]);   
    return(
        <div>
            <h1 className="text-2xl font-bold mb-10">View Customers</h1>
            <div className="w-full hidden md:block">
                <div className="w-11/12 flex flex-row justify-between font-semibold">
                    <div className='flex flex-row justify-start w-full md:w-1/5 gap-3'>
                        <p className=''>Name</p>
                        <div
                            onClick={()=>{
                                setFilter(pre=>({
                                    ...pre,
                                    sort:{
                                        fullName:pre.sort?.fullName===1?-1:1
                                    }
                                }))
                            }} 
                            className="hover:cursor-pointer">
                            <FaChevronUp size={12} className=""/>
                            <FaChevronDown size={12} className=""/>
                        </div>
                    </div>
                    <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                        <p className=''>User Name</p>
                        <div
                            onClick={()=>{
                                setFilter(pre=>({
                                    ...pre,
                                    sort:{
                                        userName:pre.sort?.userName===1?-1:1
                                    }
                                }))
                            }} 
                            className="hover:cursor-pointer">
                            <FaChevronUp size={12} className=""/>
                            <FaChevronDown size={12} className=""/>
                        </div>
                    </div>
                    <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                        <p className=''>Email</p>
                        <div
                            onClick={()=>{
                                setFilter(pre=>({
                                    ...pre,
                                    sort:{
                                        email:pre.sort?.email===1?-1:1
                                    }
                                }))
                            }} 
                            className="hover:cursor-pointer">
                            <FaChevronUp size={12} className=""/>
                            <FaChevronDown size={12} className=""/>
                        </div>
                    </div>
                    <div className='flex flex-row justify-end w-full md:w-1/6  gap-2'>
                        <p className=''>User Since</p>
                        <div 
                            onClick={()=>{
                                setFilter(pre=>({
                                    ...pre,
                                    sort:{
                                        createdAt:pre.sort?.createdAt===1?-1:1
                                    }
                                }))
                            }}
                            className="hover:cursor-pointer">
                            <FaChevronUp size={12} className=""/>
                            <FaChevronDown size={12} className=""/>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-start md:justify-end w-full md:w-1/12 gap-2'>
                        <p className=''>Status</p>
                        <div 
                                onClick={()=>{
                                    setFilter(pre=>({
                                        ...pre,
                                        sort:{
                                            status:pre.sort?.status===1?-1:1
                                        }
                                    }))
                                }}
                                className="hover:cursor-pointer">
                                <FaChevronUp size={12} className=""/>
                                <FaChevronDown size={12} className=""/>
                            </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <ItemsList users={customers} />
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
    );
};

export default ViewCustomers;