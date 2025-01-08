import {BrowserRouter as Router,Routes ,Route, Outlet} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '@/pages/home-page/home';
import LoginPage from '@/pages/user/login';
import RegisterPage from '@/pages/user/register';
import ProfilePage from '@/pages/user/profile';
import NotFound from '@/pages/not-found';
import ShopLayout from '@/layouts/ShopLayout';
import ShoppingAccount from '@/pages/shop/account';
import ShoppingCheckout from '@/pages/shop/checkout';
import ShoppingListing from '@/pages/shop/listing';
import ShoppingDetail from '@/pages/shop/detail';
import ShoppingCart from "@/pages/shop/cartPage";
import ShoppingHome from '@/pages/shop/home';
import UserLayout from '@/layouts/UserLayout';

import AdminPage from '../pages/admin/Page';
import AddCategoryPage from "../pages/admin/Categories/addDisplay";
import ViewCategoriesPage from "../pages/admin/Categories/viewCategoriesDisplay";
import CategoryDetailsPage from "../pages/admin/Categories/categoryDetailsDisplay";
import AddBrandPage from "../pages/admin/Brands/addDisplay";
import ViewProductsPage from "../pages/admin/Products/viewProductsDisplay";
import AddProductPage from "../pages/admin/Products/addProductDisplay";

import AdminProductDetailPage from "../pages/admin/Products/productDetailDisplay";
import AdminBrandsPage from "../pages/admin/Brands/viewBrandsDisplay";
import AdminCustomersPage from "../pages/admin/Customer/viewCustomers";
import CheckAuth from '@/components/common/checkAuth';
import UnauthPage from '@/pages/unauth-page';

import AdminRevenuesPage from "../pages/admin/Revenue/revenuesPage";
import AdminSoftDedeltedProductsPage from "../pages/admin/Products/softDeletedProduct";

import AdminStaffsPage from "../pages/admin/Staff/viewStaffs";
import AdminAddingStaffPage from "../pages/admin/Staff/addStaff";

const AppRoute = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getStatus());
    }, []);
    
    const { user, isAuthenticated } = useSelector((state) => state.user);
    
    
    
    // console.log(user);
    
    return (
        <Router>
            <Routes>
                <Route element={<ShopLayout/>}>
                    {/* Home */}
                    <Route path='/' element={<h1>Home</h1>} />

                    {/* User */}
                    <Route path='/user'>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="profile" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <ProfilePage />
                            </CheckAuth>
                        } />
                    </Route>
                
                    {/* Shop */}
                    <Route path='/shop'>
                        <Route path='home' element={<ShoppingHome />} />
                        <Route path='listing' element={<ShoppingListing />} />
                        <Route path='product/:id' element={<ShoppingDetail />} />
                        
                        {/* Protected Shop Routes - Yêu cầu đăng nhập */}
                        <Route element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <Outlet />
                            </CheckAuth>
                        }>
                            <Route path='cart' element={<ShoppingCart />} />
                            <Route path='checkout' element={<ShoppingCheckout />} />
                            <Route path='account' element={<ShoppingAccount />} />
                        </Route>
                    </Route>
                </Route>

                {/* Admin Routes */}
                {/* <Route path='/admin' element={
                    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <AdminPage />
                    </CheckAuth>
                }> */}
                <Route path='/admin' element={
                        <AdminPage />
                }>
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
                        <Route path='soft-deleted' element={<AdminSoftDedeltedProductsPage/>}/>
                    </Route>
                    <Route path='staffs'>
                        <Route path='view' element={<AdminStaffsPage/>}/>
                        <Route path='add' element={<AdminAddingStaffPage/>}/>
                    </Route>
                    <Route path='customers' element={<AdminCustomersPage/>}/>
                    <Route path='revenues' element={<AdminRevenuesPage/>}></Route>
                </Route>

                <Route path="/unauth-page" element={<UnauthPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoute;