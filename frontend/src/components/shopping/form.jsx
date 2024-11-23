import { FaUser, FaLock } from 'react-icons/fa';
import './form.css';



const FormElement=({formControl,formValue,setFormValue=f=>f})=>{
    const getIcon = (type) => {
        switch(type) {
            case 'text':
            case 'email':
                return <FaUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            case 'password':
                return <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />;
            default:
                return null;
        }
    };

    return(
        <div className="input_box">
            {getIcon(formControl.type)}
            <input 
                type={formControl.type}
                id={formControl.id} 
                name={formControl.id} 
                value={formValue[formControl.id]} 
                onChange={(e)=>{setFormValue({...formValue,[formControl.id]:e.target.value})}} 
                placeholder={formControl.placeholder}
            />
        </div>
    )
};

const Form = ({onSubmit=f=>f, formControls,formValue,setFormValue=f=>f,btnText,isBtnDisabled}) => {
    return (
        <div className="wrapper">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                {
                    formControls.map((formControl,index)=>(
                        <FormElement key={index} formControl={formControl} formValue={formValue} setFormValue={setFormValue} />
                    ))
                }
                <div className="remember-forgot">
                    <label><input type="checkbox" /> Remember me</label>
                    <a href="#">Forgot password?</a>
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
            </form>
        </div>
    );
}

export default Form;