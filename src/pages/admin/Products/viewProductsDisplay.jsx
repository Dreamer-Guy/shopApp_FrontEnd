import { useEffect, useState } from "react";
import {useToast} from "@/hooks/use-toast";
import {useDispatch,useSelector} from "react-redux";
import { getAllProducts } from "../../../store/product";
import ProductLists from "../../../components/admin/Content/Product/ProductLists";


const ViewProductsDisplay = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { products } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getAllProducts()).then((res) => {
            if (res.error) {
                toast({
                    title: "There is an error occured while fetching products, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
            }
        });
    }, []);
    const [page,setPage]=useState(1);
    const ROW_PER_PAGE=5;
    const currentProducts=products.slice((page-1)*ROW_PER_PAGE,page*ROW_PER_PAGE);
    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <ProductLists products={currentProducts} />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        Showing {Math.min((page-1)*ROW_PER_PAGE + 1, products.length)} to {Math.min(page*ROW_PER_PAGE, products.length)} of {products.length} products
                    </p>
                    
                    <div className="flex justify-center gap-2">
                        <button 
                            onClick={() => setPage(Math.max(page-1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 
                                hover:bg-gray-50 transition-colors disabled:opacity-50
                                disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        
                        {Array.from({length: Math.ceil(products.length/ROW_PER_PAGE)}).map((_, index) => (
                            <button 
                                onClick={() => setPage(index+1)}
                                key={index} 
                                className={`w-10 h-10 rounded-lg border ${
                                    page === index+1 
                                        ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                                        : 'border-gray-300 hover:bg-gray-50'
                                } transition-colors`}
                            >
                                {index+1}
                            </button>
                        ))}
                        
                        <button 
                            onClick={() => setPage(Math.min(page+1, Math.ceil(products.length/ROW_PER_PAGE)))}
                            disabled={page === Math.ceil(products.length/ROW_PER_PAGE)}
                            className="px-4 py-2 rounded-lg border border-gray-300 
                                hover:bg-gray-50 transition-colors disabled:opacity-50
                                disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};



export default ViewProductsDisplay;