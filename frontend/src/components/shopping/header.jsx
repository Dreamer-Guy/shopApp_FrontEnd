
import { LuShoppingCart } from "react-icons/lu";
import SearchBar from "./searchBar";
const navBarsList=[
    {name:"Home", url:"/"},
    {name:"Shop", url:"/shop"},
    {name:"About", url:"/about"},
    {name:"Contact", url:"/contact"},
];

const leftHeader=()=>{
    return (
        <div className="flex flex-row justify-center items-center gap-5">
            <div>
                <img src="https://via.placeholder.com/150" alt="logo" className="h-10 w-10" />
            </div>
            <div className="flex flex-row gap-4">
            {
                navBarsList.map((navBar,index)=>(
                    <div key={index}>{navBar.name}</div>
                ))
            }
            </div>
        </div>
    );
}

const rightHeader=({user})=>{
    return (
        <div className="flex flex-row gap-5">
        <div className="hidden md:block">
            <SearchBar />
        </div>
        {
            user?(
                <div className="flex flex-row justify-center items-center gap-4">
                    <div className="relative">
                        <LuShoppingCart size={25} className="hover:text-blue-500 cursor-pointer" />
                        <div 
                        className="absolute -top-2 -right-2 bg-blue-400 text-white 
                        rounded-full h-4 w-4 flex items-center justify-center">1</div>
                    </div>
                    <div>
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full cursor-pointer" />
                    </div>
                </div>
            ):(
                <div className="flex flex-row justify-center items-center gap-2">
                    <span>Sign In</span>
                    <span>/</span>
                    <span>Sign Up</span>
                </div>
            )
        }
        </div>
    );
}

const shopHeader = () => {
    const user={
        name:"John Doe",
        avatar:"https://via.placeholder.com/150"};
    return (
        <div className="flex justify-between items-center">
            {leftHeader()}
            {rightHeader({user})}
        </div>
    );

};


export default shopHeader;