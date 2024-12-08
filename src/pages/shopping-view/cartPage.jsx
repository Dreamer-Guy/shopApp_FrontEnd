import ItemsList from "@/components/shopping-view/cart/ItemsList";
import CartSummary from "@/components/shopping-view/cart/Summary";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {useToast} from "@/hooks/use-toast";
import {getCart,addItemToCart,updateItemInCart,removeItemFromCart,deleteCart}
from "@/store/cart/index.js";
import { useState } from "react";
const cart = {
    userId: null,
    items: [
        {
            productId: {
                _id: "1",
                name: "Product 1 bad stupid product cana ximui kaka ",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 100,
                salePrice: 0,
                rating: 4,
                totalStock: 0,
            },
            quantity: 3,
        },
        {
            productId: {
                _id: "2",
                name: "Product 2",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 120,
                salePrice: 100,
                rating: 5,
                totalStock: 5,
            },
            quantity: 2,
        },
        {
            productId: {
                _id: "3",
                name: "Product 3",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 80,
                salePrice: 70,
                rating: 3,
                totalStock: 10,
            },
            quantity: 1,
        },
        {
            productId: {
                _id: "4",
                name: "Product 4",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 200,
                salePrice: 180,
                rating: 4.5,
                totalStock: 3,
            },
            quantity: 4,
        },
        {
            productId: {
                _id: "5",
                name: "Product 5",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 150,
                salePrice: 120,
                rating: 4.2,
                totalStock: 7,
            },
            quantity: 5,
        }
    ],
    createdAt: null,
};

const initShowPaging={
    previous:0,
    current:1,
    next:2,
};

const CartPage=()=>{
    const ITEM_PER_PAGE=4;
    const dispatch=useDispatch();
    const { toast } = useToast();
    useEffect(()=>{
        dispatch(getCart()).then((res) => {
            if (res.error) {
                toast({
                    title: "There is an error occured while fetching products, please try again",
                    description: res.payload,
                    variant: "destructive",
                });
            }
            else{

            }
        });
    },[]);
    const handleDeleteCart=()=>{
        dispatch(deleteCart()).then((res)=>{
            if(res.error){
                toast({
                    title:"There is an error occured while deleting cart",
                    description:res.payload,
                    variant:"destructive",
                });
            }
            else{
                toast({
                    title:"Cart deleted",
                });
            }
        });
    }
    //const {cart}=useSelector(state=>state.cart);
    const [showingItems,setShowingItems]=useState(cart.items.slice(0,ITEM_PER_PAGE));
    const [showPaging,setShowPaging]=useState(initShowPaging);
    const totalPage=Math.ceil(cart.items.length/ITEM_PER_PAGE);
    const handlePaging=(page)=>{
        setShowingItems((pre)=>cart.items.slice((page-1)*ITEM_PER_PAGE,page*ITEM_PER_PAGE));
        setShowPaging((pre)=>({...pre,previous:page-1,current:page,next:page+1}));
    }
    return (
        <div className="mt-8 ml-5 mr-3 md:ml-14 md:mr-14">
            <h2 className="text-3xl font-extrabold">Cart</h2>
            <div className="w-auto flex flex-col md:flex-row md:justify-center gap-8">
                <div className="w-full md:w-7/12 flex flex-col gap-2">
                    <ItemsList items={showingItems}/>
                    <div className="flex flex-row gap-3">
                        <button className="px-4 py-2 rounded-lg border border-gray-400 text-gray-400"> Continue Shopping</button>
                        <button 
                            onClick={(e)=>{
                                e.preventDefault();
                                handleDeleteCart();
                            }}
                            className="px-4 py-2 rounded-lg text-white bg-black font-semibold">Clear Shopping Cart</button>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-2">
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
                </div>
                <div className="w-full md:w-1/4">
                    <CartSummary subTotal={100} shipping={10} sale="20$" total={90}/>
                </div>
            </div>
        </div>
    );
};

export default CartPage;