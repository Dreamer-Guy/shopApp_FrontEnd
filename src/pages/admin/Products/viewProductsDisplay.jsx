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
        <div>
            <h2>All Products</h2>
            <div>
                <ProductLists products={currentProducts} />
            </div>
            <div className="mt-4 flex flex-row justify-center items-center gap-2">
                <button 
                onClick={()=>setPage(Math.max(page-1,1))}
                className="p-2 min-w-20 rounded-lg border-2 border-black">Previous</button>
                {
                    Array.from({length:Math.ceil(products.length/ROW_PER_PAGE)}).map((_,index)=>(
                        <button 
                        onClick={()=>setPage(index+1)}
                        key={index} className={`${page===index+1?'bg-blue-400':''} w-8 h-8 border border-black rounded-lg`}>{index+1}</button>
                    ))
                }
                <button 
                onClick={()=>setPage(Math.min(page+1,Math.ceil(products.length/ROW_PER_PAGE)))}
                className="p-2 min-w-20 rounded-lg border-2 border-black">Next</button>
            </div>
        </div>
    )
};



export default ViewProductsDisplay;