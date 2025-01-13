import adminFormControl from "../../../config/admin/form.js";
import CustomForm from "../../../components/admin/form.jsx"
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addCategory} from "../../../store/admin/categorySlice.js";
import { useToast } from "@/hooks/use-toast";
const categoryForm=adminFormControl.category;

const initFormData={
    name:'',
    image:{},
    description:'',
};

const addCategoryContent=()=>{
    const {toast}=useToast();
    const dispatch = useDispatch();
    const [formData,setFormData]=useState(initFormData);
    const onSubmit=()=>{
        dispatch(addCategory(formData)).then((res)=>{
            if(!res.error){
                toast({
                    title:"Cateogry added successfully",
                });
                setFormData(initFormData);
            }
            else{
                toast({
                    title:"There is an error occured while adding category, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
    }
    return(
        <div className="flex flex-col items-center justify-center gap-4 mt-5">
            <h2 className="text-2xl font-bold">Adding new category to your shop</h2>
            <div className="w-full md:w-2/3">
                <CustomForm formControl={categoryForm} formData={formData} setFormData={setFormData} 
                onSubmit={onSubmit} submitText="Add new Category"/>
            </div>
        </div>
    )
}

export default addCategoryContent;