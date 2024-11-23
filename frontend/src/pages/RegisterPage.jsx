import Register from "../components/shopping/registerForm";
import { useState } from "react";
import formControls from "../config/form";
import { useSelector, useDispatch } from 'react-redux';
import { getStatus } from "../store/user/userSlice";

const RegisterPage = () => {
    const initRegisterForm={username:'', fullname:'', email:'', password:'', confirmPassword:''};
    const [registerForm,setRegisterForm]=useState(initRegisterForm);
    const onSubmit=()=>{
    };
    return (
        <div>
            <Register formControls={formControls.register} formValue={registerForm} setFormValue={setRegisterForm} btnText="Register" 
            onSubmit={onSubmit}
            isBtnDisabled={false}/>
        </div>
        

    )
};

export default RegisterPage;