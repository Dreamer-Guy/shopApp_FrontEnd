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


const AddProductDisplay = ({ }) => {
    const dispatch = useDispatch();
    const {toast} = useToast();
    const {brands} = useSelector(state => state.brand);
    const {categories, currentCategoryTypicals} = useSelector(state => state.category);
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
    const onSubmit=()=>{
        dispatch(addProduct(formData)).then(res=>{
            if(res.error){
                toast({
                    title: "There is an error occured while adding product, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Add product successfully",
            });
            setFormData(initFormData);
        });
    };
    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Add New Product</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Fill in the information below to add a new product to your inventory
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 sm:p-8">
                        <div className="space-y-6">
                            <CustomForm
                                formControl={formControl}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={onSubmit}
                                submitText="Add Product"
                                submitClassName="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                                    text-white font-medium rounded-lg transition-colors duration-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AddProductDisplay;