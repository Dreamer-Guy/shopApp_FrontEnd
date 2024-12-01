import RatingStar from "../../../../components/shopping/RatingStar";
import { FaTrash } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const handleDelete=()=>{

    };
    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="w-11/12 flex flex-col md:flex-row p-3 justify-between border border-black rounded-lg shadow-lg">
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
                    <p className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Price:</span>${product.price}</p>
                    <p className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Sale Price:</span>${product.salePrice}</p>
                    <p className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Stock:</span><p className="bg-green-400 p-1 md:p-2 rounded-lg">{product.totalStock}</p></p>
                </div>
            </div>
            <div 
            onClick={()=>handleDelete()}
            className="w-1/12 flex flex-row justify-center hover:cursor-pointer"><FaTrash className="w-6 h-6"/></div>
        </div>
    );

};


export default ProductCard;