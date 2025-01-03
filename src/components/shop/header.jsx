import { Store, LogOut, Menu, ShoppingCart, UserCog, Search, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import {
  Link,
  useLocation,
  useNavigate,
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
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/user/userSlice";


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
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };
    
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate('/user/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

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
        
        {isAuthenticated && user ? (
            <DropdownMenu className="cursor-pointer">
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar className="bg-slate-400">
                  <AvatarFallback className="bg-slate-400 text-black font-extrabold">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => navigate('/user/profile')}
                >
                    <UserCog className="mr-2 h-4 w-4" />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Button 
                variant="ghost"
                onClick={() => navigate('/user/login')}
                className="font-medium"
            >
                Login
            </Button>
        )}
        
      </div>
    );
}

const ShoppingHeader = () => {
    return (
      <>
      <div className="bg-black text-white text-sm py-2">
          <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center">
                      <span>Mon-Thu: 9:00 AM - 5:30 PM</span>
                  </div>
                  
                  <div className="flex items-center">
                          <span>Visit our showroom in 1234 Street Adress City Address, 1234</span>
                          <a href="#" className="ml-2 underline">Contact Us</a>
                      </div>
                  
                  <div className="flex items-center space-x-4">
                      
                      
                      <div className="flex items-center space-x-2">
                          <span>Call Us: (00) 1234 5678</span>
                          <a href="#" className="hover:text-gray-300">
                              <FaFacebook className="w-5 h-5" />
                          </a>
                          <a href="#" className="hover:text-gray-300">
                              <FaInstagram className="w-5 h-5" />
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <header className="top-0 z-40 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/shop/home" className="flex items-center gap-2">
            <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8"/>
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
      </>
    )
}

export default ShoppingHeader;