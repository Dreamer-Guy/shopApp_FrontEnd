import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {getUserAddress,updateUserAddress} from "@/store/user/userSlice";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {Input} from "@/components/ui/input";

  const addressSchema = z.object({
    street: z.string().min(2, "Street must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    postalCode: z.string().min(2, "Postal code must be at least 2 characters"),
    phone: z.string().min(2, "Phone must be at least 2 characters"),
    notes: z.string().optional(),
  })
 
  const UserAddress = () => {
    const {toast}=useToast();
    const dispatch = useDispatch();
    const {address,user} = useSelector((state)=>state.user);
    const form = useForm(
        {
            resolver:zodResolver(addressSchema),
            defaultValues: {
               street:"",
               city:"",
               postalCode:"",
               phone:"",
               notes:"",
            }
        }
    );
    useEffect(()=>{
        dispatch(getUserAddress(user._id));
    },[dispatch]);
    useEffect(()=>{
        if(address){
            form.reset({
                street:address.street||"",
                city:address.city||"",
                postalCode:address.postalCode||"",
                phone:address.phone||"",
                notes:address.notes||"",
            });
        }
    },[address,form]);
    const onSubmit = async (data)=>{
        try {
            const result = await dispatch(updateUserAddress(data)).unwrap();
            toast({
                title: "Address updated successfully",
                description: "Your address has been updated successfully",
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
            <h3 className="text-2xl font-bold">Manage Address</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                   <FormField
                   control={form.control}
                   name="street"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="city"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name="postalCode"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Postal Code</FormLabel>
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
                   name="notes"
                   render={({field})=>(
                    <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-gray-500" />
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
  export default UserAddress;


