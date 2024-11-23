    import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
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
                <Route path='/' element={<h1>Home Page</h1>} />
            </Routes>
        </Router>
    )
};

export default AppRoute;