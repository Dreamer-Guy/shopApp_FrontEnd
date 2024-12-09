import { MoreVertical } from 'lucide-react';
import { RiCellphoneFill, RiCheckboxCircleLine } from "react-icons/ri";
import { HiOutlineXCircle } from "react-icons/hi2";
import { useState } from 'react';
import {banCustomer,unbanCustomer} from "@/store/customer/index.js";
import { useDispatch } from 'react-redux';
const ItemCard =({user})=>{
    const dispatch = useDispatch();
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const handleChangeUserStatus=()=>{
        if(user.status==='active'){
            dispatch(banCustomer(user._id));
            return;
        }
        dispatch(unbanCustomer(user._id));
    };
    return (
        <div className="flex flex-row py-3 px-1 border-y items-center">
            <div className='w-11/12 flex flex-col md:flex-row gap-2 justify-between'>
                <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                    <span className='md:hidden font-semibold'>Full Name: </span><p className=''>{user?.fullName}</p>
                </div>
                <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                    <span className='md:hidden font-semibold'>User Name: </span><p>{user?.userName}</p>
                </div>
                <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                    <span className='md:hidden font-semibold'>Email: </span><p className=''>{user?.email}</p>
                </div>
                <div className='flex flex-row justify-start md:justify-end w-full md:w-1/6 gap-2'>
                    <span className='md:hidden font-semibold'>User Since: </span><p className=''>{user?.createdAt}</p>
                </div>
                <div className='flex flex-row items-center justify-start md:justify-end w-full md:w-1/12 gap-2'>
                    <span className='md:hidden font-semibold'>Status: </span><p className=''>
                        {user?.status==='active'?<RiCheckboxCircleLine size={23} color='green'/>:<HiOutlineXCircle size={23} color='red'/>}</p>
                </div>
            </div>
            <div className='w-1/12 flex flex-row items-center justify-center hover:cursor-pointer relative'>
                <div
                    onClick={()=>setIsMenuOpen((pre)=>!pre)} 
                    className=' w-10 h-10 flex flex-row items-center justify-center'>
                    <MoreVertical/>
                </div>
                <div
                    onClick={()=>handleChangeUserStatus()}
                    className={`border border-black bg-white rounded-md absolute right-16 p-1 w-32 z-50
                                ${user.status==='active'?'hover:bg-red-400':'hover:bg-green-400'} transform
                                ${isMenuOpen?'opacity-100 visible':'hidden'} 
                                transition-opacity duration-300 text-center`}>
                        {user.status==='active'?'Ban User':'Unban User'}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;