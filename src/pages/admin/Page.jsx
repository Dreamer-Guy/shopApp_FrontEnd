import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/header"
import AdminNavBar from "../../components/admin/navbar"
import { useState } from "react";
const AdminPage=()=>{
    const toggleNavBar=(e)=>{
        setNavBarOpen(!navBarOpen);
    }
    const [navBarOpen,setNavBarOpen]=useState(true);
    return(
        <div className="h-full">
            <AdminNavBar navBarOpen={navBarOpen} toggleNavBar={toggleNavBar}/>
            <div className={` w-full transition-all duration-300 ease-in-out z-0 ml-0
                    ${navBarOpen?'md:ml-64 md:w-[calc(100%-256px)]':'ml-0 w-full'}`}>
                <AdminHeader toggleNavBar={toggleNavBar}/>
                <div className="p-4">
                    <Outlet/>
                </div> 
            </div>
        </div>
    );
};

export default AdminPage;