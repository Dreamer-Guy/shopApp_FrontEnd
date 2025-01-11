import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Login = ({ formControls, formValue, setFormValue, onSubmit, isBtnDisabled, btnText }) => {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="w-full max-w-md p-8 bg-bg-1 rounded-lg shadow-md">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    <p className="text-gray-600 mt-2">Welcome back customer</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="userName"
                            value={formValue.userName || ''}
                            onChange={(e) => setFormValue({ ...formValue, userName: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formValue.password || ''}
                            onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            />
                            <label className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <Link to="/user/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isBtnDisabled}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                        {btnText}
                    </button>
                    
                    <div className='mt-2 flex justify-center relative'>
                        <div className='text-gray-600 uppercase px-3 bg-bg-1 z-10 relative'>
                            Or login with
                        </div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.location.href="http://localhost:5000/api/users/auth/google"}
                        className="w-1/2 mx-auto flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <FcGoogle className="w-5 h-5 mr-1" />
                        <span>Google</span>
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/user/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;