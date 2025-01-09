import { useLocation, Navigate } from "react-router-dom";
import React from 'react';

function CheckAuth({ isAuthenticated, user, children }) {
    // return <Navigate to="/admin/categories/view"/>;
    const location = useLocation();
    // console.log(location.pathname, isAuthenticated);
    
    if (!isAuthenticated || !user) {
        const protectedRoutes = ["/shop/account", "/shop/cart", "/shop/checkout", "/admin"];
        if (protectedRoutes.some(route => location.pathname.includes(route))) {
            return <Navigate to="/user/login" state={{ from: location }} />;
        }
    }
    
    if(location.pathname === '/') {
        if(isAuthenticated) {
            if(user?.role === 'admin') {
                return <Navigate to='/admin'/>;
            } else {
                return <Navigate to='/shop/home'/>
            }
        }
    }
    
    if (
        isAuthenticated &&
        (location.pathname.includes("/user/login") ||
            location.pathname.includes("/user/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }
    
    if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname.includes("admin")
    ) {
        return <Navigate to="/unauth-page" />;
    }
    
    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("shop")
    ) {
        return <Navigate to="/admin" />;
    }
    
    return <>{children}</>;
}

export default CheckAuth;
