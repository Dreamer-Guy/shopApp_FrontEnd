import { Link,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { getUserFromLocalStorage } from '@/store/utils/localStorage';

const AccountSidebar = ({ onClose }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = getUserFromLocalStorage();
    console.log(user);
    const handleLogout = () => {
        dispatch(logoutUser())
        .then(()=>{
        navigate('/user/login');
        })
    }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems=[
        {
            title:'Manage Account',
            items:[
                {label:'Profile Information',path:'/user/profiles'},
                {label:'Manage Address',path:'/user/address'},
                {label:'Change Password',path:'/user/password'},
            ]
        },
        {
            items:[
                    {label:'My Order History',path:'/user/orderHistory'},
                    {label:'My Reviews',path:'/user/reviews'},
            ]
        },
        {
            items:[
                {label:'My Cart',path:'/shop/cart'}
            ]
        }
    ]
    return(
        <div className='w-[50vw] lg:w-64 flex flex-col border-r min-h-screen p-4 bg-gradient-to-b from-white to-blue-100'>
            <button 
                onClick={onClose}
                className="lg:hidden absolute top-4 right-4 hover:text-blue-600 transition-colors"
            >
                <X className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-3 mb-6 p-3 bg-white rounded-lg shadow-sm">
                <img src={user.avatar} alt="User Profile" className="w-10 h-10 rounded-full border-2 border-blue-200" ></img>
                <div>
                    <div className="text-sm text-blue-500">Hello,</div>
                    <div className="font-medium text-gray-800">{user.fullName}</div>
                </div>
            </div>
            
            {menuItems.map((section,index)=>(
                <div key={index}>
                    {section.title&&(
                        <div className="text-base font-medium text-blue-600 mb-2">
                            {section.title}
                        </div>
                    )}
                    <nav className="space-y-2">
                        {section.items.map((item,index)=>(
                            <Link key={index} to={item.path}>
                                <div className={cn("px-3 py-2 my-1 rounded-md text-sm transition-colors",
                                    location.pathname === item.path 
                                    ? "bg-blue-200 text-blue-800 font-medium" 
                                    : "text-gray-600 font-medium hover:bg-blue-100")}>
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            ))}
            <button onClick={handleLogout}
            className="w-full flex items-center gap-2 text-left  py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors">
                <LogOut className="w-4 h-4 ml-2" />
                Logout
            </button>
        </div>
    )
}


export default AccountSidebar;
