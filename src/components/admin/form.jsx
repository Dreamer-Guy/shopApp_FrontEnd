import { useRef, useState,useEffect } from "react";


const textInput=({element,index,formData,setFormData})=>{
    return (
        <div key={index} className="space-y-2">
            <label 
                htmlFor={element.label}
                className="block text-sm font-medium text-gray-700"
            >
                {element.label}
            </label>
            <input
                id={element._id}
                type="text"
                value={formData[element._id]}
                onChange={(e) => {
                    setFormData({...formData, [`${element._id}`]: e.target.value});
                }}
                placeholder={element.placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    placeholder:text-gray-400 text-gray-900
                    transition-colors duration-200"
            />
        </div>
    );
};

const selectInput=({element,index,formData,setFormData})=>{
    const handleOnchange=(e)=>{
        const newFormData={...formData,[`${element._id}`]:e.target.value};
        setFormData(newFormData);
    }
    return (
        <div key={index} className="space-y-2">
            <label 
                htmlFor={element.label}
                className="block text-sm font-medium text-gray-700"
            >
                {element.label}
            </label>
            <select
                id={element.label}
                value={formData[element._id]}
                onChange={(e) => handleOnchange(e)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    bg-white text-gray-900
                    transition-colors duration-200"
            >
                {element.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const fileInput=({element,index,formData,setFormData})=>{
    const imgRef=useRef();
    const [isImagePreviewSet, setIsImagePreviewSet] = useState(false);
    const [imagePreview, setImagePreview] = useState();

    useEffect(() => {
        setIsImagePreviewSet(checkIsImagePreviewSetAtFirst());
    }, [formData]);

    const triggerInputImg = (e) => {
        imgRef.current.click();
    };

    const checkIsImagePreviewSetAtFirst = () => {
        if(formData[element._id] && (
            (typeof formData[element._id] === 'string' && formData[element._id].length > 0) ||
            (formData[element._id] instanceof File)
        )){
            return true;
        }
        return false;
    };

    return (
        <div className="space-y-3">
            <label
                className="block text-sm font-medium text-gray-700"
                htmlFor={element.label}
            >
                {element.label}
            </label>
            
            <input
                ref={imgRef}
                className="hidden"
                onChange={(e) => {
                    const newFormData = {...formData, [`${element._id}`]: e.target.files[0]};
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                    setIsImagePreviewSet(true);
                    setFormData(newFormData);
                }}
                id={element.label}
                type="file"
                accept="image/*"
            />

            <div
                onClick={(e)=>triggerInputImg(e)}
                className={`
                    cursor-pointer border-2 border-dashed border-gray-300 
                    rounded-lg p-4 transition-all duration-200
                    hover:border-blue-500 hover:bg-blue-50/50
                    ${isImagePreviewSet ? 'hidden' : 'flex flex-col items-center justify-center'}
                `}
            >
                <img
                    src="/src/assets/file_input.svg"
                    className="w-16 h-16 mb-2 opacity-75"
                />
                <p className="text-sm text-gray-600">Click to upload image</p>
            </div>

            {isImagePreviewSet && (
                <div 
                    onClick={(e)=>triggerInputImg(e)}
                    className="cursor-pointer"
                >
                    <img
                        src={imagePreview || formData[element._id]}
                        className="w-full max-w-md mx-auto rounded-lg border border-gray-200 
                            shadow-sm hover:shadow-md transition-shadow duration-200"
                    />
                </div>
            )}
        </div>
    );
};

const getInputElement=({element,index,formData,setFormData})=>{
    const typeMapp={
        text:textInput,
        file:fileInput,
        select:selectInput,
    };
    const type=element?.type?.toLowerCase();
    const inputFunc=typeMapp[type];
    if(!inputFunc){
        return (
            <div key={index}>
            </div>
        )
    }
    return inputFunc({element,index,formData,setFormData});
};


const adminForm=({title,formControl,formData,setFormData=f=>f,submitText,onSubmit=f=>f,isDisable=false})=>{
    return (
        <div className="w-full max-w-3xl mx-auto">
            {title && (
                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                </div>
            )}
            
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                {formControl.map((element, index) => (
                    <div key={index}>
                        {getInputElement({element, index, formData, setFormData})}
                    </div>
                ))}

                <div className="pt-6 flex justify-end">
                    <button
                        onClick={() => onSubmit()}
                        disabled={isDisable}
                        className={`
                            px-6 py-2.5 rounded-lg font-medium
                            transition-all duration-200
                            ${isDisable 
                                ? 'bg-gray-300 cursor-not-allowed opacity-60' 
                                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow'
                            }
                        `}
                    >
                        {submitText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default adminForm;