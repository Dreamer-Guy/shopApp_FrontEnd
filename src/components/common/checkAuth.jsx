import { useLocation, Navigate } from "react-router-dom";
import React from 'react';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    // console.log(location.pathname, isAuthenticated);
    
    // user chua login vao admin
    if (!isAuthenticated && location.pathname.includes("admin")) {
        return <Navigate to="/user/login" state={{ from: location }} />;
    }
    
    if(location.pathname === '/') {
        if( isAuthenticated ) {
            if( user?.role === 'admin' ) {
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
    
    return <>{children}</>
}

export default CheckAuth;
