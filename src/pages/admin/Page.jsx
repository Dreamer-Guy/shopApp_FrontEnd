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
        <div className="">
            <div className={`transform transition-transform ${navBarOpen?'':'-translate-x-full'}`}>
                <AdminNavBar navBarOpen={navBarOpen} toggleNavBar={toggleNavBar}/>
            </div>
            <div className={`w-full transition-all duration-300 ease-in-out 
                    ${navBarOpen?'ml-64 md:w-[calc(100%-256px)]':'ml-0 w-full'}`}>
                <AdminHeader toggleNavBar={toggleNavBar}/>
                <div className="p-2">
                    <Outlet/>
                </div> 
            </div>
        </div>
    );
};

export default AdminPage;