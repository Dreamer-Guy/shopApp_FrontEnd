import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from '../pages/ProfilePage';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '../pages/HomePage';
import NotFound from '@/pages/not-found';
import ShoppingLayout from '@/components/shopping-view/layout';
import ShoppingHome from '@/pages/shopping-view/home';
import ShoppingListing from '@/pages/shopping-view/listing';
import ShoppingCheckout from '@/pages/shopping-view/checkout';
import ShoppingAccount from '@/pages/shopping-view/account';
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
                
                <Route path='/shop' element={<ShoppingLayout />}>
                    <Route path='home' element={<ShoppingHome />} />
                    <Route path='listing' element={<ShoppingListing />} />
                    <Route path='checkout' element={<ShoppingCheckout />} />
                    <Route path='account' element={<ShoppingAccount />} />
                </Route>
                
                <Route path='*' element={<NotFound />} />
                
            </Routes>
        </Router>
    )
};

export default AppRoute;