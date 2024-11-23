



const FormElement=({formControl,formValue,setFormValue=f=>f})=>{
    console.log(formControl.id);
    return(
        <div className="form-group flex flex-col items-start gap-2 w-full">
            <label 
            className="text-md font-semibold"
            htmlFor={formControl.id}>{formControl.label}</label>
            <input 
            className="border-2 border-gray-300 p-1 rounded-lg focus:outline-none focus:border-blue-400
            w-full"
            type={formControl.type} id={formControl.id} 
            name={formControl.id} 
            value={formValue[formControl.id]} 
            onChange={(e)=>{setFormValue({...formValue,[formControl.id]:e.target.value})}} 
            placeholder={formControl.placeholder}/>
        </div>
    )
};

const Form = ({onSubmit=f=>f, formControls,formValue,setFormValue=f=>f,btnText,isBtnDisabled}) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col items-start justify-center gap-2">
        {
            formControls.map((formControl,index)=>(
                <FormElement key={index} formControl={formControl} formValue={formValue}setFormValue={setFormValue} />
            ))
        }
        <div className="flex flex-row justify-center w-full">
            <button type="submit" className="btn btn-primary bg-blue-400 rounded-lg py-2 px-4 " disabled={isBtnDisabled}>{btnText}</button>
        </div>
        <div className="flex flex-row justify-center w-full"> 
            <button 
                onClick={(e)=>{
                    e.preventDefault();
                    window.location.href="http://localhost:5000/api/users/auth/google"}}
                className="flex items-center  font-semibold py-2 px-4 rounded-lg transition border border-black">
                <img 
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
                alt="Google Logo" 
                className="w-5 h-5 mr-2"
                />
                Login with Google
            </button>
        </div>
        </form>
    );
}

export default Form;