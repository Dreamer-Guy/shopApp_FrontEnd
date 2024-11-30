import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/user/login';
import RegisterPage from '@/pages/user/register';
import ProfilePage from '@/pages/user/profile';
import NotFound from '@/pages/not-found';


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
                <Route path='/' element={<h1>Home Page</h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
};

export default AppRoute;