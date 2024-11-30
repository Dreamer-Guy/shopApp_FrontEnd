import { element } from "prop-types";
import { useRef, useState } from "react";


const textInput=({element,index,formData,setFormData})=>{
    return (
        <div 
            key={index}
            className="flex flex-col gap-2 text-lg font-semibold">
            <label htmlFor={element.label}>
            {element.label}
            </label>
            <input
            className="border border-black rounded-xl p-2"
            value={formData[element._id]}
            onChange={(e)=>{
                setFormData({...formData,[`${element._id}`]:e.target.value});
            }} 
            id={element._id} type="text" placeholder={element.placeholder}/>
        </div>
    )
};

const selectInput=({element,index,formData,setFormData})=>{
    return (
        <div
            key={index} 
            className="flex flex-row gap-2">
            <label htmlFor={element.label}>
            {element.label}
            </label>
            <select>
                {options.map((option,index)=>(
                    <option value={option.value}>{option.name}</option>
                ))}
            </select>
        </div>
    );
};

const fileInput=({element,index,formData,setFormData})=>{
    const imgRef=useRef();
    const triggerInputImg=(e)=>{
        imgRef.current.click();
    };
    const [imagePreview,setImagePreview]=useState();
    return(
        <div
            key={index} 
            className="flex flex-col gap-2 w-full">
            <label
            className="cursor-pointer font-semibold text-lg flex flex-row gap-2 justify-start" 
            htmlFor={element.label}>
            {element.label}
            </label>
            <input
            ref={imgRef}
            className="hidden"
            onChange={(e)=>{
                const newFormData={...formData,[`${element._id}`]:e.target.files[0]};
                setImagePreview(URL.createObjectURL(e.target.files[0]));
                setFormData(newFormData);
            }}
            id={element.label} type="file" placeholder={element.placeholder}/>
            <div
            onClick={(e)=>triggerInputImg(e)} 
            className=" hover:cursor-pointer p-3 w-full h-32 flex flex-row justify-center">
                <img
                className="border border-black rounded-xl w-1/2 h-full p-2" 
                src="/file_input.svg"/>
                
            </div>
            <div className="w-full flex flex-row justify-center">
                <img
                className={`border border-black rounded-xl w-full md:w-2/3 object-cover  p-2 ${imagePreview?'':'hidden'}`} 
                src={imagePreview}></img>
            </div>  
        </div>
    );
};

const getInputElement=({element,index,formData,setFormData})=>{
    const typeMapp={
        text:textInput,
        file:fileInput,
        select:selectInput,
    };
    const type=element.type.toLowerCase();
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
        <div className="w-full flex flex-col flex-wrap gap-2">
            <h3>{title}</h3>
            <div>
            {
            formControl.map((element,index)=>(
                getInputElement({element,index,formData,setFormData})
            ))
            }
            </div>
            <div className="flex flex-row justify-center ">
                <button
                className={`bg-blue-700 hover:bg-blue-300 text-white
                    border border-black rounded-xl p-2                
                    ${isDisable?'disabled:opacity-50 disabled:cursor-not-allowed':''}`}
                onClick={()=>onSubmit()}
                >{submitText}</button>
            </div>
        </div>
    );
};

export default adminForm;