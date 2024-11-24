import Register from "../components/shopping/register";
import { useState } from "react";
import formControls from "../config/form";
import { useSelector, useDispatch } from 'react-redux';
import { getStatus, registerUser } from "../store/user/userSlice";
import { isValidEmail, isValidText, isValidUsername } from "../helper/validate";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(formValue.password !== formValue.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if(!isValidText(formValue.fullname)){
            alert('Invalid fullname!');
            return
        }
        
        if(!isValidUsername(formValue.username)) {
            alert('Invalid username!');
            return;
        }
        
        if(!isValidEmail(formValue.email)) {
            alert('Invalid email!');
            return;
        } 
        
        dispatch(registerUser(formValue)); // Gửi action đăng ký
        
        setFormValue({
            fullname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
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
        

    )
};

export default RegisterPage;