import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch,useSelector } from "react-redux";
import {useToast} from "@/hooks/use-toast";
import {updateItemInCart,removeItemFromCart}
from "@/store/cart/index.js";

const ItemCard = ({ item }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const handleRemoveItem=()=>{
        dispatch(removeItemFromCart(item.productId._id)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while removing item from cart",
                    description:res.payload,
                    className: "bg-red-500 text-white",
                    duration: 3000,
                    variant:"destructive",
                });
            }
            else{
                toast({
                    title:"Item removed from cart",
                    className: "bg-green-500 text-white",
                    duration: 3000,
                });
            }
        });
    };
    const handleUpdateItem=(quantity)=>{
        dispatch(updateItemInCart({productId:item.productId._id,quantity})).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while updating item in cart",
                    description:res.payload,
                    variant:"destructive",
                    className: "bg-red-500 text-white",
                    duration: 3000,
                });
            }
            else{
                toast({
                    title:"Item updated in cart",
                    className: "bg-green-500 text-white",
                    duration: 3000,
                });
            }
        });
    };
    return (
        <div className="flex flex-col md:flex-row border-t border-black py-5 px-2 gap-5 md:gap-0">
            <div className="flex flex-row gap-3 items-start w-full md:w-2/5">
                <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 object-cover" />
                <div className="flex-1">
                    <p className="break-words max-w-40">{item.productId.name}</p>
                </div>
            </div>
            <div className="w-full md:w-3/5 flex flex-col md:flex-row">
                <div className="w-[90%] flex flex-row justify-between">
                    <div className="w-[30%] flex justify-center">
                        {item.productId?.salePrice > 0 ? (
                            <div className="text-center">
                                <p className="font-semibold">${item.productId.salePrice}</p>
                                <p className="line-through text-gray-500">${item.productId.price}</p>
                            </div>
                        ) : (
                            <p className="font-semibold text-center">${item.productId.price}</p>
                        )}
                    </div>
                    <div className="w-[30%] flex justify-center">
                        <div className="w-16 h-12 bg-gray-200 rounded-sm flex gap-3 p-2 justify-center items-center">
                            <p>{item.quantity}</p>
                            <div className="flex flex-col gap-2">   
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleUpdateItem(item.quantity + 1);
                                    }}
                                    className="hover:bg-gray-300 rounded-sm"
                                ><FiChevronUp/></button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleUpdateItem(item.quantity - 1);
                                    }}
                                    className="hover:bg-gray-300 rounded-sm"
                                ><FiChevronDown/></button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[30%] flex justify-center">
                        <p className="font-semibold">
                            ${item.quantity * (item.productId.salePrice > 0 ? item.productId.salePrice : item.productId.price)}
                        </p>
                    </div>
                    <div
                        onClick={() => handleRemoveItem()} 
                        className="w-[10%] flex justify-center hover:cursor-pointer">
                        <FaRegTrashCan className="hover:text-red-500 transition-colors text-2xl"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;