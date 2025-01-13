import { deleteBrand } from "@/store/admin/brandSlice.js";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const BrandItemCard = ({ brand }) => {
    const dispatch = useDispatch();
    const {toast}=useToast();
    const handleDeleteBrand=()=>{
        dispatch(deleteBrand(brand._id)).then(res=>{
            if(res.error){
                toast({
                    title: "There is an error occured while deleting brand, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Delete brand successfully",
            });
        });
    };
    return (
        <div className="w-full flex flex-row items-center gap-2">
            <div className="w-11/12 flex flex-row items-center justify-between">
                <div className="w-1/4 flex flex-row justify-start items-center gap-3">
                    <div>
                        <img src={brand?.image} alt={brand?.name} className="w-20 h-20 object-cover rounded-lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{brand?.name}</h3>
                    </div>
                </div>
                <div className="w-1/3 flex flex-row justify-start">
                    <p className="text-sm">{brand?.description}</p>
                </div>
            </div>
            <div className="w-1/12 flex flex-row justify-center items-center">
                <div
                    onClick={()=>{handleDeleteBrand()}} 
                    className="w-10 h-10 flex justify-center items-center hover:bg-red-500 rounded-lg cursor-pointer">
                    <FaRegTrashCan/>
                </div>
            </div>
        </div>
    );
};

export default BrandItemCard;