import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

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
    
    const getInitials = (name) => {
        if (!name) return 'AD';
        return name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex items-center gap-4">

            {/* User Profile */}
            <div className="flex items-center gap-3">
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
                                    e.target.onerror = null; // Prevent infinite loop
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
            </div>
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