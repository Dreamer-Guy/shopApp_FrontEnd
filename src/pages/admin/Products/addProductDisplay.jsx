import CustomForm from "../../../components/admin/form.jsx";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {addProduct} from "../../../store/product/index.js";
import { getAllBrands } from "../../../store/admin/brandSlice.js";
import {getAllCategories,getCategoryTypicalDetails} from "../../../store/admin/categorySlice.js";
import { useToast } from "@/hooks/use-toast";
const initFormControl=[
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


const AddProductDisplay = ({ }) => {
    const dispatch = useDispatch();
    const {toast}=useToast();
    const {brands}=useSelector(state=>state.brand);
    const {categories,currentCategoryTypicals}=useSelector(state=>state.category);
    const [formControl, setFormControl] = useState(initFormControl);
    const [formData, setFormData] = useState(initFormData);
    useEffect(()=>{
        dispatch(getAllBrands());
        dispatch(getAllCategories());
    },[]);

    useEffect(()=>{
        dispatch(getCategoryTypicalDetails(formData.category));
    },[formData]);

    useEffect(()=>{
        if(brands?.length>0){
            const brandOptions=brands.map(brand=>({
                value:brand._id,
                label:brand.name,
            }));
            setFormControl((prev)=>prev.map((element)=>{
                if(element._id==='brand'){
                    element.options=brandOptions;
                }
                return element;
            }));
        }
    },[brands]);
    useEffect(()=>{
        if(categories?.length>0){
            const categoryOptions=categories.map(category=>({
                value:category._id,
                label:category.name,
            }));
            setFormControl((prev)=>prev.map((element)=>{
                if(element._id==='category'){
                    element.options=categoryOptions;
                }
                return element;
            }));
        }
    },[categories]);

    useEffect(()=>{
        setFormData((prev)=>({...prev,category:categories[0]?._id,brand:brands[0]?._id}));
    },[categories,brands]);

    useEffect(()=>{
        setFormControl((pre)=>initFormControl);
        const newFormControlProps=currentCategoryTypicals?.map((element,index)=>{
            for(const key of Object.keys(element)){
                if(key==='_id' || key==='category_id'){
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
        setFormControl((pre)=>([...pre,...newFormControlProps]));
    },[currentCategoryTypicals]);
    console.log(formData);
    const onSubmit=()=>{
        dispatch(addProduct(formData));
    };
    return (
        <div>
            <h2 className="text-2xl font-bold">Add new product now!</h2>
            <div>
                <CustomForm
                    formControl={formControl}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={()=>onSubmit()}
                    submitText="Add Product"
                />
            </div>
        </div>
    )

};


export default AddProductDisplay;