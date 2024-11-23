import Form from "../components/shopping/form";
import { useState } from "react";
import formControls from "../config/form";
import { useSelector, useDispatch } from 'react-redux';
import { getStatus } from "../store/user/userSlice";

const LoginPage = () => {
    const initLoginForm={email:'',password:''};
    const [loginForm,setLoginForm]=useState(initLoginForm);
    const onSubmit=()=>{
    };
    return (
        <div>
            <h1>Đăng nhập vào trang web</h1>
                <Form formControls={formControls.login} formValue={loginForm} setFormValue={setLoginForm} btnText="Sign In" 
                onSubmit={onSubmit}
                isBtnDisabled={false}/>
        </div>
        

    )
};

export default LoginPage;