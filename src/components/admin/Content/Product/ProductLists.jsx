import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductLists=({products})=>{
    const navigate=useNavigate();
    return(
        <div>
            <div className="flex flex-col gap-3">
                {products.map((product,index) => (
                    <div
                        key={index}
                        className="hover:cursor-pointer">
                        <ProductCard product={product} key={index}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ProductLists;