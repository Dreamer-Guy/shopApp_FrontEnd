import { useLocation, Navigate } from "react-router-dom";

import React from 'react';

function CheckAuth ( { isAuthenticated, user, children} ) {
    const location = useLocation();
    console.log(location.pathname, isAuthenticated);
    
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
        (location.pathname.includes("/login") ||
            location.pathname.includes("/register"))
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
