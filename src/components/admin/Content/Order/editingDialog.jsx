import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";


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
    return (
        <div className={`${open===true?'':'hidden'}`}>
            <div className="bg-black opacity-50 z-50 h-screen w-screen fixed inset-0"></div>
            <div className="w-[400px] h-[300px] flex flex-col gap-4 p-5 items-start z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                <h3 className="font-semibold text-lg">Order status</h3>
                <div className="flex flex-col gap-5 mt-4 w-full">
                    <div className="flex flex-row gap-3">
                        <label className="font-semibold">Order status:</label>
                        <select>
                            {orderStatusOptions.map((status,index)=>(
                                <option
                                className="first-letter:uppercase" 
                                key={index} value={status}>{status.charAt(0).toUpperCase()+status.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row gap-3">
                        <label className="font-semibold">Payment Status:</label>
                        <select>
                            <option value="true">Paid</option>
                            <option value="false">Unpaid</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-3 justify-end w-full mt-4">
                        <button
                            onClick={(e)=>{
                                e.preventDefault();
                                setOpen(pre=>false);
                            }} 
                            className="bg-white text-black border border-black p-2 rounded-md">Cancel</button>
                        <button className="bg-blue-500 text-white p-2 rounded-md">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditingOrderDialog;