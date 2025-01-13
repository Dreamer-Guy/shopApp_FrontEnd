import {BrowserRouter as Router,Routes ,Route, Outlet} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStatus } from '../store/user/userSlice';
import HomePage from '@/pages/home-page/home';
import LoginPage from '@/pages/user/login';
import RegisterPage from '@/pages/user/register';
import ProfilePage from '@/pages/user/profile';
import ForgotPasswordPage from '../pages/user/forgotPassword';
import NotFound from '@/pages/not-found';
import ShopLayout from '@/layouts/ShopLayout';
import ShoppingAccount from '@/pages/shop/account';
import ShoppingCheckout from '@/pages/shop/checkout';
import ShoppingListing from '@/pages/shop/listing';
import ShoppingDetail from '@/pages/shop/detail';
import ShoppingCart from "@/pages/shop/cartPage";
import ShoppingHome from '@/pages/home-page/home';
import UserLayout from '@/layouts/UserLayout';
import ShoppingOrders from '@/pages/shop/order';
import OrderSuccessPage from '@/pages/shop/orderSuccess'; // Add this import

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

import AdminOrdersPage from "../pages/admin/Orders/viewOrders";
import AdminOrderDetailsPage from "../pages/admin/Orders/viewOrderDetails";

import AdminDashBoardPage from "../pages/admin/DashBoard/dashBoardPage";
import AdminMetricsPage from "../pages/admin/MetricsEachMonth/metricsPage";

import ProfileInformation from '@/components/common/ProfileInformation';
import StaffInformation from '@/components/staff/StaffInformation'
import UserPassword from '@/components/common/UserPassword'
import ProductReviewList from '@/components/admin/Content/Product/ProductReviewList';
import ProductReviewCard from '@/components/admin/Content/Product/ProductReviewCard';
import ProductReviewDetail from '@/components/admin/Content/Product/ProductReviewDetail';
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
                    <Route path='/' element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <ShoppingHome/>
                        </CheckAuth>
                    } />

                    {/* User */}
                    <Route path='/user' element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <Outlet />
                        </CheckAuth>
                    }>
                        <Route path="login" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <LoginPage />
                            </CheckAuth>
                        } />
                        <Route path="register" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <RegisterPage />
                            </CheckAuth>
                        } />
                        <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="profile" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <ProfilePage />
                            </CheckAuth>
                            
                        } />
                        <Route path="profiles" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <ProfilePage />
                            </CheckAuth>

                        } />
                        <Route path="address" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <ProfilePage />
                            </CheckAuth>

                        } />
                        <Route path="password" element={
                                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                    <ProfilePage />
                                </CheckAuth>
                            } />
                         <Route path="orderHistory" element={
                                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                    <ProfilePage />
                                </CheckAuth>
                            } />
                            <Route path="orderHistory/:orderId" element={
                                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                    <ProfilePage />
                                </CheckAuth>
                            } /> 
                            <Route path="reviews" element={
                                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                    <ProfilePage />
                                </CheckAuth>
                            } />   
                    </Route>
                
                    {/* Shop */}
                    <Route path='/shop' element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <Outlet />
                        </CheckAuth>
                    }>
                        <Route path='home' element={<ShoppingHome />} />
                        <Route path='listing' element={<ShoppingListing />} />
                        <Route path='product/:id' element={<ShoppingDetail />} />
                        
                        {/* Protected Shop Routes */}
                        <Route element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <Outlet />
                            </CheckAuth>
                        }>
                            <Route path='cart' element={<ShoppingCart />} />
                            <Route path='checkout' element={<ShoppingCheckout />} />
                            <Route path='checkout/success' element={<OrderSuccessPage />} />
                            <Route path='account' element={<ShoppingAccount />} />
                            <Route path='orders' element={<ShoppingOrders />} />
                        </Route>
                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route path='/admin' element={
                    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <AdminPage />
                    </CheckAuth>
                }>

                    <Route path='dashboard' element={<AdminDashBoardPage/>}></Route>
                    <Route path='metrics' element={<AdminMetricsPage/>}></Route>
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
                    <Route path ='orders' >
                        <Route path="view" element={<AdminOrdersPage/>}></Route>
                        <Route path='detail/:id' element={<AdminOrderDetailsPage/>}></Route>
                    </Route>
                    
                    <Route path='products-reviews' element={<ProductReviewList />} />
                    <Route path='products-reviews/:productId' element={<ProductReviewDetail />}/>
                    <Route path='settings'>
                        <Route path="profile" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <ProfileInformation/>
                            </CheckAuth>
                                } />
                        <Route path="profileStaff" element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <StaffInformation/>
                        </CheckAuth>
                            } />
                        <Route path="change-password" element={
                            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                                <UserPassword/>
                            </CheckAuth>
                                } />   
                        
                    </Route>
                </Route>
                <Route path="/unauth-page" element={<UnauthPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoute;