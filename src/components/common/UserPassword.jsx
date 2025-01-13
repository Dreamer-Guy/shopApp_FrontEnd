import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {updateUserPassword} from "@/store/user/userSlice";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {Input} from "@/components/ui/input";

  const passwordSchema = z.object({
    oldPassword: z.string()
      .min(0, "Please provide your old password"),
    newPassword: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain both letters and numbers"),
    confirmPassword: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain both letters and numbers"),
  }).refine((data)=>data.newPassword === data.confirmPassword,{
    message: "New password and confirm password not match",
    path: ["confirmPassword"],
  })
  const UserPassword = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const form = useForm(
        {
            resolver:zodResolver(passwordSchema),
            defaultValues: {
               oldPassword:"",
               newPassword:"",
               confirmPassword:"",
            }
        }
    );
    const onSubmit = async (data)=>{
        try {
            const result = await dispatch(updateUserPassword(data)).unwrap();
            form.reset();
            toast({
                title: "Password updated successfully",
                description: "Your password has been updated successfully",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Update address failed",
                description: error || "Update address failed",
                variant: "destructive",
            });
        }
    }
    return (
        <div className="space-y-6 max-w-2xl">
            <h3 className="text-2xl font-bold">Change Password</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                   <FormField
                   control={form.control}
                   name="oldPassword"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" type="password"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="newPassword"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500 " type="password" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="confirmPassword"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" type="password" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <Button type="submit" >Save changes</Button>
                </form>
            </Form>
        </div>
    )
  }
  export default UserPassword;


