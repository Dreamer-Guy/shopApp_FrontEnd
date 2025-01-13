import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '@/store/order/shopOrder.js';
import { getUserAddress } from "@/store/user/userSlice";
import { useSelector } from 'react-redux';
import { toast } from '@/hooks/use-toast';
const cartSummary = ({ subTotal, shipping, sale, total, cart, onCheckout = f => f, isCheckoutDisable }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {address, user} = useSelector((state)=>state.user);

    const calculateShippingFee = (subtotal) => {
        if (subtotal >= 800) return 0;
        if (subtotal >= 400) return 0;
        return 20;
    };

    const hasItems = cart?.items?.length > 0;
    // const shippingFee = hasItems ? calculateShippingFee(subTotal) : 0;
    const shippingFee = 0;
    const finalTotal = hasItems ? Number(subTotal) + Number(shippingFee) - Number(sale) : 0;

    useEffect(() => {
        dispatch(getUserAddress(user._id));
    }, [dispatch, user._id]);

    const handleCheckout = async () => {
        if (!cart?.items?.length) {
            alert('Your cart is empty');
            return;
        }

        if (!address) {
            toast({
                title: "Missing Address",
                description: "Please provide your delivery address in your profile account",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
            return;
        }

        // Check all required address fields
        const requiredFields = {
            street: 'Street address',
            city: 'City',
            postalCode: 'Postal code',
            phone: 'Phone number'
        };

        for (const [field, label] of Object.entries(requiredFields)) {
            if (!address[field]) {
                alert(`Please provide your ${label}`);
                return;
            }
        }

        try {
            const orderData = {
                items: cart.items.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                }))
            };
            
            const result = await dispatch(createOrder(orderData));
            
            if (result.meta.requestStatus === 'fulfilled') {
                toast({
                    title: "Order Success",
                    description: "Your order has been placed successfully!",
                    variant: "success",
                    className: "bg-green-500 text-white",
                    duration: 3000
                });
                navigate('/shop/orders');
                window.location.reload();
            }
        } catch (error) {
            alert('Failed to create order: ' + error.message);
        }
    };

    return (
        <div className="w-full bg-gray-100 p-6">
            <h2 className="text-2xl font-bold">Summary</h2>
            <div className="w-full">
                <div>
                    <h3 className="text-lg font-semibold">Get your order now!!!</h3>
                    <p className="text-sm p-2">
                        Discover the perfect blend of quality and value with our favorite product! Designed to meet your needs, it offers unmatched durability, style, and performance. Don't miss out—experience the difference and transform your daily routine today. 
                        Buy now and join countless satisfied customers who’ve made the smart choice!</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Apply Discount</h3>
                </div>
                <div className="flex flex-col gap-3 border-t border-black mt-2 font-semibold">
                    <div className="flex flex-row justify-between">
                        <p>Subtotal</p>
                        <p>${subTotal}</p>
                    </div>
                    {/* {hasItems && (
                        <div className="flex flex-row justify-between">
                            <p>Shipping</p>
                            <p>{shippingFee === 0 ? 'Free' : `$${shippingFee}`}</p>
                        </div>
                    )} */}
                    {hasItems && (
                        <div className="flex flex-row justify-between">
                            <p>Hot sales</p>
                            <p>-${sale}</p>
                        </div>
                    )}
                    <div className="flex flex-row justify-between">
                        <p>Total</p>
                        <p className="text-xl font-bold">${finalTotal.toFixed(2)}</p>
                    </div>
                    {/* {hasItems && subTotal < 800 && (
                        <p className="text-sm text-gray-600 mt-1">
                            {subTotal < 400 
                                ? "Free shipping for orders over $800"
                                : `Add ${(800 - subTotal).toFixed(2)}$ more for free shipping`}
                        </p>
                    )} */}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <button
                onClick={handleCheckout} 
                className={`w-3/4 mt-3 bg-blue-500 text-white py-3 rounded-3xl ${isCheckoutDisable?'opacity-50 cursor-not-allowed':''}`}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default cartSummary;