import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UnauthPage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleNavigate = () => {
        if (user?.role === 'admin' || user?.role === 'staff') {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-red-600">403</h1>
                    <div className="inline-block relative mt-4">
                        <div className="absolute inset-0 transform -skew-x-12 bg-red-600"></div>
                        <h2 className="relative text-xl md:text-3xl font-medium text-white px-4 py-2">
                            Unauthorized Access
                        </h2>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <p className="text-gray-600 mb-6">
                        You do not have permission to access this page.
                        Please contact the administrator if you believe this is a mistake.
                    </p>
                    
                    <div className="space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={handleNavigate}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnauthPage;