import { useParams } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getProductById,getProductDetailsById,updateProduct,
setCurrentProductDetails
} from "../../../store/product/index.js";
import { getAllBrands } from "../../../store/admin/brandSlice.js";
import {getAllCategories} from "../../../store/admin/categorySlice.js";
import { useToast } from "@/hooks/use-toast";
import RatingStar from "../../../components/shopping/RatingStar.jsx";


import CustomForm from "../../../components/admin/form.jsx";
const initFormData={
    name:'',
    brand:'',
    image:{},
    category:'',
    price:'',
    salePrice:'',
    totalStock:'',
    description:'',
}
const initProductControlForm=[
    {
        type:'file',
        '_id':'image',
        label:'Product Image',
    },
    {
        type:'text',
        '_id':'name',
        label:'Product Name',
        placeholder:'Your product name',
    },
    {
        type:'select',
        '_id':'brand',
        label:'Brand',
        options:[],
    },
    {
        type:'select',
        '_id':'category',
        label:'Category',
        options:[],
    },
    {
        type:'text',
        '_id':'price',
        label:'Price',
        placeholder:'Your product price',
    },
    {
        type:'text',
        '_id':'salePrice',
        label:'Sale Price',
        placeholder:'Your product sale price',
    },
    {
        type:'text',
        '_id':'totalStock',
        label:'Total Stock',
        placeholder:'Your product stock',
    },
    {
        type:'text',
        '_id':'description',
        label:'Description',
        placeholder:'Your product description',
    }
];
const ProductDetailPage=()=>{
    const {id}=useParams();
    const dispatch=useDispatch();
    const {toast}=useToast();
    const {currentProduct,currentProductDetails,error,isLoading}=useSelector(state=>state.product);
    const {brands}=useSelector(state=>state.brand);
    const {categories}=useSelector(state=>state.category);
    const [productControlForm,setProductControlForm]=useState(initProductControlForm);
    const [formData,setFormData]=useState(initFormData);

    useEffect(()=>{
        dispatch(getProductById(id)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching product, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
        dispatch(getProductDetailsById(id)).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching product details, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
        dispatch(getAllBrands()).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching brands, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
        dispatch(getAllCategories()).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching categoires, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
        });
    },[id]);

    useEffect(()=>{
        const newProductControlForm=productControlForm?.map((element,index)=>{
            if(element.type==='select'){
                if(element._id==='brand'){
                    const brandOptions=brands.map((brand)=>({label:brand.name,value:brand._id}));
                    element['options']=brandOptions;
                }
                else if(element._id==='category'){
                    const categoryOptions=categories.map((category)=>({label:category.name,value:category._id}));
                    element['options']=categoryOptions;
                }
            }
            return element;
        });
        setProductControlForm(newProductControlForm);
        const newFormData={
            name:currentProduct.name?currentProduct.name:'',
            brand:currentProduct.brand_id?._id?currentProduct.brand_id?._id:'',
            category:currentProduct.category_id?._id?currentProduct.category_id?._id:'',
            price:currentProduct.price?currentProduct.price:'',
            salePrice:currentProduct.salePrice?currentProduct.salePrice:'',
            totalStock:currentProduct.totalStock?currentProduct.totalStock:'',
            description:currentProduct.description?currentProduct.description:'',
        };
        setFormData((pre)=>({...pre,...newFormData}));
    },[brands]);

    useEffect(()=>{
        setProductControlForm(initProductControlForm);
        const newFormControlProps=currentProductDetails?.map((element,index)=>{
            for(const key of Object.keys(element)){
                if(key==='product_id' || key==='property_id'){
                    continue;
                }
                return {
                    type:'text',
                    '_id':element.name,
                    label:element.name,
                    placeholder:element[key],
                };
            }
        });  
        setProductControlForm((pre)=>([...pre,...newFormControlProps]));
    },[currentProductDetails]);

    useEffect(()=>{
        setFormData((pre)=>({...pre,productDetails:currentProductDetails}));
        const newFormDataProps=currentProductDetails?.reduce((acc,element)=>{
            acc[element.name]=element.value;
            return acc;
        },{});
        setFormData((pre)=>({...pre,...newFormDataProps}));
    },[currentProductDetails]);
    
    useEffect(()=>{
        const newFormData={
            name:currentProduct.name?currentProduct.name:'',
            image:currentProduct.image?currentProduct.image:'',
            brand:currentProduct.brand_id?._id?currentProduct.brand_id?._id:'',
            category:currentProduct.category_id?._id?currentProduct.category_id?._id:'',
            price:currentProduct.price?currentProduct.price:'',
            salePrice:currentProduct.salePrice?currentProduct.salePrice:'',
            totalStock:currentProduct.totalStock?currentProduct.totalStock:'',
            description:currentProduct.description?currentProduct.description:'',
        };
        setFormData((pre)=>({...pre,...newFormData}));
    },[currentProduct]);

    useEffect(()=>{
        dispatch(setCurrentProductDetails(formData));
    },[formData]);

    const onSubmit=()=>{
        dispatch(updateProduct({id,data:formData})).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while updating product, please try again",
                    description:res.payload,
                    variant: "destructive",
                });
            }
            else{
                toast({
                    title:"Product updated successfully",
                    description:"Product has been updated successfully",
                    variant: "success",
                });
            }
        });
    };

    return(
        <div>
            <h2 className="text-2xl font-bold">Product Detail Page</h2>
            <div className="w-full flex flex-col justify-center items-center p-4">
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-center">{currentProduct.name}</h3>
                            <div className="flex flex-row gap-2">
                                <RatingStar rating={Math.floor(currentProduct.rating)} />
                                <p>{currentProduct.totalReview?`(${currentProduct.totalRating})`:'(No reviews)'}</p>      
                            </div>
                        </div>           
            </div>
            <div>
                <CustomForm 
                    formData={formData}
                    setFormData={setFormData}
                    formControl={productControlForm}
                    onSubmit={()=>onSubmit()}
                    submitText="Update Product"/>
            </div>
        </div>
    );
}

export default ProductDetailPage;