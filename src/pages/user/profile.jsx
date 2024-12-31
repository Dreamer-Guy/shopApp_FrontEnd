import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/store/user/userSlice';
import LoginImg from '@/assets/LoginImg.jpg';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/user/login');
        });
    };

    if (!user) {
        navigate('/user/login');
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-100">
            <div className="w-[420px] bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
                <div className="space-y-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Email:</p>
                        <p className="ml-4 text-gray-600">{user.email}</p>
                    </div>
                    {user.name && (
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Name:</p>
                            <p className="ml-4 text-gray-600">{user.name}</p>
                        </div>
                    )}
                    <div className="pt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;