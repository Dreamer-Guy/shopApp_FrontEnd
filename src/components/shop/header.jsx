import { Store, LogOut, Menu, ShoppingCart, UserCog, Search, Phone, ChevronDown, X, ClipboardList } from "lucide-react";
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
import { useState, useEffect } from "react";
import SearchBar from "./searchBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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
          className="text-base font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  )
}

function HeaderRightContent({ isSearchOpen, setIsSearchOpen }) {
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative border-none hover:rounded-full"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-6 h-6"/>
                <span className="sr-only">Search</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => navigate("/shop/cart")}
                variant="outline" 
                size="icon" 
                className="relative border-none hover:rounded-full"
              >
                <ShoppingCart className="w-6 h-6"/>
                <span className="sr-only">User cart</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => navigate("/shop/orders")}
                variant="outline" 
                size="icon" 
                className="relative border-none hover:rounded-full"
              >
                <ClipboardList className="w-6 h-6"/>
                <span className="sr-only">Orders</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Orders</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isAuthenticated && user ? (
            <DropdownMenu className="cursor-pointer">
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar className="h-9 w-9">
                        {user.avatar ? (
                            <div className="h-full w-full rounded-full overflow-hidden">
                                <img 
                                    src={user.avatar} 
                                    alt={user.fullName}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <AvatarFallback className="bg-slate-400 text-black font-extrabold">
                                    {getInitials(user.fullName)}
                                </AvatarFallback>
                            </div>
                        ) : (
                            <AvatarFallback className="bg-slate-400 text-black font-extrabold">
                                {getInitials(user.fullName)}
                            </AvatarFallback>
                        )}
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
    const [isSearchOpen, setIsSearchOpen] = useState(() => {
        const savedState = localStorage.getItem('isSearchOpen');
        return savedState ? JSON.parse(savedState) : false;
    });
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const searchTerm = searchParams.get('search');
        
        if (!location.pathname.includes('/shop/listing')) {
            sessionStorage.removeItem('filters');
            sessionStorage.removeItem('listingState');
            setIsSearchOpen(false);
            localStorage.setItem('isSearchOpen', 'false');
        } else if (searchTerm) {
            setIsSearchOpen(true);
            localStorage.setItem('isSearchOpen', 'true');
        }
    }, [location.pathname]);

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            navigate('/shop/listing');
            setIsSearchOpen(false);
            localStorage.setItem('isSearchOpen', 'false');
            sessionStorage.removeItem('filters');
            return;
        }
        navigate(`/shop/listing?search=${encodeURIComponent(searchTerm)}`);
    };

    const toggleSearch = () => {
        const newState = !isSearchOpen;
        setIsSearchOpen(newState);
        localStorage.setItem('isSearchOpen', JSON.stringify(newState));
    };

    return (
      <>
      <div className="bg-black text-white text-sm py-2 font-semibold">
          <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center justify-center md:justify-start">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="text-white p-0 hover:bg-transparent hover:text-yellow-500 focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-1 text-xs md:text-sm"
                        >
                          <span className="text-[#A2A6B0]">Mon-Fri:</span> 9:00 AM - 5:30 PM
                          <ChevronDown className="h-4 w-4 text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto font-semibold text-xs md:text-sm">
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Monday:</span> 9:00 AM - 5:30 PM
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Tuesday:</span> 9:00 AM - 5:30 PM
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Wednesday:</span> 9:00 AM - 5:30 PM
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Thursday:</span> 9:00 AM - 5:30 PM
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Friday:</span> 9:00 AM - 5:30 PM
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Saturday:</span> 10:00 AM - 3:00 PM
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="text-[#A2A6B0]">Sunday:</span> Closed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex md:hidden items-center text-center justify-center">
                      <span className="text-[#A2A6B0] text-xs px-4">227 Nguyen Van Cu, District 5, Ho Chi Minh City</span>
                      <a href="#" className="text-xs underline">Contact</a>
                  </div>
                  
                  <div className="hidden md:flex items-center text-center md:text-left">
                      <span className="text-[#A2A6B0]">Visit our showroom in 227 Nguyen Van Cu, District 5, Ho Chi Minh City</span>
                      <a href="#" className="ml-2 underline">Contact Us</a>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center md:justify-end space-x-4">
                      <div className="flex items-center space-x-2">
                          <span className="hidden sm:inline">Call Us: (028) 3835 4266</span>
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
        <div className="container mx-auto">
          <div className="flex h-14 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8"/>
              </Link>
            
            </div>
            
            <div className="hidden lg:block">
                <MenuItems />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <HeaderRightContent 
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6"/>
                    <span className="sr-only">Toggle header menu</span>
                  </Button>  
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]"> 
                  <DialogTitle/>
                  <MenuItems/>
                  <HeaderRightContent 
                      isSearchOpen={isSearchOpen}
                      setIsSearchOpen={setIsSearchOpen}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <SearchBar 
          isOpen={isSearchOpen}
          onSearch={handleSearch}
          onClose={() => {
              setIsSearchOpen(false);
              localStorage.setItem('isSearchOpen', 'false');
          }}
      />
      </>
    )
}

export default ShoppingHeader;