import { deleteProduct,restoreSoftDeletedProduct } from "@/store/product";
import RatingStar from "../../../../components/shopping-view/ratingStar.jsx";
import AlertDiaglog from "@/components/AlertDialog.jsx";
import { FaTrash,FaUndo } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const initDialog={
    title:"Delete Product",
    content:"Are you sure you want to delete this product?",
    continueFunction:()=>{}
}

const SoftDeletedProductCard=({product})=>{
    const {toast}=useToast();
    const dispatch = useDispatch();
    const [openDialog,setOpenDialog]=useState(false);
    const [dialogState,setDialogState]=useState(initDialog);
    const handlePermanentDelete=()=>{
        setDialogState((pre)=>({
            title:"Delete Product",
            content:"Are you sure you want to delete this product?",
            continueFunction:()=>{
                dispatch(deleteProduct(product._id)).then((res)=>{
                    if(res.error){
                        console.log(res);
                        toast({
                            title:"There is an error occured while delete product, please try again",
                            description:res.payload,
                            variant: "destructive",
                        });
                    }
                    else{
                        toast({
                            title:"Delete Product",
                            description:'Delete successfully',
                        });
                    }
                });
            }
        }));
        setOpenDialog((pre)=>(true));
        // dispatch(deleteProduct(product._id)).then((res)=>{
        //     if(res.error){
        //         console.log(res);
        //         toast({
        //             title:"There is an error occured while delete product, please try again",
        //             description:res.payload,
        //             variant: "destructive",
        //         });
        //     }
        //     else{
        //         toast({
        //             title:"Delete Product",
        //             description:'Delete successfully',
        //         });
        //     }
        // });
    };
    const handleRestore=()=>{
        setDialogState((pre)=>({
            title:"Restore Product",
            content:"Are you sure you want to restore this product?",
            continueFunction:()=>{
                dispatch(restoreSoftDeletedProduct(product._id)).then((res)=>{
                    if(res.error){
                        console.log(res);
                        toast({
                            title:"There is an error occured while restore product, please try again",
                            description:res.payload,
                            variant: "destructive",
                        });
                    }
                    else{
                        toast({
                            title:"Restore Product",
                            description:'Restore successfully',
                        });
                    }
                });
            }
        }));
        setOpenDialog((pre)=>(true));
    }
    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <AlertDiaglog open={openDialog} setOpen={setOpenDialog} title={dialogState.title} 
            content={dialogState.content} continueFunction={dialogState.continueFunction}/>
            <div
                onClick={()=>navigate(`/admin/products/detail/${product._id}`)} 
                className="w-11/12 flex flex-col md:flex-row p-3 justify-between border border-black rounded-md shadow-lg">
                <div className="max-w-3/5 flex flex-row justify-center items-center gap-4">
                    <div className="w-24 h-24  flex justify-center items-center">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-semibold">{product.name}</h4>
                        <div>
                            <RatingStar rating={Math.floor(product.rating)} />
                        </div>
                    </div>
                </div>
                <div className="md:w-2/5 flex flex-col md:flex-row items-start  md:justify-between md:items-center gap-2">
                    <div className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Price:</span>${product.price}</div>
                    <div className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Sale Price:</span>${product.salePrice}</div>
                    <div className="flex flex-row justify-start items-center"><span className="md:hidden text-base font-semibold mr-5">Stock:</span><p className="bg-green-400 p-1 md:p-2 rounded-lg">{product.totalStock}</p></div>
                </div>
            </div>
            <div 
            className="w-1/12 flex flex-col md:flex-row justify-center gap-2 hover:cursor-pointer">
                <FaTrash
                    onClick={()=>{handlePermanentDelete()}} 
                    className="w-10 h-10 bg-red-400 text-white p-3 rounded-lg"/>
                <FaUndo
                    onClick={()=>{handleRestore()}} 
                    className="w-10 h-10 bg-green-400 text-white p-3 rounded-lg"/>
            </div>
        </div>
    );
};

export default SoftDeletedProductCard;