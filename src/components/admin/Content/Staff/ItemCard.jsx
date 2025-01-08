import { FaTrash } from "react-icons/fa6";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertDiaglog from "@/components/AlertDialog";
import { deleteStaff } from "@/store/staff";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import EditingStaffDialog from "./EditingDialog";
import  {setCurrentEdittingStaffId} from "@/store/staff/index.js";

const ALTERT_TITLE="Delete Staff";
const ALTERT_CONTENT="Are you sure you want to delete this staff?";

const ItemCard =({user})=>{
    const {toast}=useToast();
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const callbackDeleteStaff=()=>{
        dispatch(deleteStaff(user._id)).then(res=>{
            if(res.error){
                toast({
                    title:"There is an error occured while deleting staff, please try again",
                    variant: "destructive",
                });
            }
            else{
                toast({
                    title:"Staff deleted successfully",
                });
            }
        });
    }
    const handleDeleteStaff=()=>{
        setOpenDialog(true);
    };
    const [openDialog,setOpenDialog]=useState(false);
    const [openEditDialog,setOpenEditDialog]=useState(false);
    return (
        <div>
            <AlertDiaglog open={openDialog} setOpen={setOpenDialog} title={ALTERT_TITLE} 
            content={ALTERT_CONTENT} continueFunction={callbackDeleteStaff}/>
            <EditingStaffDialog open={openEditDialog} setOpen={setOpenEditDialog} staff={user}/>
            <div  
                className="flex flex-row py-3 px-1 border-y items-center hover:cursor-pointer">
                <div
                    onClick={()=>{
                        dispatch(setCurrentEdittingStaffId(user._id));
                        setOpenEditDialog(true);
                    }}    
                    className='w-11/12 flex flex-col md:flex-row gap-2 justify-between'>
                    <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                        <span className='md:hidden font-semibold'>Full Name: </span><p className=''>{user?.fullName}</p>
                    </div>
                    <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                        <span className='md:hidden font-semibold'>User Name: </span><p>{user?.userName}</p>
                    </div>
                    <div className='flex flex-row justify-start w-full md:w-1/5 gap-2'>
                        <span className='md:hidden font-semibold'>Email: </span><p className=''>{user?.email}</p>
                    </div>
                    <div className='flex flex-row justify-start md:justify-end w-full md:w-1/6 gap-2'>
                        <span className='md:hidden font-semibold'>Staff Since: </span><p className=''>{user?.createdAt}</p>
                    </div>
                </div>
                <div className='w-1/12 flex flex-row items-center justify-center hover:cursor-pointer relative'>
                    <div
                        onClick={()=>handleDeleteStaff()}
                        className=' w-10 h-10 flex flex-row items-center justify-center'>
                        <FaTrash size={20} className='hover:text-red-500'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;