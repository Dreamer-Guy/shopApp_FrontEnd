import { FaTrash } from "react-icons/fa6";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertDiaglog from "@/components/AlertDialog";
import { deleteStaff } from "@/store/staff/adminStaffSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import EditingStaffDialog from "./EditingDialog";
import  {setCurrentEdittingStaffId} from "@/store/staff/adminStaffSlice.js";

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
            
            <div className="group hover:bg-gray-50 transition-all duration-200">
                <div className="grid grid-cols-5 px-6 py-4 items-center">
                    <div className="col-span-1" onClick={() => {
                        dispatch(setCurrentEdittingStaffId(user._id));
                        setOpenEditDialog(true);
                    }}>
                        <p className="text-gray-900 font-medium truncate">{user?.fullName}</p>
                    </div>
                    
                    <div className="col-span-1">
                        <p className="text-gray-700 truncate">{user?.userName}</p>
                    </div>
                    
                    <div className="col-span-2">
                        <p className="text-gray-700 truncate">{user?.email}</p>
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-between">
                        <p className="text-gray-600 text-sm">{user?.createdAt}</p>
                        <button
                            onClick={handleDeleteStaff}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 
                                rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;