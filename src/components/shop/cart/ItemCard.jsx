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
                    variant:"destructive",
                });
            }
            else{
                toast({
                    title:"Item removed from cart",
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
                });
            }
            else{
                toast({
                    title:"Item updated in cart",
                });
            }
        });
    };
    return (
        <div className="flex flex-col md:flex-row border-t border-black py-5 px-2 gap-5 md:gap-0">
            <div className="flex flex-row gap-3 items-start justify-start w-full md:w-2/5">
                <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 object-cover" />
                <div>
                    <p className="break-words">{item.productId.name}</p>
                </div>
            </div>
            <div className="w-full md:w-3/5 flex flex-col gap-2">
                <div className="w-10/12 md:hidden flex flex-row justify-between items-start font-semibold">
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                <div className="w-full flex flex-row items-start">
                    
                    <div className="w-10/12 flex flex-row justify-between">
                        <div>
                        {
                            item.productId?.salePrice>0?
                            (
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">${item.productId.salePrice}</p>
                                    <p className="line-through">${item?.productId?.price}</p>
                                </div>
                            )
                            :(
                                <div>
                                    <p className="font-semibold">${item?.productId?.price}</p>
                                </div>
                            )
                        }
                        </div>
                        <div className="w-16 h-12 bg-gray-200 rounded-sm flex flex-row gap-3 p-2 justify-center items-center">
                            <p>{item.quantity}</p>
                            <div className="flex flex-col gap-2">   
                                <button
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        handleUpdateItem(item.quantity+1);
                                    }}
                                    ><FiChevronUp/></button>
                                <button
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        handleUpdateItem(item.quantity-1);
                                    }}
                                    ><FiChevronDown/></button>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">${item.quantity*(item.productId.salePrice>0?item.productId.salePrice:item.productId.price)}</p>
                        </div>
                    </div>
                    <div
                        onClick={()=>handleRemoveItem()} 
                        className="w-2/12 flex flex-row justify-end items-start py-2 hover:cursor-pointer">
                        <p className="w-10 h-10"><FaRegTrashCan/></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;