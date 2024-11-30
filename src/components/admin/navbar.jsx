import path from "path";
import DropDownItem from "./dropDown";

const dropDownItems = [
    {
        label: "Categories",
        items:[
            {
                label: "Add Category",
                path: "/admin/categories/add"
            },
            {
                label: "View Categories",
                path: "/admin/categories/view"
            }
        ]
    },
    {
        label: "Brands",
        items:[
            {
                label: "Add Brand",
                path: "/admin/brands/add"
            },
            {
                label: "View Brands",
                path: "/admin/brands/view"
            }
        ]
    }
];


const adminNavBar = ({navBarOpen,toggleNavBar=f=>f}) => {
    return(
        <div>
            <div className="bg-black flex flex-col gap-4 text-white p-3 h-screen
            fixed left-0 top-0 w-64 z-50">
                <div className="flex flex-row justify-between items-center  gap-2">
                    <div className="w-10 h-10">
                        <img src="https://github.com/shadcn.png"/>
                    </div>
                    <div><p>My Shop</p></div>
                </div>
                <div>
                    <ul className="flex flex-col gap-3">
                        <li>Dashboard</li>
                        {dropDownItems.map((item,index)=>(
                            <li><DropDownItem label={item.label} items={item.items} key={index}/></li>
                        ))}
                        <li>Customers</li>
                        <li>Settings</li>
                    </ul>
                </div>
            </div>
            <div
            onClick={()=>{toggleNavBar()}} 
            className= {`w-full md:hidden ${navBarOpen?'':'hidden'} h-screen bg-slate-600 opacity-30 z-40`} >
            </div> 
        </div>
    )

};

export default adminNavBar;