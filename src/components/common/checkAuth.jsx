import { useLocation, Navigate } from "react-router-dom";
import React from 'react';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    
    // Chưa đăng nhập và cố truy cập route được bảo vệ
    if (!isAuthenticated || !user) {
        const protectedRoutes = ["/shop/account", "/shop/cart", "/shop/checkout", "user/orderHistory", "/admin", "/staff"];
        if (protectedRoutes.some(route => location.pathname.includes(route))) {
            return <Navigate to="/user/login" state={{ from: location }} />;
        }
    }
    
    // Admin/Staff không được truy cập các route dành cho customer
    if (isAuthenticated && ['admin', 'staff'].includes(user?.role)) {
        // Kiểm tra path hiện tại
        const currentPath = location.pathname;
        
        if (currentPath === '/' || 
            currentPath === '/shop' || 
            currentPath.startsWith('/shop/') || 
            currentPath === '/user' || 
            currentPath.startsWith('/user/')) {
            return <Navigate to="/admin/dashboard" />;
        }
    }
    
    if (isAuthenticated && user?.role === 'customer' && location.pathname.startsWith('/admin')) {
        return <Navigate to="/unauth-page" />;
    }
    
    if (isAuthenticated && location.pathname.startsWith('/admin')) {
        if (!['admin', 'staff'].includes(user?.role)) {
            return <Navigate to="/unauth-page" />;
        }
        
        const adminOnlyRoutes = [
            "/admin/staffs",
            "/admin/metrics",
            "/admin/revenues", 
            "/admin/customers",
            "/admin/settings/profile"
        ];
        
        const staffOnlyRoutes = [
            "/admin/settings/profileStaff",
            "/admin/products-reviews"
        ];
        
        if (user?.role === 'staff') {
            if (location.pathname === '/admin/settings/profileStaff') {
                return <>{children}</>;
            }
            
            if (adminOnlyRoutes.some(route => location.pathname.includes(route))) {
                return <Navigate to="/unauth-page" />;
            }
        }
    }
    
    return <>{children}</>;
}

export default CheckAuth;
