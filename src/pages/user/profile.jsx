import { useSelector } from 'react-redux';
import { useNavigate ,useLocation} from 'react-router-dom';
import AccountSidebar from '@/components/user/AccountSidebar';
import ProfileInformation from '@/components/user/ProfileInformation';
import UserAddress from '@/components/user/UserAddress';
import UserPassword from '@/components/user/UserPassword';
import OrderHistory from '@/components/user/OrderHistory';
import OrderHistoryDetail from '@/components/user/OrderHistoryDetail';
import UserReview from '@/components/user/UserReview';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import userManagementImage from '@/assets/manageAccount.jpg';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Redirect to login if not authenticated
  const renderComponent =()=>{
    if (location.pathname.match(/^\/user\/orderHistory\/[^/]+$/)) {
      return <OrderHistoryDetail/>
    }
    switch(location.pathname){
      case '/user/profiles':
        return <ProfileInformation/>
      case '/user/address':
        return <UserAddress/>
      case '/user/password':
        return <UserPassword/>
      case '/user/orderHistory':
        return <OrderHistory/>
      case '/user/reviews':
        return <UserReview/>
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to your account</h1>
            <p className="text-gray-600 text-lg">
              Manage your account information, order history and delivery address
            </p>
            <img 
              src={userManagementImage} 
              alt="Account Management" 
              className="mt-8 w-full sm:max-w-md rounded-lg shadow-lg"
            />
          </div>
        )
    }
  }
  if (!user) {
    navigate('/user/login');
    return null;
  }

  return (
    <div className="flex min-h-screen relative">
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 lg:relative lg:block transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <AccountSidebar onClose={() => setIsMenuOpen(false)} />
      </div>
      
      <main className="flex-1 p-2 lg:pl-8">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden z-30 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <MenuIcon className="h-6 w-6" />
        </button>
        {renderComponent()}
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePage;
