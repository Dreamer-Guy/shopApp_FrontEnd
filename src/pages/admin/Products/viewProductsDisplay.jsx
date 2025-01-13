import { useEffect, useState } from "react";
import {useToast} from "@/hooks/use-toast";
import {useDispatch,useSelector} from "react-redux";
import { getAllProducts } from "../../../store/product";
import ProductLists from "../../../components/admin/Content/Product/ProductLists";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {getAllBrands} from "@/store/admin/brandSlice.js";
import {getAllCategories} from "@/store/admin/categorySlice.js";
import { set } from "react-hook-form";


const ROW_PER_PAGE=5;
const initPaging={
    previous:0,
    current:1,
    next:2,
}

const initQuery={
    page:1,
    limit:ROW_PER_PAGE,
    sort:{
        "name":1
    },
    filter:{
        category:"all",
        brand:"all",
    }
}



const ViewProductsDisplay = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { products,totalProducts} = useSelector(state => state.product);
    const { brands } = useSelector(state => state.brand);
    const { categories } = useSelector(state => state.category);
    const [paging,setPaging]=useState(initPaging);
    const [query,setQuery]=useState(initQuery);
    useEffect(() => {
        dispatch(getAllProducts(query)).then((res) => {
            if (res.error) {
                toast({
                    title: "There is an error occured while fetching products, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
            }
        });
        dispatch(getAllBrands());
        dispatch(getAllCategories());
    }, [query]);
    return (
        <div>
            <h2  className="text-2xl font-bold">All Products</h2>
            <div>
                <div className="flex flex-row gap-3 my-4">
                    <select
                        className="w-40 border border-black p-2 rounded-lg hover:cursor-pointer"
                        value={query.filter.category}
                        onChange={(e)=>{
                            setQuery(pre=>({
                                ...pre,
                                page:1,
                                filter:{
                                    ...pre.filter,
                                    category:e.target.value
                                }
                            }));
                            setPaging(initPaging);
                        }}>
                        <option value="all">All Categories</option>
                        {categories.map((category,index)=>(
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <select
                        className="w-40 border border-black p-2 rounded-lg hover:cursor-pointer"
                        value={query.filter.brand}
                        onChange={(e)=>{
                            setQuery(pre=>({
                                ...pre,
                                page:1,
                                filter:{
                                    ...pre.filter,
                                    brand:e.target.value
                                }
                            }));
                            setPaging(initPaging);
                        }}>
                        <option value="all">All Brands</option>
                        {brands.map((brand,index)=>(
                            <option key={index} value={brand._id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden md:flex flex-row justify-between w-11/12 px-5 text-lg font-semibold">
                    <div 
                        onClick={()=>{
                            setQuery(pre=>({
                                ...pre,
                                sort:{
                                    name:pre.sort?.name===1?-1:1
                                }
                            }))
                        }} 
                        className="flex flex-row justify-center items-center w-1/5 gap-2 hover:cursor-pointer">
                        <p className="text-lg font-semibold">Products</p>
                        <div className="flex flex-col justify-center items-center gap-0">
                            <FaChevronUp className="w-3 h-3"/>
                            <FaChevronDown className="w-3 h-3"/>
                        </div>
                    </div>
                    <div className="w-2/5 flex flex-row justify-between">
                        <div 
                            onClick={()=>{
                                setQuery(pre=>({
                                    ...pre,
                                    sort:{
                                        price:pre.sort?.price===1?-1:1
                                    }
                                }))
                            }} 
                            className="flex flex-row justify-start gap-2 hover:cursor-pointer items-center">
                            <p className="text-lg font-semibold">Price</p>
                            <div>
                                <FaChevronUp className="w-3 h-3"/>
                                <FaChevronDown className="w-3 h-3"/>
                            </div>
                        </div>
                        <div 
                            onClick={()=>{
                                setQuery(pre=>({
                                    ...pre,
                                    sort:{
                                        salePrice:pre.sort?.salePrice===1?-1:1
                                    }
                                }))
                            }} 
                            className="flex flex-row justify-start gap-2 hover:cursor-pointer items-center">
                            <p className="text-lg font-semibold">Sale Price</p>
                            <div>
                                <FaChevronUp className="w-3 h-3"/>
                                <FaChevronDown className="w-3 h-3"/>
                            </div>
                        </div>
                        <div
                            onClick={()=>{
                                setQuery(pre=>({
                                    ...pre,
                                    sort:{
                                        totalStock:pre.sort?.totalStock===1?-1:1
                                    }
                                }))
                            }}  
                            className="flex flex-row justify-end gap-2 hover:cursor-pointer items-center">
                            <p className="text-lg font-semibold">Stock</p>
                            <div>
                                <FaChevronUp className="w-3 h-3"/>
                                <FaChevronDown className="w-3 h-3"/>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductLists products={products} />
            </div>
            <div className="mt-4 flex flex-row justify-center items-center gap-2">
                <button 
                onClick={()=>{
                    setQuery(pre=>({
                        ...pre,
                        page:1
                    }))
                    setPaging(initPaging);
                }}
                className="p-2 min-w-20 rounded-lg border-2 border-black hover:bg-cyan-200">First</button>
                {
                    Object.values(paging).map((page,index)=>{
                        if(page<=0 || page>Math.ceil(totalProducts/ROW_PER_PAGE)){
                            return null;
                        }
                        return (
                            <button 
                            key={index}
                            onClick={()=>{
                                setQuery(pre=>({
                                    ...pre,
                                    page:page
                                }))
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
                    const totalPage=Math.ceil(totalProducts/ROW_PER_PAGE);
                    setQuery(pre=>({
                        ...pre,
                        page:totalPage
                    }));
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