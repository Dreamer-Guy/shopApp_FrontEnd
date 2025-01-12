import path from "path";
import { Store, Package, Tags, Building2, ChevronRight, Users, ClipboardList, Settings, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Component DropDownItem
const DropDownItem = ({ label, icon, items, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={className}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span>{label}</span>
                </div>
                <ChevronRight 
                    className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-90' : ''
                    }`}
                />
            </button>
            {isOpen && (
                <div className="mt-1 ml-4 pl-4 border-l border-gray-700">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="w-full text-left py-2 px-4 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// dropDownItems configuration
const dropDownItems = [
    {
        label: "Categories",
        icon: <Tags className="h-5 w-5" />,
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
        icon: <Building2 className="h-5 w-5" />,
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
        icon: <Package className="h-5 w-5" />,
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
    // {
    //     label: "Products & Reviews",
    //     items: [
    //         {
    //             label: "All Products",
    //             path: "/admin/products-reviews"
    //         }
    //     ]
    // },
    {
        label:"Staffs",
        icon: <Users className="h-5 w-5" />,
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

// Main NavBar component
const adminNavBar = ({navBarOpen, toggleNavBar=f=>f}) => {
    const navigate = useNavigate();
    
    return (
        <div className='h-full w-full'>
            <div className={`
                bg-gradient-to-r from-gray-900 to-gray-800 
                flex flex-col gap-4 text-gray-200 h-screen
                fixed top-0 left-0 w-64 z-50 shadow-xl
                transform transition-transform duration-300 ease-in-out
                ${navBarOpen?'':'-translate-x-full'}`}>
                
                {/* Header */}
                <div className="flex justify-center items-center gap-3 p-4 border-b border-gray-700">
                    <div className="font-semibold text-lg">Admin Dashboard</div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 px-3">
                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={()=>navigate('/admin/dashboard')}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <LayoutDashboard className="h-5 w-5" />
                                Dashboard
                            </button>
                        </li>

                        {/* Dropdown Items */}
                        {dropDownItems.map((item,index)=>(
                            <li key={index} className="mb-2">
                                <DropDownItem 
                                    label={item.label}
                                    icon={item.icon}
                                    items={item.items}
                                    className="hover:bg-gray-700 rounded-lg transition-colors"
                                />
                            </li>
                        ))}

                        {/* Regular Menu Items */}
                        <li>
                            <button
                                onClick={()=>navigate('/admin/customers')}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <Users className="h-5 w-5" />
                                Customers
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={()=>navigate('/admin/products-reviews')}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <Store className="h-5 w-5" />
                                Products & Reviews
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={()=>navigate('/admin/orders/view')}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <ClipboardList className="h-5 w-5" />
                                Orders
                            </button>
                        </li>

                        <li>
                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <Settings className="h-5 w-5" />
                                Settings
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Overlay */}
            <div
                onClick={()=>toggleNavBar()} 
                className={`${navBarOpen?'':'hidden'} md:hidden fixed top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-50 backdrop-blur-sm`}>
            </div>
        </div>
    );
};

export default adminNavBar;