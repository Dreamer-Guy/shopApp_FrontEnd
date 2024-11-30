import { getAllCategories } from "../../../../store/admin/categorySlice.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CategoriesList from "./categoriesList.jsx";
const ViewCategoriesContent = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {isLoading,categories,error}=useSelector((state)=>state.category);
    useEffect(()=>{
        dispatch(getAllCategories()).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching categories, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
    },[]);
    return(
        <div className="flex flex-row justify-center">
            <div className="p-4 flex flex-col gap-4 w-2/3">
                <h2 className="text-2xl font-bold">All categories</h2>
                <div className="flex flex-row justify-between items-center text-lg font-semibold">
                    <div className="w-1/2 flex flex-row justify-start pl-10">
                        <p>Category</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-center">
                        <p>Description</p>
                    </div>
                </div>
                <CategoriesList categories={categories} isLoading={isLoading} error={error}/>
            </div>
        </div>
    );
};

export default ViewCategoriesContent;