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
        <div className="p-4">
            <button onClick={()=>setIsCategoryDetailsPage(!isCategoryDetailsPage)} className="bg-black text-white p-2 rounded-md">Switch to {isCategoryDetailsPage?'Typical details of category':'Category details'}</button>
            <h2 className="text-2xl font-bold">{isCategoryDetailsPage?'Category details':'Typical details of category'}</h2>
            <div>
            {
                isCategoryDetailsPage?
                <CustomForm formControl={categoryForm} formData={formData} setFormData={setFormData} 
                onSubmit={onSubmit} submitText="Update category"/>
                :<CategoryTypicals categoryTypicals={currentCategoryTypicals} category_id={id}/>
            }
            </div>
        </div>
    );
}


export default CategoryDetails;