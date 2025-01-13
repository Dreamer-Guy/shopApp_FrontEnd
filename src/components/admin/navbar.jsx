import path from "path";
import { Store, Package, Tags, Building2, ChevronRight, Users, ClipboardList, Settings, LayoutDashboard, BarChart3, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

// Component DropDownItem
const DropDownItem = ({ label, icon, items, className, activeItem, setActiveItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleItemClick = (path) => {
        setActiveItem(path);
        navigate(path);
        setIsOpen(false);
    };

    // Check if any child item is active
    const isChildActive = items.some(item => item.path === activeItem);

    return (
        <div className={className}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors
                    ${isChildActive ? 'bg-gray-700/50' : ''}`}
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
                            onClick={() => handleItemClick(item.path)}
                            className={`w-full text-left py-2 px-4 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors
                                ${activeItem === item.path ? 'bg-gray-700/50 text-gray-200' : ''}`}
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
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const { user } = useSelector((state) => state.user);
    const isAdmin = user?.role === 'admin';

    // Update activeItem when location changes
    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    const handleRegularItemClick = (path) => {
        setActiveItem(path);
        navigate(path);
    };

    const settingsItems = isAdmin ? [
        {
            label: "Profile",
            path: "/admin/settings/profile"
        },
        {
            label: "Change Password",
            path: "/admin/settings/change-password"
        }
    ] : [
        {
            label: "Profile",
            path: "/admin/settings/profileStaff"
        },
        {
            label: "Change Password",
            path: "/admin/settings/change-password"
        }
    ];

    const filteredDropDownItems = dropDownItems.filter(item => {
        if (!isAdmin && item.label === "Staffs") return false;
        return true;
    });

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
                    <div className="font-semibold text-lg">
                        {isAdmin ? 'Admin Dashboard' : 'Staff Dashboard'}
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 px-3">
                    <ul className="space-y-1">
                            <li>
                                <button
                                    onClick={() => handleRegularItemClick('/admin/dashboard')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                                        ${activeItem === '/admin/dashboard' ? 'bg-gray-700' : ''}`}
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </button>
                            </li>
                        

                        {/* Dropdown Items */}
                        {filteredDropDownItems.map((item,index) => (
                            <li key={index} className="mb-2">
                                <DropDownItem 
                                    label={item.label}
                                    icon={item.icon}
                                    items={item.items}
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                    className="hover:bg-gray-700 rounded-lg transition-colors"
                                />
                            </li>
                        ))}

                        {/* Regular Menu Items - Chỉ hiển thị cho Admin */}
                        {isAdmin && (
                            <>
                                <li>
                                    <button
                                        onClick={() => handleRegularItemClick('/admin/metrics')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                                            ${activeItem === '/admin/metrics' ? 'bg-gray-700' : ''}`}
                                    >
                                        <BarChart3 className="h-5 w-5" />
                                        Metrics
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => handleRegularItemClick('/admin/revenues')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                                            ${activeItem === '/admin/revenues' ? 'bg-gray-700' : ''}`}
                                    >
                                        <TrendingUp className="h-5 w-5" />
                                        Revenue
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => handleRegularItemClick('/admin/customers')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                                            ${activeItem === '/admin/customers' ? 'bg-gray-700' : ''}`}
                                    >
                                        <Users className="h-5 w-5" />
                                        Customers
                                    </button>
                                </li>
                            </>
                        )}

                        {/* Products & Reviews - Chỉ hiển thị cho Staff */}
                        {!isAdmin && (
                            <li>
                                <button
                                    onClick={() => handleRegularItemClick('/admin/products-reviews')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                                        ${activeItem === '/admin/products-reviews' ? 'bg-gray-700' : ''}`}
                                >
                                    <Store className="h-5 w-5" />
                                    Products & Reviews
                                </button>
                            </li>
                        )}

                        {/* Orders - Hiển thị cho cả Admin và Staff */}
                        <li>
                            <button
                                onClick={() => handleRegularItemClick('/admin/orders/view')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors
                                    ${activeItem === '/admin/orders/view' ? 'bg-gray-700' : ''}`}
                            >
                                <ClipboardList className="h-5 w-5" />
                                Orders
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Settings at bottom */}
                <div className="px-3 py-4 border-t border-gray-700">
                    <DropDownItem 
                        label="Settings"
                        icon={<Settings className="h-5 w-5" />}
                        items={settingsItems}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        className="hover:bg-gray-700 rounded-lg transition-colors"
                    />
                </div>
            </div>

            {/* Overlay */}
            <div
                onClick={toggleNavBar} 
                className={`${navBarOpen?'':'hidden'} md:hidden fixed top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-50 backdrop-blur-sm`}
            />
        </div>
    );
};

export default adminNavBar;