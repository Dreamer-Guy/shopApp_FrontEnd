import { getAllBrands } from "../../../store/admin/brandSlice.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BrandsList from "../../../components/admin/Content/Brands/brandsList.jsx";
const ViewBrandsContent = () => {
    const {toast} = useToast();
    const dispatch = useDispatch();
    const {isLoading, brands, error} = useSelector((state) => state.brand);
    useEffect(()=>{
        dispatch(getAllBrands()).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching categories, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
    },[]);
    const [page,setPage]=useState(1);
    const ROW_PER_PAGE=5;
    const currentBrands=brands.slice((page-1)*ROW_PER_PAGE,page*ROW_PER_PAGE);
    return(
        <div className="w-full p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Brands</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                            <div className="col-span-5">Brand</div>
                            <div className="col-span-7">Description</div>
                        </div>
                    </div>
                    
                    <BrandsList brands={currentBrands} isLoading={isLoading} error={error}/>
                </div>

                <div className="mt-6 flex justify-center gap-2">
                    <button 
                        onClick={() => setPage(Math.max(page-1, 1))}
                        className="px-4 py-2 rounded-lg border border-gray-300 
                            hover:bg-gray-50 transition-colors"
                    >
                        Previous
                    </button>
                    
                    {Array.from({length: Math.ceil(brands.length/ROW_PER_PAGE)}).map((_, index) => (
                        <button 
                            onClick={() => setPage(index+1)}
                            key={index} 
                            className={`w-10 h-10 rounded-lg border ${
                                page === index+1 
                                    ? 'bg-blue-500 text-white border-blue-500' 
                                    : 'border-gray-300 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            {index+1}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => setPage(Math.min(page+1, Math.ceil(brands.length/ROW_PER_PAGE)))}
                        className="px-4 py-2 rounded-lg border border-gray-300 
                            hover:bg-gray-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewBrandsContent;