import adminFormControl from "../../../config/admin/form.js";
import CustomForm from "../../../components/admin/form.jsx"
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addCategory} from "@/store/category/index.js";
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
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Create a new category to organize your products effectively
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <CustomForm 
                        formControl={categoryForm} 
                        formData={formData} 
                        setFormData={setFormData} 
                        onSubmit={onSubmit} 
                        submitText="Add Category"
                    />
                </div>
            </div>
        </div>
    )
}

export default addCategoryContent;