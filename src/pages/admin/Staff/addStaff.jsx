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
        <div>
            <h3 className="font-semibold text-lg">Adding Staff Page</h3>
            <div>
                <CustomForm formControl={adminFormControl.addStaff} formData={formData} setFormData={setFormData} 
                onSubmit={()=>{onSubmit()}} submitText="Add Staff"/>
            </div>
        </div>
    );
}

export default AddingStaffPage;