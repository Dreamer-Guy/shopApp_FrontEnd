import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from '../pages/ProfilePage';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '../pages/HomePage';
const AppRoute = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStatus());
    }, 
    []);
    const user=useSelector(state=>state.user);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path='/' element={<h1>Home Page</h1>} />
            </Routes>
        </Router>
    )
};

export default AppRoute;