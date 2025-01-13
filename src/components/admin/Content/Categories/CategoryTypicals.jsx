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
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Typicals</h3>
                
                {categoryTypicals.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">No typicals added yet</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {categoryTypicals.map((categoryTypical, index) => (
                            <div 
                                key={index}
                                className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 
                                    hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">
                                        {categoryTypical.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 truncate">
                                        {categoryTypical.description || 'No description'}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleDeleteCategoryTypical(categoryTypical._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 
                                        rounded-full transition-colors duration-200"
                                >
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-6 border-t border-gray-200">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Typical</h3>
                    
                    <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-200">
                        <CustomForm 
                            formControl={categoryTypicalForm} 
                            formData={formData} 
                            setFormData={setFormData} 
                            submitText="Add Typical" 
                            onSubmit={onSubmit}
                            submitClassName="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 
                                text-white font-medium rounded-lg transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCategoryTypicals;