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
        <div>
            <h1 className="text-2xl font-bold mb-10">All Staffs</h1>
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
                    <div className='flex flex-row items-center justify-start md:justify-end w-full md:w-2/12 gap-2'>
                        <p className=''>Staff Since</p>
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
                </div>
            </div>
            <div className="w-full">
                <ItemsList staffs={staffs} />
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

export default ViewStaffs;