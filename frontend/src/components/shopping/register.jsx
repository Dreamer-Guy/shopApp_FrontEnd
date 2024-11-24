import { FaUser, FaLock, FaEnvelope, FaRegUserCircle} from 'react-icons/fa';
import { useState } from 'react';
import LoginImg from '../../assets/LoginImg.jpg';
import PropTypes from 'prop-types';
import formControls from '../../config/form';



const FormElement = ({ formControl, formValue, setFormValue = f => f }) => {

    const getIcon = (type) => {
        switch(type) {
            case 'text':
                return <FaUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            case 'password':
                return <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            case 'email':
                return <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            case 'fullname':
                return <FaRegUserCircle className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full h-[50px] my-5 border-2 border-white/20 rounded-full overflow-hidden">
            {getIcon(formControl.type)}
            <input
                type={formControl.type}
                id={formControl.id}
                name={formControl.id}
                value={formValue[formControl.id]}
                onChange={(e) => 
                    { setFormValue({ ...formValue, [formControl.id]: e.target.value }) }
                }
                placeholder={formControl.placeholder}
                className="w-full h-full bg-transparent border-none outline-none text-base pl-[50px] pr-12 text-white placeholder-white"
            />
        </div>
    );
};

const Register = ({formControls, formValue, setFormValue, onSubmit, isBtnDisabled, btnText}) => {


    
    return (
        <div className="min-h-screen w-full fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/30" 
             style={{ backgroundImage: `url(${LoginImg})` }}>
            <div className="w-[420px] bg-black/50 p-8 rounded-lg backdrop-blur-sm relative z-10">
                <h1 className="text-4xl text-center text-white">{btnText}</h1>
                <form onSubmit={onSubmit}>
                    {
                        formControls.map((formControl, index) => (
                            <FormElement 
                                key={index} 
                                formControl={formControl} 
                                formValue={formValue} 
                                setFormValue={setFormValue} 
                            />
                        ))
                    }
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
                        <p className="text-white">
                            {btnText === 'Login' ? (
                                <>Don't have an account? <a href="/signup" className="text-white hover:underline ml-1">Register</a></>
                            ) : (
                                <>Already have an account? <a href="/login" className="text-white hover:underline ml-1">Login</a></>
                            )}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

Register.propTypes = {
    formControls: PropTypes.array.isRequired,
    formValue: PropTypes.object.isRequired,
    setFormValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isBtnDisabled: PropTypes.bool.isRequired,
    btnText: PropTypes.string.isRequired
};

export default Register;