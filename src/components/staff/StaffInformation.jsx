import {useDispatch, useSelector} from "react-redux";

import {useState,useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {updateProfile,getStaffProperties} from "@/store/staff/staffSlice";
import {useToast} from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {Input} from "@/components/ui/input";
  const profileSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Email is not valid"),
    phone:z.string() .min(10, "Phone must be at least 10 characters").max(11, "Phone must be at most 11 characters")
    .regex(/^[0-9]+$/, "Phone must be a number"),
    address:z.string().min(5,"Address must be at least 2 characters"),
    avatar: z.any()
  })
 
  const StaffInformation = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {user,staffProperties} = useSelector((state)=>state.staffSlice);
    const [avatar,setAvatar] = useState(user?.avatar||null);
    const handleFileChange = (files)=>{
        if(files&&files[0]){
            const file = files[0];
            setAvatar(URL.createObjectURL(file));
            form.setValue("avatar",file);
        }
    }
    useEffect(()=>{
        dispatch(getStaffProperties());
    },[dispatch]);
    
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("fullName",data.fullName);
            formData.append("email",data.email);
            formData.append("phone",data.phone);
            formData.append("address",data.address);
            if(data.avatar)
            {
                formData.append("avatar",data.avatar);
            }
            const result = await dispatch(updateProfile(formData)).unwrap();
            toast({
                title: "Profile updated successfully",
                description: "Your profile has been updated successfully",
                variant: "default",
            });
        } catch (error) {
            console.error(error || "Something went wrong");
            toast({
                title: "Update profile failed",
                description: error || "Update profile failed",
                variant: "destructive",
            });
        }
    }
    const form = useForm(
        {
            resolver:zodResolver(profileSchema),
            defaultValues: {
                fullName:user?.fullName||"",
                email:user?.email||"",
                phone:staffProperties?.phone||"",
                address:staffProperties?.address||"",
                avatar:user?.avatar||null,
            }
        }
    );
    useEffect(()=>{
        if(staffProperties){
            form.reset({
                fullName:user.fullName||"",
                avatar:user.avatar||null,
                email:user.email||"",
                phone:staffProperties.phone||"",
                address:staffProperties.address||"",
            });
        }
    },[staffProperties,form]);
    return (
        <div className="space-y-6 max-w-2xl">
            <h3 className="text-2xl font-bold">Profile Information</h3>
            <div className="mx-auto mb-4 w-40 h-40 rounded-full bg-gray-200">
                <label htmlFor="avatar-input" className="w-full h-full flex items-center justify-center cursor-pointer">
                    {avatar ? (
                        <img 
                            src={avatar} 
                            alt="Avatar preview" 
                            className="w-40 h-40 rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-500 text-sm text-center">
                            Choose file
                        </span>
                    )}
                </label>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                   <FormField
                   control={form.control}
                   name="fullName"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="email"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                    <FormField
                   control={form.control}
                   name="phone"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="address"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="avatar"
                   render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    id="avatar-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e.target.files)}
                                    className="hidden"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                   />
                   <Button type="submit" >Update</Button>
                </form>
            </Form>
        </div>
    )
  }
  export default StaffInformation;


