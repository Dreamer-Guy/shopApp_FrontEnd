import path from "path";
import DropDownItem from "./dropDown";
import { Link,useNavigate } from "react-router-dom";

const dropDownItems = [
    {
        label: "Categories",
        items:[
            {
                label: "Add Category",
                path: "/admin/categories/add"
            },
            {
                label: "View Categories",
                path: "/admin/categories/view"
            }
        ]
    },
    {
        label: "Brands",
        items:[
            {
                label: "Add Brand",
                path: "/admin/brands/add"
            },
            {
                label: "View Brands",
                path: "/admin/brands/view"
            }
        ]
    },
    {
        label: "Products",
        items:[
            {
                label: "Add Product",
                path: "/admin/products/add"
            },
            {
                label: "View Products",
                path: "/admin/products/view",
            },
            {
                label: "Deleted Products",
                path: "/admin/products/soft-deleted"
            }
        ]
    },
    {
        label:"Staffs",
        items:[
            {
                label: "Add Staff",
                path: "/admin/staffs/add"
            },
            {
                label: "All Staffs",
                path: "/admin/staffs/view"
            }
        ]
    }
];


const adminNavBar = ({navBarOpen,toggleNavBar=f=>f}) => {
    const navigate = useNavigate();
    return(
        <div className='h-full w-full'>
            <div className={`
                bg-black flex flex-col gap-4 text-white p-3 h-screen
                fixed top-0 left-0 w-64 z-50
                transform transition-transform ${navBarOpen?'':'-translate-x-full'}`}>
                <div className="flex flex-row justify-between items-center  gap-2">
                    <div className="w-10 h-10">
                        <img src="https://github.com/shadcn.png"/>
                    </div>
                    <div><p>My Shop</p></div>
                </div>
                <div>
                    <ul className="flex flex-col gap-3">
                        <li 
                            onClick={()=>navigate('/admin/dashboard')}
                            className="hover:bg-slate-800 rounded-lg p-2 hover:cursor-pointer">Dashboard</li>
                        {dropDownItems.map((item,index)=>(
                            <li key={index}><DropDownItem label={item.label} items={item.items}/></li>
                        ))}
                        <li 
                            onClick={()=>navigate('/admin/customers')}
                            className="hover:bg-slate-800 rounded-lg p-2 hover:cursor-pointer">
                            Customers</li>
                        <li 
                        onClick={()=>navigate('/admin/orders/view')}
                        className="hover:bg-slate-800 rounded-lg p-2 hover:cursor-pointer">
                        Orders</li>
                        <li className="hover:bg-slate-800 rounded-lg p-2 hover:cursor-pointer">Settings</li>
                    </ul>
                </div>
            </div>
            <div
            onClick={()=>toggleNavBar()} 
            className={`${navBarOpen?'':'hidden'} md:hidden fixed top-0 left-0 w-full h-screen z-40 bg-slate-400 bg-opacity-50`}>
            </div>
        </div>
    )

};

export default adminNavBar;