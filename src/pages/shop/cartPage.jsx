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
    const { cart, isLoading } = useSelector((state) => state.cart);
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
            await dispatch(getCart()).unwrap();
            
        } catch (err) {
            toast({
                title: "Error",
                description: err || "Could not load cart",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
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

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="mt-8 ml-5 mr-3 md:ml-14 md:mr-14">
            <h2 className="text-3xl font-semibold mb-6 px-">Shopping Cart</h2>
            <div className="w-auto flex flex-col md:flex-row md:justify-center gap-8">
                <div className="w-full md:w-7/12 flex flex-col gap-2">
                    {cart?.items?.length > 0 ? (
                        <>
                        
                            <ItemsList 
                                items={showingItems}
                                // onUpdateQuantity={handleUpdateItem}
                                onRemoveItem={handleRemoveItem}
                            />
                            <div className="flex flex-row gap-3">
                                <button 
                                    onClick={() => navigate('/shop/listing')}
                                    className="px-4 py-2 rounded-lg border border-gray-400 text-gray-400"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleDeleteCart}
                                    className="px-4 py-2 rounded-lg text-white bg-black font-semibold"
                                >
                                    Delete Cart
                                </button>
                            </div>
                            <div className="w-full flex flex-row justify-center items-center gap-2 pb-8">
                                <div
                                    onClick={()=>handlePaging(1)} 
                                    className="hover:cursor-pointer w-14 h-10 border border-black flex justify-center items-center rounded-lg">
                                    First
                                </div>
                                {
                                    showPaging.previous>0?
                                    (<div
                                        onClick={()=>handlePaging(showPaging.previous)} 
                                        className="hover:cursor-pointer h-10 w-10 border border-black flex flex-row 
                                        justify-center items-center rounded-lg ">{showPaging.previous}</div>):null
                                }
                                <div 
                                    onClick={()=>handlePaging(showPaging.current)}
                                    className="hover:cursor-pointer h-10 w-10 border border-black flex flex-row 
                                    justify-center items-center rounded-lg bg-blue-200">
                                    {showPaging.current}</div>
                                {
                                    showPaging.next<=totalPage?
                                    (<div
                                        onClick={()=>handlePaging(showPaging.next)} 
                                        className="hover:cursor-pointer h-10 w-10 border border-black flex 
                                        flex-row justify-center items-center rounded-lg">{showPaging.next}</div>):null
                                }
                                <div
                                    onClick={()=>handlePaging(totalPage)} 
                                    className="hover:cursor-pointer w-14 h-10 border border-black flex justify-center items-center rounded-lg">
                                    Last
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-4xl text-center py-8">
                            Cart is empty
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/4">
                    <CartSummary
                        isCheckoutDisable={!cart?.items?.length}
                        {...calculateTotal()}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;