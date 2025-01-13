import RatingStar from "../../../shop/ratingStar.jsx";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {softDeleteProduct} from "../../../../store/product/index.js";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ProductCard = ({ product }) => {
    const {toast} = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleDelete = () => {
        dispatch(softDeleteProduct(product._id)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while delete product, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
            else{
                toast({
                    title:"Delete Product",
                    description:'Delete successfully',
                });
            }
        });
    };

    return (
        <div className="grid grid-cols-12 gap-4 p-4 items-center group">
            <div
                onClick={()=>navigate(`/admin/products/detail/${product._id}`)} 
                className="col-span-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h4 className="font-medium text-gray-900 truncate">
                                    {product.name}
                                </h4>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{product.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="mt-1">
                        <RatingStar rating={Math.floor(product.rating)} />
                    </div>
                </div>
            </div>

            <div className="col-span-7">
                <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-sm">
                        <span className="md:hidden text-gray-500 mr-2">Price:</span>
                        <span className="font-medium text-gray-900">${product.price}</span>
                    </div>
                    <div className="text-sm">
                        <span className="md:hidden text-gray-500 mr-2">Sale:</span>
                        <span className="font-medium text-green-600">${product.salePrice}</span>
                    </div>
                    <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${product.totalStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            {product.totalStock}
                        </span>
                    </div>
                </div>
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                            }}
                            className="absolute right-4 opacity-0 group-hover:opacity-100 
                                p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 
                                rounded-full transition-all duration-200"
                        >
                            <FaTrash className="w-4 h-4" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete product</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};


export default ProductCard;