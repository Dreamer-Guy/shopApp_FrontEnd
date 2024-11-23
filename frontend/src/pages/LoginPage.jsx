import Form from "../components/shopping/form";
import { useState } from "react";
import formControls from "../config/form";
import { useSelector, useDispatch } from 'react-redux';
import { getStatus } from "../store/user/userSlice";

const LoginPage = () => {
    x
    const [loginForm,setLoginForm]=useState(initLoginForm);
    const onSubmit=()=>{
    };
    return (
        <div>
            <h1>Login Page</h1>
                <Form formControls={formControls.login} formValue={loginForm} setFormValue={setLoginForm} btnText="Sign Up" 
                onSubmit={onSubmit}
                isBtnDisabled={false}/>
        </div>
        

    )
};

export default LoginPage;