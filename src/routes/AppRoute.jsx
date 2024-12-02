import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from '../pages/ProfilePage';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/admin/Page';
import AddCategoryPage from "../pages/admin/Categories/addDisplay";
import ViewCategoriesPage from "../pages/admin/Categories/viewCategoriesDisplay";
import CategoryDetailsPage from "../pages/admin/Categories/categoryDetailsDisplay";
import AddBrandPage from "../pages/admin/Brands/addDisplay";
import ViewProductsPage from "../pages/admin/Products/viewProductsDisplay";
import AddProductPage from "../pages/admin/Products/addProductDisplay";
import AdminProductDetailPage from "../pages/admin/Products/productDetailDisplay";
import AdminBrandsPage from "../pages/admin/Brands/viewBrandsDisplay";

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
                        <Route path='add' element={<AddCategoryPage/>}>
                        </Route>
                        <Route path='view' element={<ViewCategoriesPage/>}>
                        </Route>
                        <Route path='detail/:id' element={<CategoryDetailsPage/>}>
                        </Route>
                    </Route>
                    <Route path='brands'>
                        <Route path='add' element={<AddBrandPage/>}>
                        </Route>
                        <Route path='view' element={<AdminBrandsPage/>}>
                        </Route>
                        <Route path='detail/:id' element={<AddBrandPage/>}>
                        </Route>
                    </Route>
                    <Route path='products'>
                        <Route path='view' element={<ViewProductsPage/>}>
                        </Route>
                        <Route path='add' element={<AddProductPage/>}>
                        </Route>
                        <Route path='detail/:id' element={<AdminProductDetailPage/>}>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
};

export default AppRoute;