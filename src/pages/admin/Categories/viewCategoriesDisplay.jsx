import { getAllCategories } from "../../../store/admin/categorySlice.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect ,useState} from "react";
import { useToast } from "@/hooks/use-toast";
import CategoriesList from "../../../components/admin/Content/Categories/categoriesList.jsx";
const ViewCategoriesContent = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {isLoading,categories,error}=useSelector((state)=>state.category);
    useEffect(()=>{
        dispatch(getAllCategories()).then((res)=>{
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
    const currentCategories=categories
    .filter(category=>category.name.toLowerCase()!=='default')
    .slice((page-1)*ROW_PER_PAGE,page*ROW_PER_PAGE);
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div className="p-4 flex flex-col gap-4 w-full md:w-2/3">
                <h2 className="text-2xl font-bold">All categories</h2>
                <div className="flex flex-row justify-between items-center text-lg font-semibold">
                    <div className="w-1/2 flex flex-row justify-start pl-10">
                        <p>Category</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-center">
                        <p>Description</p>
                    </div>
                </div>
                <CategoriesList categories={currentCategories} isLoading={isLoading} error={error}/>
            </div>
            <div className="mt-4 flex flex-row justify-center items-center gap-2">
                <button 
                onClick={()=>setPage(Math.max(page-1,1))}
                className="p-2 min-w-20 rounded-lg border-2 border-black">Previous</button>
                {
                    Array.from({length:Math.ceil((categories.length-1)/ROW_PER_PAGE)}).map((_,index)=>(
                        <button 
                        onClick={()=>setPage(index+1)}
                        key={index} className={`${page===index+1?'bg-blue-400':''} w-8 h-8 border border-black rounded-lg`}>{index+1}</button>
                    ))
                }
                <button 
                onClick={()=>setPage(Math.min(page+1,Math.ceil((categories.length-1)/ROW_PER_PAGE)))}
                className="p-2 min-w-20 rounded-lg border-2 border-black">Next</button>
            </div>
        </div>
    );
};

export default ViewCategoriesContent;