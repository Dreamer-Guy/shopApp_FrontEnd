import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateOrder } from "@/store/order/index.js";
import { set } from "react-hook-form";

const initFormData={
    status:'',
    paymentStatus:false,
};

const orderStatusOptions=[
    'pending',
    'processing',
    'completed',
];

const EditingOrderDialog = ({ open, setOpen=f=>f}) => {
    const dispatch=useDispatch();
    const {toast}=useToast();
    const {currentEditingOrder}=useSelector(state=>state.order);
    const [formData,setFormData]=useState(initFormData);
    useEffect(()=>{
        if(currentEditingOrder){
            setFormData(pre=>({
                ...pre,
                status:currentEditingOrder.status,
                paymentStatus:currentEditingOrder.paymentStatus,
            }));
        }
    },[currentEditingOrder]);
    const handleUpdateOrder=()=>{
        dispatch(updateOrder(formData)).then(res=>{
            if(res.error){
                toast({
                    title: "There is an error occured while updating order, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Order updated successfully",
            });
            setOpen(false);
        })
    };
    return (
        <div className={`${open===true?'':'hidden'}`}>
            <div className="bg-black opacity-50 z-50 h-screen w-screen fixed inset-0"></div>
            <div className="w-[400px] h-[300px] flex flex-col gap-4 p-5 items-start z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                <h3 className="font-semibold text-lg">Order status</h3>
                <div className="flex flex-col gap-5 mt-4 w-full">
                    <div className="flex flex-row gap-3">
                        <label className="font-semibold">Order status:</label>
                        <select
                            value={formData.status} 
                            onChange={(e)=>{
                                setFormData(pre=>({
                                    ...pre,
                                    status:e.target.value,
                                }));
                            }}
                            className="border border-black rounded-md">
                            {orderStatusOptions.map((status,index)=>(
                                <option
                                className="first-letter:uppercase" 
                                key={index} value={status}>{status.charAt(0).toUpperCase()+status.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row gap-3">
                        <label className="font-semibold">Payment Status:</label>
                        <select
                            value={formData.paymentStatus}
                            onChange={(e)=>{
                                setFormData(pre=>({
                                    ...pre,
                                    paymentStatus:e.target.value,
                                }));
                            }} 
                            className="border border-black rounded-md ">
                            <option value="true">Paid</option>
                            <option value="false">Unpaid</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-3 justify-end w-full mt-4">
                        <button
                            onClick={(e)=>{
                                e.preventDefault();
                                setOpen(false);
                            }} 
                            className="bg-white text-black border border-black p-2 rounded-md">Cancel</button>
                        <button 
                            onClick={handleUpdateOrder}
                            className="bg-blue-500 text-white p-2 rounded-md">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditingOrderDialog;