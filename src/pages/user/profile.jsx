import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountSidebar from '@/components/user/AccountSidebar';
import { Outlet } from 'react-router-dom';
const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/user/login');
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AccountSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
  </div>
  );
};

export default ProfilePage;
