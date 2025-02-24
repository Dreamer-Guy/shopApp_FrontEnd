import { useParams } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getProductById,getProductDetailsById,updateProduct,
setCurrentProductDetails
} from "../../../store/product/index.js";
import { getAllBrands } from "@/store/brand/index.js";
import {getAllCategories} from "@/store/category/index.js";
import { useToast } from "@/hooks/use-toast";
import RatingStar from "../../../components/shop/ratingStar.jsx";


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
    cost:'',
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
        '_id':'cost',
        label:'Cost',
        placeholder:'Your product cost',

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
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        View and edit product information
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                                    <img 
                                        src={currentProduct.image} 
                                        alt={currentProduct.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {currentProduct.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <RatingStar rating={Math.floor(currentProduct.rating)} />
                                        <span className="text-sm text-gray-500">
                                            ({currentProduct.totalReview || 'No reviews'})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
                                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${currentProduct.price}
                                    </p>
                                </div>
                                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Stock</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {currentProduct.totalStock}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Edit Product Information
                        </h3>
                        <CustomForm 
                            formData={formData}
                            setFormData={setFormData}
                            formControl={productControlForm}
                            onSubmit={onSubmit}
                            submitText="Update Product"
                            submitClassName="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                                text-white font-medium rounded-lg transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;