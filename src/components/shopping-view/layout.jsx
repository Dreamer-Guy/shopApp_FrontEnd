import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout(){
    return (
        <div>
            <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
        </div>
    )
}

export default ShoppingLayout;