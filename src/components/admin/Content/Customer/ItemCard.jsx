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
        <div className="group hover:bg-gray-50 transition-all duration-200">
            <div className="grid grid-cols-12 px-6 py-4 items-center">
                <div className="col-span-3">
                    <p className="text-gray-900 font-medium truncate">{user?.fullName}</p>
                </div>
                
                <div className="col-span-2">
                    <p className="text-gray-600 truncate">{user?.userName}</p>
                </div>
                
                <div className="col-span-3">
                    <p className="text-gray-600 truncate">{user?.email}</p>
                </div>
                
                <div className="col-span-2 text-right">
                    <p className="text-gray-600">{user?.createdAt}</p>
                </div>
                
                <div className="col-span-1 flex justify-center">
                    {user?.status === 'active' 
                        ? <RiCheckboxCircleLine className="w-5 h-5 text-green-500" />
                        : <HiOutlineXCircle className="w-5 h-5 text-red-500" />
                    }
                </div>

                <div className="col-span-1 relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg 
                            border border-gray-200 py-1 z-50">
                            <button
                                onClick={() => {
                                    handleChangeUserStatus();
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 
                                    transition-colors duration-200 ${
                                    user.status === 'active'
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-green-600 hover:bg-green-50'
                                }`}
                            >
                                {user.status === 'active' ? 'Ban User' : 'Unban User'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;