import Form from "@/components/user/login";
import { useState } from "react";
import formControls from "@/config/form";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "@/store/user/userSlice";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
    const initLoginForm = {email:'', password:''};
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { isLoading } = useSelector((state) => state.user);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser(loginForm)).unwrap();
            if (result.user) {
                toast({
                    title: "Success",
                    description: "Login successful!",
                    className: "bg-green-500 text-white",
                    duration: 2000
                });
                // Delay navigation slightly to show success message
                setTimeout(() => {
                    if (result.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }, 1000);
            }
        } catch (error) {
            toast({
                title: "Login failed!",
                description: error || "Invalid credentials",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 2000
            });
        }
    };

    return (
        <div>
            <Form 
                formControls={formControls.login} 
                formValue={loginForm} 
                setFormValue={setLoginForm} 
                btnText="Sign In" 
                onSubmit={onSubmit}
                isBtnDisabled={isLoading}
            />
        </div>
    );
};

export default LoginPage;