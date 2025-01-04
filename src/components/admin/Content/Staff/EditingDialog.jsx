import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getStaffProperties } from "@/store/staff";
import { useToast } from "@/hooks/use-toast";
import CustomForm from "@/components/admin/form"
import adminFormControl from "@/config/admin/form";
import { IoCloseOutline } from "react-icons/io5";

const staffInformationFormControl=adminFormControl.staffInformation;
const initFormData={
    salary:0,
};

const EditingStaffDialog = ({ open, setOpen=f=>f}) => {
    const dispatch=useDispatch();
    const {toast}=useToast();
    const {currentEdittingStaffProperties,currentEdittingStaffId}=useSelector(state=>state.staff);
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
        }));
    },[currentEdittingStaffProperties]);
    const [formData,setFormData]=useState(initFormData);
    const onSubmit=()=>{
        console.log("submit");
    };
    return (
        <div className={`${open===true?'':'hidden'}`}>
            <div className="bg-black opacity-50 z-50 h-screen w-screen fixed inset-0"></div>
            <div className="flex flex-col gap-4 p-5 items-start z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                <div className="top-0 right-0 absolute">
                    <IoCloseOutline size={30} 
                        className="hover:bg-gray-400 hover:rounded-lg hover:cursor-pointer" 
                        onClick={()=>setOpen(false)}/>
                </div>
                <h3 className="font-semibold text-lg">Employee Information</h3>
                <div>
                    <CustomForm formControl={staffInformationFormControl} formData={formData} setFormData={setFormData} 
                    onSubmit={onSubmit} submitText="Update"/>
                </div>
            </div>
        </div>
    );
};

export default EditingStaffDialog;