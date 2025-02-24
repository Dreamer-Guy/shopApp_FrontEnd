import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { deleteCategory } from "@/store/category/index.js";

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
        <div className="w-full flex flex-col xs:flex-row items-start xs:items-center p-2 xs:p-4 gap-2">
            <div 
                onClick={() => navigate(`/admin/categories/detail/${category._id}`)} 
                className="w-full xs:w-11/12 grid grid-cols-1 xs:grid-cols-12 gap-2 xs:gap-4">
                <div className="col-span-1 xs:col-span-5 flex flex-col xs:flex-row items-center xs:items-center gap-2 xs:gap-3">
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full xs:w-20 h-32 xs:h-20 min-w-[120px] object-cover rounded-lg" 
                    />
                    <h3 className="text-base xs:text-lg font-semibold text-center xs:text-left break-words">{category.name}</h3>
                </div>
                <div className="col-span-1 xs:col-span-7 mt-2 xs:mt-0">
                    <p className="text-xs xs:text-sm text-gray-600 break-words">{category.description}</p>
                </div>
            </div>
            <div className="w-full xs:w-1/12 flex justify-end xs:justify-center mt-2 xs:mt-0">
                <div
                    onClick={handleDeleteCategory} 
                    className="w-8 h-8 xs:w-10 xs:h-10 flex justify-center items-center hover:bg-red-500 hover:text-white rounded-lg cursor-pointer transition-colors">
                    <FaRegTrashCan className="w-4 h-4 xs:w-5 xs:h-5"/>
                </div>
            </div>
        </div>
    );
};

export default CategoryItemCard;