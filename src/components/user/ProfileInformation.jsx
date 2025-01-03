import {useDispatch, useSelector} from "react-redux";
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
  })
 
  const ProfileInformation = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.user);
    const onSubmit = async (data) => {
        try {
            const result = await dispatch(updateProfile(data)).unwrap();
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
            }
        }
    );
    return (
        <div className="space-y-6 max-w-2xl">
            <h3 className="text-2xl font-bold">Profile Information</h3>
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
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <Input
                                type="file"
                                accept="image/*"
                                onChange={(e)=>onChange(e.target.files)}
                                className="border-gray-500"
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


