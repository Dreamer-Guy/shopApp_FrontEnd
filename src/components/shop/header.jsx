import { Store, LogOut, Menu, ShoppingCart, UserCog, Search } from "lucide-react";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DialogTitle } from "@radix-ui/react-dialog";


function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  
  function handleNavigate(getCurrentMenuItem) {
    navigate(getCurrentMenuItem.path);
  }
  
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  )
}

function HeaderRightContent() {
    const navigate = useNavigate();
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet>
          <Button variant="outline" size="icon" className="relative">
            <Search className="w-6 h-6"/>
            <span className="sr-only">User cart</span>
          </Button>
        </Sheet>
        
        <Sheet>
            <Button 
                onClick={() => navigate("/shop/cart")}
                variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-6 h-6"/>
                <span className="sr-only">User cart</span>
            </Button>
        </Sheet>
        
        <DropdownMenu className="cursor-pointer">
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar className="bg-slate-400">
              <AvatarFallback className="bg-slate-400 text-black font-extrabold">
                DT
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>Logged in as Username</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="cursor-pointer">
              <UserCog className="mr-2 h-4 w-4"/>
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4"/>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
    );
}

const ShoppingHeader = () => {
    return (
      <header className=" top-0 z-40 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/shop/home" className="flex items-center gap-2">
            <Store/>
            <span className="font-bold">Ecommerce</span>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6"/>
                <span className="sr-only">Toogle header menu</span>
              </Button>  
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs"> 
              <DialogTitle/>
              <MenuItems/>
              <HeaderRightContent/>
            </SheetContent>
          </Sheet>
          
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          
          <div className="hidden lg:block">
            <HeaderRightContent/>
          </div>
          
        </div>
        
      </header>
    )
}

export default ShoppingHeader;