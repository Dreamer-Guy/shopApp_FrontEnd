import { Link } from "react-router-dom";
import React, { useRef,useState } from "react";
import { FaArrowRight,FaArrowDown } from "react-icons/fa";
const DropDownItem=({label,items})=>{
    const [isDropDownOpen,setIsDropDownOpen]=useState(false);
    const toggleDropDown=(e)=>{
        e.preventDefault();
        const content = e.target.closest(".text-md").nextElementSibling;
        if (content) {
            content.classList.toggle("hidden");
        }
        setIsDropDownOpen(!isDropDownOpen);   
    };
    return (
        <div >
            <div 
            onClick={(e)=>toggleDropDown(e)}
            className="text-md flex flex-row justify-between items-center cursor-pointer">
                <div>{label}</div>
                <div
                id="arrow-icon" 
                className="text-sm">{isDropDownOpen?<FaArrowDown/>:<FaArrowRight/>}</div>
            </div>
            <div className="px-2 text-sm hidden flex flex-col gap-2 mt-3">
            {items.map((item,index)=>(
                <Link key={index} to={item.path}>
                    <div>{item.label}</div>
                </Link>
            ))}
            </div>
        </div>
    )
};

export default DropDownItem;