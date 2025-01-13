import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {getCategoryById,getCategoryTypicalDetails,updateCategory} from "../../../store/admin/categorySlice.js";
import CustomForm from "../../../components/admin/form";
import adminFormControl from "../../../config/admin/form.js";
import CategoryTypicals from "../../../components/admin/Content/Categories/CategoryTypicals.jsx";

const categoryForm=adminFormControl.category;
const initFormData={
    name:'',
    image:'',
    description:'',
};

const CategoryDetails=()=>{
    const [isCategoryDetailsPage,setIsCategoryDetailsPage]=useState(true);
    const {id}=useParams();
    const dispatch=useDispatch();
    const {toast}=useToast();
    const {currentCategory,currentCategoryTypicals}=useSelector(state=>state.category);
    useEffect(()=>{
        dispatch(getCategoryById(id)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching category, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
        dispatch(getCategoryTypicalDetails(id)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching category details, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
    },[id]);
    useEffect(()=>{
        setFormData({
            name:currentCategory.name,
            image:currentCategory.image,
            description:currentCategory.description,
        });
    },[currentCategory]);
    const [formData,setFormData]=useState(initFormData);
    const onSubmit=()=>{
        dispatch(updateCategory({id,data:formData})).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while updating category, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }else{
                //tech-debt: update the current category in the store
                setFormData({
                    name:currentCategory.name,
                    image:currentCategory.image,
                    description:currentCategory.description,
                });
                toast({
                    title:"Category updated successfully",
                    description:"",
                    variant: "success",
                });
            }
        });
    };
    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isCategoryDetailsPage ? 'Category Details' : 'Typical Details'}
                    </h2>
                    
                    <button 
                        onClick={() => setIsCategoryDetailsPage(!isCategoryDetailsPage)}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 
                            hover:bg-gray-50 active:bg-gray-100
                            text-sm font-medium text-gray-700
                            transition-colors duration-200
                            shadow-sm hover:shadow"
                    >
                        Switch to {isCategoryDetailsPage ? 'Typical Details' : 'Category Details'}
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        {isCategoryDetailsPage ? (
                            <div className="space-y-6">
                                <CustomForm 
                                    formControl={categoryForm} 
                                    formData={formData} 
                                    setFormData={setFormData}
                                    onSubmit={onSubmit}
                                    submitText="Update Category"
                                    title="Edit Category Information"
                                />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <CategoryTypicals 
                                    categoryTypicals={currentCategoryTypicals} 
                                    category_id={id}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CategoryDetails;