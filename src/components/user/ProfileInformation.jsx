import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {updateProfile} from "@/store/user/userSlice";
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
    avatar: z.any()
  })
 
  const ProfileInformation = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.user);
    const [avatar,setAvatar] = useState(user?.avatar||null);
    const handleFileChange = (files)=>{
        if(files&&files[0]){
            const file = files[0];
            setAvatar(URL.createObjectURL(file));
            form.setValue("avatar",file);
        }
    }
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("fullName",data.fullName);
            formData.append("email",data.email);
            if(data.avatar)
            {
                formData.append("avatar",data.avatar);
            }
            const result = await dispatch(updateProfile(formData)).unwrap();
        } catch (error) {
            console.error(error || "Something went wrong");
        }
    }
    const form = useForm(
        {
            resolver:zodResolver(profileSchema),
            defaultValues: {
                fullName:user?.fullName||"",
                email:user?.email||"",
                avatar:user?.avatar||null,
            }
        }
    );
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
  export default ProfileInformation;


