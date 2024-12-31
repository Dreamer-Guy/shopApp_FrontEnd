import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/store/user/userSlice';
import LoginImg from '@/assets/LoginImg.jpg';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser({})).then(() => {
            navigate('/user/login');
        });
    };

    if (!user) {
        navigate('/user/login');
        return null;
    }

    return (
        <div className="min-h-screen w-full fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/30"
             style={{ backgroundImage: `url(${LoginImg})` }}>
            <div className="w-[420px] bg-black/50 p-8 rounded-lg backdrop-blur-sm relative z-10">
                <h1 className="text-4xl text-center text-white mb-6">Profile</h1>
                <div className="space-y-4">
                    <div className="text-white">
                        <p className="text-lg font-semibold">Email:</p>
                        <p className="ml-4">{user.email}</p>
                    </div>
                    {user.name && (
                        <div className="text-white">
                            <p className="text-lg font-semibold">Name:</p>
                            <p className="ml-4">{user.name}</p>
                        </div>
                    )}
                    <div className="pt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
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