import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <div className="inline-block relative">
                    <div className="absolute inset-0 transform -skew-x-12 bg-blue-600"></div>
                    <h2 className="relative text-xl md:text-3xl font-medium text-white px-4 py-2">
                        Page Not Found
                    </h2>
                </div>
                <p className="text-gray-600 mt-4 mb-8">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;