import { useEffect, useState } from "react";
import {useToast} from "@/hooks/use-toast";
import {useDispatch,useSelector} from "react-redux";
import { getAllProducts } from "../../../store/product";
import ProductLists from "../../../components/admin/Content/Product/ProductLists";


const initPaging={
    previous:0,
    current:1,
    next:2,
}

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
    const [paging,setPaging]=useState(initPaging);
    const ROW_PER_PAGE=5;
    const currentProducts=products
    .slice((page-1)*ROW_PER_PAGE,page*ROW_PER_PAGE);
    return (
        <div>
            <h2  className="text-2xl font-bold">All Products</h2>
            <div>
                <ProductLists products={currentProducts} />
            </div>
            <div className="mt-4 flex flex-row justify-center items-center gap-2">
                <button 
                onClick={()=>{
                    setPage(pre=>1);
                    setPaging(initPaging);
                }}
                className="p-2 min-w-20 rounded-lg border-2 border-black hover:bg-cyan-200">First</button>
                {
                    Object.values(paging).map((page,index)=>{
                        if(page<=0 || page>Math.ceil(products.length/ROW_PER_PAGE)){
                            return null;
                        }
                        return (
                            <button 
                            key={index}
                            onClick={()=>{
                                setPage(page);
                                setPaging({
                                    previous:page-1,
                                    current:page,
                                    next:page+1
                                });
                            }}
                                className={`p-2 min-w-20 rounded-lg border-2 border-black 
                                ${page===paging.current?"bg-cyan-500":""} ${page!==paging.current?"hover:bg-cyan-200":""}`}>{page}</button>
                        )
                    })
                }
                <button 
                onClick={()=>{
                    const totalPage=Math.ceil(products.length/ROW_PER_PAGE);
                    setPage(totalPage);
                    setPaging({
                        previous:totalPage-1,
                        current:totalPage,
                        next:totalPage+1
                    });
                }}
                className="p-2 min-w-20 rounded-lg border-2 border-black hover:bg-cyan-200">Last</button>
            </div>
        </div>
    )
};



export default ViewProductsDisplay;