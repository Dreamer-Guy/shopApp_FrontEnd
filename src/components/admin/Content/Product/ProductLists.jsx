import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductLists = ({products}) => {
    const navigate = useNavigate();
    
    if (!products?.length) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">No products found</p>
            </div>
        );
    }
    
    return (
        <div className="divide-y divide-gray-200">

            <div className="divide-y divide-gray-100">
                {products.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => navigate(`/admin/products/detail/${product._id}`)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductLists;