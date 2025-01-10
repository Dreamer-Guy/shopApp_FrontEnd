import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {addCategoryTypical,deleteCategoryTypical } from "@/store/admin/categorySlice";
import {useToast} from "@/hooks/use-toast";
import { useState } from "react";
import CustomForm from "../../form";
import adminFormControl from "../../../../config/admin/form";

const categoryTypicalForm=adminFormControl.categoryTypical;
const ViewCategoryTypicals = ({category_id,categoryTypicals }) => {
    const initFormData={
        category_id:category_id,
        name:'',
        description:'',
    };
    const [formData,setFormData]=useState(initFormData);
    const {toast}=useToast();
    const dispatch = useDispatch();
    const handleDeleteCategoryTypical = (id) => {
        dispatch(deleteCategoryTypical(id)).then((res) => {
            if (res.error) {
                toast({
                    title: "There is an error occured while deleting category typical, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
            }
            else {
                toast({
                    title: "Category typical deleted successfully",
                });
            }
        });
    };
    const onSubmit=()=>{
        dispatch(addCategoryTypical(formData)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while adding category typical, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }else{
                toast({
                    title:"Category typical added successfully",
                });
            }
        });
    };
    return (
        <div>
            <div className="flex flex-col gap-3 mt-4">
                {
                    categoryTypicals.map((categoryTypical,index) =>(
                        <div className="flex flex-row justify-center items-center gap-4" key={index}>
                            <div 
                            className="w-5/6 flex flex-row justify-between items-center border border-black rounded-lg p-2">
                                <p>{categoryTypical.name}</p>
                                <p className="w-2/5">{categoryTypical.description}</p>
                            </div>
                            <div
                            onClick={()=>handleDeleteCategoryTypical(categoryTypical._id)}>
                                <FaTrash className="hover:cursor-pointer"/>
                            </div>
                        </div>
                    ))
                }
            </div>
        <div className="mt-20 flex flex-col items-center">
            <h3 className=" w-1/2 text-xl font-bold border-t-2 border-black border-dashed text-center">Add new typical to the category</h3>
            <div className="w-full md:w-2/3">
                <CustomForm formControl={categoryTypicalForm} formData={formData} 
                setFormData={setFormData} submitText="Add new Typical" onSubmit={onSubmit}/>
            </div>
        </div>
        </div>
        
    );
};

export default ViewCategoryTypicals;