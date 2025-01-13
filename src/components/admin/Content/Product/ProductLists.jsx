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
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-5">
                    <h3 className="text-sm font-medium text-gray-500">Product</h3>
                </div>
                <div className="col-span-7">
                    <div className="grid grid-cols-3 gap-4">
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="text-sm font-medium text-gray-500">Sale Price</p>
                        <p className="text-sm font-medium text-gray-500 text-right">Stock</p>
                    </div>
                </div>
            </div>

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