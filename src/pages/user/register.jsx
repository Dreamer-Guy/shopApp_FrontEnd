import Register from "@/components/user/register";
import { useState } from "react";
import formControls from "@/config/form";
import { useSelector, useDispatch } from 'react-redux';
import { getStatus, registerUser } from "@/store/user/userSlice";
import { isValidEmail, isValidText, isValidUsername } from "@/helper/validate";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const isValidPassword = (password) => {
    if (password.length < 6) return false;
    
    if (!/[a-zA-Z]/.test(password)) return false;
    
    if (!/[0-9]/.test(password)) return false;
    
    return true;
};

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formValue, setFormValue] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isValidPassword(formValue.password)) {
            toast({
                title: "Error",
                description: "Password must be at least 6 characters long and contain both letters and numbers!",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 2000
            });
            return;
        }
        
        if(formValue.password !== formValue.confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match!",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 2000
            });
            return;
        }
        
        if(!isValidText(formValue.fullName)){
            toast({
                title: "Error",
                description: "Invalid fullname!",
                variant: "destructive", 
                className: "bg-red-500 text-white",
                duration: 2000
            });
            return;
        }
        
        if(!isValidUsername(formValue.userName)) {
            toast({
                title: "Error",
                description: "Invalid username!",
                variant: "destructive",
                className: "bg-red-500 text-white", 
                duration: 2000
            });
            return;
        }
        
        if(!isValidEmail(formValue.email)) {
            toast({
                title: "Error",
                description: "Invalid email!",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 2000
            });
            return;
        }

        dispatch(registerUser(formValue))
            .then((res) => {
                if (res.error) {
                    toast({
                        title: "Registration failed",
                        description: res.payload || "Could not register user",
                        variant: "destructive",
                        className: "bg-red-500 text-white",
                        duration: 2000
                    });
                } else {
                    toast({
                        title: "Success",
                        description: "Registration successful! Please login.",
                        className: "bg-green-500 text-white",
                        duration: 2000
                    });
                    setFormValue({
                        fullName: '',
                        userName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                    setTimeout(() => {
                        navigate('/user/login');
                    }, 1500);
                }
            });
    }
    
    return (
        <div>
            <Register
                formControls={formControls.register}
                formValue={formValue}
                setFormValue={setFormValue}
                onSubmit={handleSubmit}
                isBtnDisabled={false}
                btnText="Register"    
            />
        </div>
    );
};

export default RegisterPage;
