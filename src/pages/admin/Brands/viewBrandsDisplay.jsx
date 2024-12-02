import { getAllBrands } from "../../../store/admin/brandSlice.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BrandsList from "../../../components/admin/Content/Brands/brandsList.jsx";
const ViewBrandsContent = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {isLoading,brands,error}=useSelector((state)=>state.brand);
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
    const ROW_PER_PAGE=4;
    const currentBrands=brands.slice((page-1)*ROW_PER_PAGE,page*ROW_PER_PAGE);
    return(
        <div className="flex flex-col justify-center items-center">
            <div className="p-4 flex flex-col gap-4 w-full md:w-2/3">
                <h2 className="text-2xl font-bold">All brands</h2>
                <div className="flex flex-row justify-between items-center text-lg font-semibold">
                    <div className="w-1/2 flex flex-row justify-start pl-10">
                        <p>Brand</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-center">
                        <p>Description</p>
                    </div>
                </div>
                <BrandsList brands={currentBrands} isLoading={isLoading} error={error}/>
            </div>
            <div className="mt-4 flex flex-row justify-center items-center gap-2">
                <button 
                onClick={()=>setPage(Math.max(page-1,1))}
                className="p-2 min-w-20 rounded-lg border-2 border-black">Previous</button>
                {
                    Array.from({length:Math.ceil(brands.length/ROW_PER_PAGE)}).map((_,index)=>(
                        <button 
                        onClick={()=>setPage(index+1)}
                        key={index} className={`${page===index+1?'bg-blue-400':''} w-8 h-8 border border-black rounded-lg`}>{index+1}</button>
                    ))
                }
                <button 
                onClick={()=>setPage(Math.min(page+1,Math.ceil(brands.length/ROW_PER_PAGE)))}
                className="p-2 min-w-20 rounded-lg border-2 border-black">Next</button>
            </div>
        </div>
    );
};

export default ViewBrandsContent;