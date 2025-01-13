import ItemsList from "@/components/admin/Content/Staff/ItemsList";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {getAllStaffs,deleteStaff} from "@/store/staff/index.js";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
const ROW_PER_PAGE=8;

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

const ViewStaffs = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {staffs,totalStaffs}=useSelector(state=>state.staff);
    const [filter,setFilter]=useState(initFilter);
    const [showPaging,setShowPaging]=useState(initShowPaging);
    const totalPage=Math.ceil(totalStaffs/ROW_PER_PAGE);
    useEffect(() => {
        dispatch(getAllStaffs(filter));
    }, [filter]);   
    return(
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        View and manage all staff members
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="w-full hidden md:block border-b border-gray-200">
                        <div className="grid grid-cols-5 px-6 py-3 bg-gray-50">
                            <div className="col-span-1 flex items-center gap-2">
                                <p className="text-sm text-gray-600">Name</p>
                                <button
                                    onClick={() => {
                                        setFilter(pre => ({
                                            ...pre,
                                            sort: {
                                                fullName: pre.sort?.fullName === 1 ? -1 : 1
                                            }
                                        }))
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <FaChevronUp size={10} className="text-gray-400"/>
                                        <FaChevronDown size={10} className="text-gray-400"/>
                                    </div>
                                </button>
                            </div>

                            <div className="col-span-1 flex items-center gap-2">
                                <p className="text-sm text-gray-600">User Name</p>
                                <button
                                    onClick={() => {
                                        setFilter(pre => ({
                                            ...pre,
                                            sort: {
                                                userName: pre.sort?.userName === 1 ? -1 : 1
                                            }
                                        }))
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <FaChevronUp size={10} className="text-gray-400"/>
                                        <FaChevronDown size={10} className="text-gray-400"/>
                                    </div>
                                </button>
                            </div>

                            <div className="col-span-2 flex items-center gap-2">
                                <p className="text-sm text-gray-600">Email</p>
                                <button
                                    onClick={() => {
                                        setFilter(pre => ({
                                            ...pre,
                                            sort: {
                                                email: pre.sort?.email === 1 ? -1 : 1
                                            }
                                        }))
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <FaChevronUp size={10} className="text-gray-400"/>
                                        <FaChevronDown size={10} className="text-gray-400"/>
                                    </div>
                                </button>
                            </div>

                            <div className="col-span-1 flex items-center gap-2">
                                <p className="text-sm text-gray-600">Staff Since</p>
                                <button
                                    onClick={() => {
                                        setFilter(pre => ({
                                            ...pre,
                                            sort: {
                                                createdAt: pre.sort?.createdAt === 1 ? -1 : 1
                                            }
                                        }))
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <FaChevronUp size={10} className="text-gray-400"/>
                                        <FaChevronDown size={10} className="text-gray-400"/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        <ItemsList staffs={staffs} />
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-center">
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setShowPaging(initShowPaging);
                                        setFilter(pre => ({ ...pre, page: 1 }))
                                    }}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border 
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
                                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border 
                                            border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        {showPaging.previous}
                                    </button>
                                )}

                                <button
                                    className="px-3 py-2 w-10 h-10 text-sm font-medium text-white bg-blue-600 
                                        border border-blue-600 rounded-lg"
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
                                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border 
                                            border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        {showPaging.next}
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        setShowPaging(pre => ({
                                            previous: totalPage - 1,
                                            current: totalPage,
                                            next: totalPage + 1
                                        }));
                                        setFilter(pre => ({
                                            ...pre,
                                            page: totalPage,
                                        }))
                                    }}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border 
                                        border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={filter.page === totalPage}
                                >
                                    Last
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStaffs;