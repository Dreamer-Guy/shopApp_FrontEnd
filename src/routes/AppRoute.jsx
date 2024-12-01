import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/user/login';
import RegisterPage from '@/pages/user/register';
import ProfilePage from '@/pages/user/profile';
import NotFound from '@/pages/not-found';
import ShoppingLayout from '@/components/shopping-view/layout';
import ShoppingAccount from '@/pages/shopping-view/account';
import ShoppingCheckout from '@/pages/shopping-view/checkout';
import ShoppingListing from '@/pages/shopping-view/listing';
import ShoppingHome from '@/pages/shopping-view/home';


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
                    <Route path='account' element={<ShoppingAccount />} />
                    <Route path='checkout' element={<ShoppingCheckout />} />
                    <Route path='listing' element={<ShoppingListing />} />
                </Route>
                
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
};

export default AppRoute;