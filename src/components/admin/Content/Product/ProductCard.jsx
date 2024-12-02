import RatingStar from "../../../../components/shopping/RatingStar";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {deleteProduct} from "../../../../store/product/index.js";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const ProductCard = ({ product }) => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDelete=()=>{
        dispatch(deleteProduct(product._id)).then((res)=>{
            if(res.error){
                console.log(res);
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
        <div className="flex flex-row justify-between items-center gap-2">
            <div
                onClick={()=>navigate(`/admin/products/detail/${product._id}`)} 
                className="w-11/12 flex flex-col md:flex-row p-3 justify-between border border-black rounded-lg shadow-lg">
                <div className="max-w-3/5 flex flex-row justify-center items-center gap-4">
                    <div className="w-24 h-24  flex justify-center items-center">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-semibold">{product.name}</h4>
                        <div>
                            <RatingStar rating={Math.floor(product.rating)} />
                        </div>
                    </div>
                </div>
                <div className="md:w-2/5 flex flex-col md:flex-row items-start  md:justify-between md:items-center gap-2">
                    <div className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Price:</span>${product.price}</div>
                    <div className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Sale Price:</span>${product.salePrice}</div>
                    <div className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Stock:</span><p className="bg-green-400 p-1 md:p-2 rounded-lg">{product.totalStock}</p></div>
                </div>
            </div>
            <div 
            onClick={()=>handleDelete()}
            className="w-1/12 flex flex-row justify-center hover:cursor-pointer"><FaTrash className="w-6 h-6"/></div>
        </div>
    );

};


export default ProductCard;