import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from '../pages/ProfilePage';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/admin/Page';
import AddCategory from "../components/admin/Content/Categories/addDisplay"
import AddBrand from "../components/admin/Content/Brands/addDisplay"
import ViewCategoriesContent from '../components/admin/Content/Categories/viewCategoriesDisplay';
import ViewCategoryDetail from "../components/admin/Content/Categories/viewCategoryDetails";
import { View } from 'lucide-react';
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
                <Route path='/admin' element={<AdminPage/>}>
                    <Route path='categories'>
                        <Route path='add' element={<AddCategory/>}>
                        </Route>
                        <Route path='view' element={<ViewCategoriesContent/>}>
                        </Route>
                        <Route path='detail/:id' element={<ViewCategoryDetail/>}>
                        </Route>
                    </Route>
                    <Route path='brands'>
                        <Route path='add' element={<AddBrand/>}>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
};

export default AppRoute;