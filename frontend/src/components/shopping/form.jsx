import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg from '../../assets/LoginImg.jpg';

const FormElement = ({ formControl, formValue, setFormValue = f => f }) => {
    const [showPassword, setShowPassword] = useState(false);

    const getIcon = (type) => {
        switch(type) {
            case 'text':
                return <FaUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            case 'password':
                return <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full h-[50px] my-5 border-2 border-white/20 rounded-full overflow-hidden">
            {getIcon(formControl.type)}
            <input
                type={formControl.type === 'password' ? (showPassword ? 'text' : 'password') : formControl.type}
                id={formControl.id}
                name={formControl.id}
                value={formValue[formControl.id]}
                onChange={(e) => { setFormValue({ ...formValue, [formControl.id]: e.target.value }) }}
                placeholder={formControl.placeholder}
                className="w-full h-full bg-transparent border-none outline-none text-base pl-[50px] pr-12 text-white placeholder-white"
            />
            {formControl.type === 'password' && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            )}
        </div>
    );
};

const Form = ({ onSubmit = f => f, formControls, formValue, setFormValue = f => f, btnText, isBtnDisabled, user, onProfileClick }) => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/30" 
             style={{ backgroundImage: `url(${LoginImg})` }}>
            <div className="w-[420px] bg-black/50 p-8 rounded-lg backdrop-blur-sm relative z-10">
                <h1 className="text-4xl text-center text-white">
                    {user ? 'Welcome' : 'Login'}
                </h1>
                {!user ? (
                    <form onSubmit={onSubmit}>
                        {
                            formControls.map((formControl, index) => (
                                <FormElement key={index} formControl={formControl} formValue={formValue} setFormValue={setFormValue} />
                            ))
                        }
                        <div className="flex justify-between text-[14.5px] mt-[-15px] mb-4">
                            <label className="flex items-center text-white">
                                <input type="checkbox" className="mr-2 accent-blue-400" /> Remember me
                            </label>
                            <a href="#" className="text-white hover:underline">Forgot password?</a>
                        </div>
                        <div className="flex flex-row justify-center w-full">
                            <button type="submit" className="btn btn-primary bg-blue-400 rounded-full py-2 px-4 w-full" disabled={isBtnDisabled}>
                                {btnText}
                            </button>
                        </div>
                        <div className="flex flex-row justify-center w-full mt-4"> 
                            <button 
                                onClick={(e)=>{
                                    e.preventDefault();
                                    window.location.href="http://localhost:5000/api/users/auth/google"
                                }}
                                className="flex items-center justify-center w-full font-semibold py-2 px-4 rounded-full border border-white text-white"
                            >
                                <img 
                                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
                                    alt="Google Logo" 
                                    className="w-5 h-5 mr-2"
                                />
                                Login with Google
                            </button>
                        </div>
                        <div className="text-[14.5px] text-center mt-5 mb-4">
                            <p className="text-white">Don't have an account? 
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="text-white hover:underline ml-1"
                                >
                                    Register
                                </button>
                            </p>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col items-center mt-4">
                        <p className="text-white mb-4">Welcome, {user.name || user.email}</p>
                        <button 
                            onClick={onProfileClick}
                            className="btn btn-primary bg-blue-400 rounded-full py-2 px-4 w-full"
                        >
                            View Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;