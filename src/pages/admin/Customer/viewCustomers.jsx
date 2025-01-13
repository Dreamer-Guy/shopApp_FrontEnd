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
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Customer Management</h1>
            
            <div className="w-full hidden md:block">
                <div className="grid grid-cols-12 px-6 py-3 bg-white rounded-t-lg shadow-sm border border-gray-200">
                    <div className="col-span-3 flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-600">Name</p>
                        <button
                            onClick={() => {
                                setFilter(pre => ({
                                    ...pre,
                                    sort: {
                                        fullName: pre.sort?.fullName === 1 ? -1 : 1
                                    }
                                }))
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <div className="flex flex-col">
                                <FaChevronUp size={10} className="text-gray-400"/>
                                <FaChevronDown size={10} className="text-gray-400"/>
                            </div>
                        </button>
                    </div>

                    <div className="col-span-2 flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-600">Username</p>
                        <button
                            onClick={() => {
                                setFilter(pre => ({
                                    ...pre,
                                    sort: {
                                        userName: pre.sort?.userName === 1 ? -1 : 1
                                    }
                                }))
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <div className="flex flex-col">
                                <FaChevronUp size={10} className="text-gray-400"/>
                                <FaChevronDown size={10} className="text-gray-400"/>
                            </div>
                        </button>
                    </div>

                    <div className="col-span-3 flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <button
                            onClick={() => {
                                setFilter(pre => ({
                                    ...pre,
                                    sort: {
                                        email: pre.sort?.email === 1 ? -1 : 1
                                    }
                                }))
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <div className="flex flex-col">
                                <FaChevronUp size={10} className="text-gray-400"/>
                                <FaChevronDown size={10} className="text-gray-400"/>
                            </div>
                        </button>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                        <p className="text-sm font-medium text-gray-600">User Since</p>
                        <button
                            onClick={() => {
                                setFilter(pre => ({
                                    ...pre,
                                    sort: {
                                        createdAt: pre.sort?.createdAt === 1 ? -1 : 1
                                    }
                                }))
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <div className="flex flex-col">
                                <FaChevronUp size={10} className="text-gray-400"/>
                                <FaChevronDown size={10} className="text-gray-400"/>
                            </div>
                        </button>
                    </div>

                    <div className="col-span-1 flex items-center justify-end gap-2">
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <button
                            onClick={() => {
                                setFilter(pre => ({
                                    ...pre,
                                    sort: {
                                        status: pre.sort?.status === 1 ? -1 : 1
                                    }
                                }))
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <div className="flex flex-col">
                                <FaChevronUp size={10} className="text-gray-400"/>
                                <FaChevronDown size={10} className="text-gray-400"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <ItemsList users={customers} />

            {totalPage > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        onClick={() => {
                            setShowPaging(initShowPaging);
                            setFilter(pre => ({
                                ...pre,
                                page: 1
                            }))
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                            border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={filter.page === 1}
                    >
                        First
                    </button>

                    {showPaging.previous > 0 && (
                        <button
                            onClick={() => {
                                setShowPaging(pre => ({
                                    previous: pre.previous - 1,
                                    current: pre.current - 1,
                                    next: pre.next - 1
                                }));
                                setFilter(pre => ({
                                    ...pre,
                                    page: showPaging.previous
                                }))
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                                border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {showPaging.previous}
                        </button>
                    )}

                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                            rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showPaging.current}
                    </button>

                    {showPaging.next <= totalPage && (
                        <button
                            onClick={() => {
                                setShowPaging(pre => ({
                                    previous: pre.previous + 1,
                                    current: pre.current + 1,
                                    next: pre.next + 1
                                }));
                                setFilter(pre => ({
                                    ...pre,
                                    page: showPaging.next
                                }))
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                                border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {showPaging.next}
                        </button>
                    )}

                    <button
                        onClick={() => {
                            setShowPaging({
                                previous: totalPage - 1,
                                current: totalPage,
                                next: totalPage + 1
                            });
                            setFilter(pre => ({
                                ...pre,
                                page: totalPage
                            }))
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                            border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={filter.page === totalPage}
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    );
};

export default ViewCustomers;