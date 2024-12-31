import { Link,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AccountSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
    .then(()=>{
      navigate('/user/login');
    })
  }
    const menuItems=[
        {
            title:'Manage Account',
            items:[
                {label:'Profile Information',path:'/user/profile'},
                {label:'Manage Address',path:'/user/address'},
                {label:'Change Password',path:'/user/password'},
            ]
        },
        {
            items:[
                    {label:'My Order History',path:'/user/orders'},
                    {label:'My Reviews',path:'/user/reviews'},
            ]
        },
        {
            items:[
                {label:'My Cart',path:'/user/cart'}
            ]
        }
    ]
    return(
        <div className="w-64 border-r min-h-screen p-4">
            <div className="flex items-center gap-3 mb-6 p-2">
                <div className="w-10 h-10 rounded-full bg-gray-200" ></div>
                <div>
                    <div className="text-sm text-gray-500">Hello,</div>
                    <div className="font-medium">User</div>
                </div>
            </div>
            {menuItems.map((section,index)=>(
                <div key={index}>
                    {section.title&&(
                        <div className ="text-sm font-medium text-gray-500 mb-2">
                            {section.title}
                        </div>
                    )}
                    <nav className="space-y-2">
                        {section.items.map((item,index)=>(
                            <Link key ={index} to ={item.path} >
                                <div className={cn("px-3 py-2 rounded-md text-sm transition-colors",
                                                    location.pathname === item.path 
                                                    ? "bg-gray-100 text-gray-900" 
                                                    : "text-gray-600 hover:bg-gray-50")}>
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            ))}
            <button onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md">
                Logout
            </button>
        </div>
    )
}


export default AccountSidebar;
