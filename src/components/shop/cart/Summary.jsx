

const cartSummary=({subTotal,shipping,sale,total,onCheckout=f=>f, isCheckoutDisable})=>{
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
                    <div className="flex flex-row justify-between">
                        <p>Shipping</p>
                        <p>${shipping}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Hot sales</p>
                        <p>-{sale}</p>
                    </div>  
                    <div className="flex flex-row justify-between">
                        <p>Total</p>
                        <p className="text-xl font-bold">${total}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <button
                onClick={()=>onCheckout()} 
                className={`w-3/4 mt-3 bg-blue-500 text-white py-3 rounded-3xl ${isCheckoutDisable?'opacity-50 cursor-not-allowed':''}`}>Checkout</button>
            </div>
        </div>
    );
}

export default cartSummary;