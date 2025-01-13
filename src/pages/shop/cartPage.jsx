import ItemsList from "@/components/shop/cart/ItemsList";
import CartSummary from "@/components/shop/cart/Summary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { 
    getCart, 
    deleteCart, 
    addItemToCart,
    updateItemInCart,
    removeItemFromCart 
} from "@/store/cart/index.js";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";


const LoadingSkeletonView = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-48 mb-6" /> 
      
      <div className="flex flex-col lg:flex-row gap-8"> 
        <div className="w-full lg:w-8/12 flex flex-col gap-4"> 
          {Array(4).fill().map((_, index) => (
            <div key={`cart-item-${index}`} className="flex gap-4 bg-white p-4 rounded-lg">
              <Skeleton className="h-24 w-24 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {Array(5).fill().map((_, index) => (
              <Skeleton key={`page-${index}`} className="h-10 w-10 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-4/12"> 
          <div className="bg-white p-6 rounded-lg space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-3">
              {Array(3).fill().map((_, index) => (
                <div key={`summary-row-${index}`} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const initShowPaging = {
    previous: 0,
    current: 1,
    next: 2,
};

const CartPage = () => {
    const ITEM_PER_PAGE = 4;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { cart } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(true);
    const [showingItems, setShowingItems] = useState([]);
    const [showPaging, setShowPaging] = useState(initShowPaging);
    
    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        
        if (cart?.items) {
            setShowingItems(cart.items.slice(0, ITEM_PER_PAGE));
        }
    }, [cart?.items]);
    const fetchCart = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await dispatch(getCart()).unwrap();
        } catch (err) {
            toast({
                title: "Error",
                description: err || "Could not load cart",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (productId, quantity) => {
        try {
            await dispatch(addItemToCart({ productId, quantity })).unwrap();
            toast({
                title: "Success",
                description: "Product added to cart",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            fetchCart(); // Refresh cart data
        } catch (err) {
            toast({
                title: "Error",
                description: err || "Could not add product",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        }
    };

    const handleUpdateItem = async (productId, quantity) => {
        try {
            await dispatch(updateItemInCart({ productId, quantity })).unwrap();
            toast({
                title: "Success",
                description: "Quantity updated",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            fetchCart(); // Refresh cart data
        } catch (err) {
            toast({
                title: "Error",
                description: err || "Could not update quantity",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await dispatch(removeItemFromCart(productId)).unwrap();
            toast({
                title: "Success",
                description: "Product removed from cart",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            fetchCart(); // Refresh cart data
        } catch (err) {
            toast({
                title: "Error",
                description: err || "Could not remove product",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        }
    };

    const handleDeleteCart = async () => {
        try {
            await dispatch(deleteCart()).unwrap();
            toast({
                title: "Success",
                description: "Cart deleted",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            fetchCart(); // Refresh cart data
        } catch (err) {
            toast({
                title: "Error",
                description: err || "Could not delete cart",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        }
    };

    const totalPage = Math.ceil((cart?.items?.length || 0) / ITEM_PER_PAGE);

    const handlePaging = (page) => {
        setShowingItems(cart.items.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE));
        setShowPaging({ previous: page - 1, current: page, next: page + 1 });
    };

    const calculateTotal = () => {
        if (!cart?.items?.length) return { subTotal: 0, shipping: 0, sale: 0, total: 0 };
        
        const subTotal = cart.items.reduce((sum, item) => {
            const price = item.productId.salePrice || item.productId.price;
            return sum + (price * item.quantity);
        }, 0);

        const shipping = subTotal > 0 ? 10 : 0;
        const sale = 0; 
        const total = subTotal + shipping - sale;

        return { subTotal, shipping, sale, total };
    };

    if (loading) {
        return <LoadingSkeletonView />;
    }

    return (
        <div className="mt-8 mx-4 md:mx-8 lg:mx-14">
            <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
            <div className="w-full flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-8/12 flex flex-col gap-2">
                    {cart?.items?.length > 0 ? (
                        <>
                            <ItemsList 
                                items={showingItems}
                                onRemoveItem={handleRemoveItem}
                            />
                            <div className="flex flex-row gap-4">
                                <button 
                                    onClick={() => navigate('/shop/listing')}
                                    className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700
                                    hover:border-gray-400 hover:bg-gray-50 transition-all duration-200
                                    flex items-center gap-2 font-medium"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleDeleteCart}
                                    className="px-6 py-2.5 rounded-lg bg-red-500 text-white
                                    hover:bg-red-600 transition-all duration-200
                                    flex items-center gap-2 font-medium"
                                >
                                    Delete Cart
                                </button>
                            </div>
                            <div className="w-full flex flex-row justify-center items-center gap-3 py-6">
                                <button
                                    onClick={() => handlePaging(1)} 
                                    className="px-4 h-10 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 
                                    flex items-center justify-center text-sm font-medium text-gray-600 transition-colors">
                                    First
                                </button>
                                
                                {showPaging.previous > 0 && (
                                    <button
                                        onClick={() => handlePaging(showPaging.previous)} 
                                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50
                                        flex items-center justify-center text-sm font-medium text-gray-600 transition-colors">
                                        {showPaging.previous}
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => handlePaging(showPaging.current)}
                                    className="w-10 h-10 rounded-lg border border-primary bg-primary/10 text-primary
                                    flex items-center justify-center text-sm font-medium transition-colors">
                                    {showPaging.current}
                                </button>
                                
                                {showPaging.next <= totalPage && (
                                    <button
                                        onClick={() => handlePaging(showPaging.next)} 
                                        className="w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50
                                        flex items-center justify-center text-sm font-medium text-gray-600 transition-colors">
                                        {showPaging.next}
                                    </button>
                                )}
                                
                                <button
                                    onClick={() => handlePaging(totalPage)} 
                                    className="px-4 h-10 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50
                                    flex items-center justify-center text-sm font-medium text-gray-600 transition-colors">
                                    Last
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-4xl text-center py-8">
                            Cart is empty
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-4/12">
                    <CartSummary
                        cart={cart}
                        isCheckoutDisable={!cart?.items?.length}
                        {...calculateTotal()}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;