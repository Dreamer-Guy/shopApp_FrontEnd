import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/user/userSlice";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCog } from "lucide-react";

const LeftContent = ({toggleNavBar=f=>f}) => {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => toggleNavBar()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <FaBars className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
};

const RightContent = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const getInitials = (name) => {
        if (!name) return 'AD';
        return name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate('/user/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {/* User Profile */}
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-semibold">
                            {user?.fullName || 'Admin User'}
                        </div>
                        <div className="text-xs text-gray-500">
                            {user?.email || 'admin@example.com'}
                        </div>
                    </div>
                    <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                        {user?.avatar ? (
                            <div className="h-full w-full rounded-full overflow-hidden">
                                <img 
                                    src={user.avatar} 
                                    alt={user.fullName || 'Admin'}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <AvatarFallback className="bg-slate-400 text-black font-extrabold">
                                    {getInitials(user.fullName)}
                                </AvatarFallback>
                            </div>
                        ) : (
                            <AvatarFallback className="bg-slate-400 text-black font-extrabold">
                                {getInitials(user?.fullName)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-56">
                    <DropdownMenuLabel>{user?.fullName || 'Admin User'}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => navigate('/admin/settings/profile')}
                    >
                        <UserCog className="mr-2 h-4 w-4" />
                        Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        className="cursor-pointer text-red-600 hover:text-red-700"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const AdminHeader = ({toggleNavBar=f=>f}) => {
    return (
        <header className="w-full bg-white border-b px-4 py-3 sticky top-0 z-30">
            <div className="max-w-[2000px] mx-auto flex justify-between items-center">
                <LeftContent toggleNavBar={toggleNavBar} />
                <RightContent />
            </div>
        </header>
    );
};

export default AdminHeader;