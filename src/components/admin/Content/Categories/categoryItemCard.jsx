import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { deleteCategory } from "@/store/admin/categorySlice.js";

const CategoryItemCard = ({ category }) => {
    const dispatch = useDispatch();
    const {toast}=useToast();
    const navigate=useNavigate();
    const handleDeleteCategory=()=>{
        dispatch(deleteCategory(category._id)).then(res=>{
            if(res.error){
                toast({
                    title: "There is an error occured while deleting category, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Delete category successfully",
            });
        });
    }
    return (
        <div className="w-full flex flex-row items-center gap-2">
            <div 
                onClick={() => navigate(`/admin/categories/detail/${category._id}`)} 
                className="w-11/12 flex flex-row items-center justify-between">
                <div className="w-1/4 flex flex-row justify-start items-center gap-3">
                    <div>
                        <img src={category.image} alt={category.name} className="w-20 h-20 object-cover rounded-lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                </div>
                <div className="w-1/3 flex flex-row justify-start">
                    <p className="text-sm">{category.description}</p>
                </div>
            </div>
            <div className="w-1/12 flex flex-row justify-center items-center">
                <div
                    onClick={()=>{handleDeleteCategory()}} 
                    className="w-10 h-10 flex justify-center items-center hover:bg-red-500 rounded-lg cursor-pointer">
                    <FaRegTrashCan/>
                </div>
            </div>
        </div>
    );
};

export default CategoryItemCard;