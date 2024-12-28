import { useEffect, useState } from "react";
import {useToast} from "@/hooks/use-toast";
import {useDispatch,useSelector} from "react-redux";
import { getSoftDeletedProducts,restoreSoftDeletedProduct,deleteProduct } from "../../../store/product";
import SoftDeletedList from "../../../components/admin/Content/Product/softDeletedList";

const initQueryParams={
    page:1,
    limit:5
}
const initPagination={
    previous:initQueryParams.page-1,
    current:initQueryParams.page,
    next:initQueryParams.page+1,
};

const softDeletedProductsPage=()=>{
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { softDeletedProducts,totalSoftDeletedProducts } = useSelector(state => state.product);
    const [queryParams,setQueryParams]=useState(initQueryParams);
    const [pagination,setPagination]=useState(initPagination);
    useEffect(()=>{
        dispatch(getSoftDeletedProducts(queryParams)).then((res) => {
            if (res.error) {
                toast({
                    title: "There is an error occured while fetching products, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
            }
        });
    },[queryParams]);
    return (
        <div>
            <h2  className="text-2xl font-bold">Soft Deleted Products</h2>
            <div>
                {totalSoftDeletedProducts===0
                    ?<div className="text-2xl italic mt-7">No deleted products</div>
                    :<div>
                        <SoftDeletedList products={softDeletedProducts}/>
                        <div className="flex flex-row justify-center items-center gap-2 mt-5">
                            <button 
                                onClick={()=>{
                                    setQueryParams({
                                        ...queryParams,
                                        page:pagination.previous
                                    });
                                    setPagination(pre=>({
                                        ...pagination,
                                        previous:initPagination.previous,
                                        current:initPagination.current,
                                        next:initPagination.next,
                                    }));
                                }}
                                disabled={pagination.previous<1}
                                className="bg-gray-300 h-12 w-12 rounded-md">First</button>
                            {
                                Object.values(pagination).map((value,index)=>{
                                    if(value<1 || value>Math.ceil(totalSoftDeletedProducts/queryParams.limit)){
                                        return null;
                                    }
                                    return (
                                        <button 
                                            key={index}
                                            onClick={()=>{
                                                setQueryParams({
                                                    ...queryParams,
                                                    page:value
                                                });
                                                setPagination(pre=>({
                                                    ...pagination,
                                                    previous:value-1,
                                                    current:value,
                                                    next:value+1
                                                }));
                                            }}
                                            className={` h-12 w-12 rounded-md ${value===queryParams.page?'bg-blue-400':'bg-gray-300'}`}>{value}</button>
                                    )
                                })
                            }
                            <button 
                                onClick={()=>{
                                    setQueryParams({
                                        ...queryParams,
                                        page:Math.ceil(totalSoftDeletedProducts/queryParams.limit)
                                    });
                                    setPagination(pre=>({
                                        ...pagination,
                                        previous:Math.ceil(totalSoftDeletedProducts/queryParams.limit)-1,
                                        current:Math.ceil(totalSoftDeletedProducts/queryParams.limit),
                                        next:Math.ceil(totalSoftDeletedProducts/queryParams.limit)+1
                                    }));
                                }}
                                className="bg-gray-300 h-12 w-12 rounded-md">Last</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default softDeletedProductsPage;