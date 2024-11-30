import adminFormControl from "../../../../config/admin/form";
import CustomForm from "../../form"
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addBrand } from "../../../../store/admin/brandSlice.js";
import { useToast } from "@/hooks/use-toast";
const brandForm=adminFormControl.brand;

const initFormData={
    name:'',
    image:{},
    description:'',
};

const addBrandContent=()=>{
    const {toast}=useToast();
    const dispatch = useDispatch();
    const [formData,setFormData]=useState(initFormData);
    const onSubmit=()=>{
        dispatch(addBrand(formData)).then((res)=>{
            if(res.payload.brand){
                toast({
                    title:"Brand added successfully",
                });
            }
            else{
                toast({
                    title:"There is an error occured while adding brand, please try again",
                    variant: "destructive",
                });
            }
        });
    }
    return(
        <div className="flex flex-col items-center justify-center gap-4 mt-5">
            <h2 className="text-2xl font-bold">Adding new brand to your shop</h2>
            <div className="w-full md:w-2/3">
                <CustomForm formControl={brandForm} formData={formData} 
                setFormData={setFormData} submitText="Add new Brand" onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default addBrandContent;