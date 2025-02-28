import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getStaffProperties,updateStaff} from "@/store/staff/adminStaffSlice.js";
import { useToast } from "@/hooks/use-toast";
import CustomForm from "@/components/admin/form"
import adminFormControl from "@/config/admin/form";
import { IoCloseOutline } from "react-icons/io5";

const staffInformationFormControl=adminFormControl.staffInformation;
const initFormData={
    salary:0,
    phone:'',
    address:'',
};

const EditingStaffDialog = ({ open, setOpen=f=>f}) => {
    const dispatch=useDispatch();
    const {toast}=useToast();
    const {currentEdittingStaffProperties,currentEdittingStaffId}=useSelector(state=>state.adminStaff);
    useEffect(() => {
        if(!currentEdittingStaffId){
            return;
        }
        dispatch(getStaffProperties(currentEdittingStaffId)).then(res=>{
            if(res.error){
                toast({
                    title:"There is an error occured while fetching staff information, please try again",
                    variant: "destructive",
                });
            }
        });    
    },[currentEdittingStaffId]);
    useEffect(()=>{
        if(!currentEdittingStaffProperties){
            return;
        }
        setFormData(pre=>({
            ...pre,
            salary:currentEdittingStaffProperties.salary||0,
            phone:currentEdittingStaffProperties.phone||'',
            address:currentEdittingStaffProperties.address||'',
        }));
    },[currentEdittingStaffProperties]);
    const [formData,setFormData]=useState(initFormData);
    const updateStaffProperties=()=>{
        const data={
            _id:currentEdittingStaffId,
            ...formData,
        }
        dispatch(updateStaff(data)).then(res=>{
            if(res.error){
                toast({
                    title:"There is an error occured while updating staff information, please try again",
                    variant: "destructive",
                });
            }
            else{
                toast({
                    title:"Staff information has been updated",
                    variant: "success",
                });
                setOpen(false);
            }
        });
    };
    return (
        <div className={`${open ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Employee Information</h3>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <IoCloseOutline size={24} />
                        </button>
                    </div>

                    <div className="p-6">
                        <CustomForm 
                            formControl={staffInformationFormControl} 
                            formData={formData} 
                            setFormData={setFormData} 
                            onSubmit={updateStaffProperties} 
                            submitText="Update"
                            submitClassName="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 
                                text-white font-medium rounded-lg transition-colors duration-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditingStaffDialog;