import Form from "../components/shopping/form";
import { useState } from "react";
import formControls from "../config/form";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../store/user/userSlice";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const initLoginForm={email:'',password:''};
    const [loginForm,setLoginForm]=useState(initLoginForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, user } = useSelector((state) => state.user);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser(loginForm)).unwrap();
            if (result.user) {
                navigate('/profile');
            }
        } catch (error) {
            alert('Login failed: ' + error);
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
                user={user}
                onProfileClick={() => navigate('/profile')}
            />
        </div>
    )
};

export default LoginPage;