import adminFormControl from "@/config/admin/form";
import CustomForm from "@/components/admin/form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {addStaff} from "@/store/staff/index.js";

const initFormData={
    fullName:'',
    userName:'',
    email:'',
    phone:"000-000-0000",
    salary:0,
    address:'',
};
const AddingStaffPage=()=>{
    const {toast}=useToast();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState(initFormData);
    const onSubmit=()=>{
        dispatch(addStaff(formData)).then(res=>{
            if(res.error){
                toast({
                    title:"There is an error occured while adding staff, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
                return;
            }
            toast({
                title:"Staff added successfully",
            });
            setFormData(initFormData);
        });
    };
    return(
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Staff</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Fill in the information below to create a new staff account
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 sm:p-8">
                        <div className="space-y-6">
                            <CustomForm 
                                formControl={adminFormControl.addStaff} 
                                formData={formData} 
                                setFormData={setFormData} 
                                onSubmit={onSubmit} 
                                submitText="Add Staff"
                                submitClassName="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                                    text-white font-medium rounded-lg transition-colors duration-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddingStaffPage;