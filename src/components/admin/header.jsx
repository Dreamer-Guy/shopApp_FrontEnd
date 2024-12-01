
import { FaBars } from "react-icons/fa6";

const leftContent=({toggleNavBar=f=>f})=>{
    return(
        <div
        className="hover:cursor-pointer" 
        onClick={()=>toggleNavBar()}>
            <FaBars/>
        </div>
    );
};

const rightContent=()=>{
    return(
        <div className="w-[32px] h-[32px] rounded-lg">
            <img src="https://github.com/shadcn.png"/>
        </div>
    );
};

const adminHeader=({toggleNavBar=f=>f})=>{
    return(
        <div className="w-full border border-y-2 shadow-lg border-black py-2 px-3 flex flex-row justify-between items-center">
            <div>
            {leftContent({toggleNavBar})}
            </div>
            <div>
            {rightContent()}
            </div>
        </div>
    );
};


export default adminHeader;