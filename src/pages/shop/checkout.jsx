import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '@/store/order/orderSlice';
import { useToast } from '@/hooks/use-toast';

const ShoppingCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const calculateTotal = () => {
    if (!cart?.items?.length) return 0;
    const subTotal = cart.items.reduce((sum, item) => {
      return sum + (item.productId.salePrice || item.productId.price) * item.quantity;
    }, 0);
    const shipping = 10;
    return subTotal + shipping;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      userId: user.id,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.salePrice || item.productId.price
      })),
      address: {
        ...shippingAddress
      },
      total: calculateTotal(),
      orderStatus: 'PENDING',
      checkoutStatus: 'PENDING'
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      toast({
        title: "Success",
        description: "Order created successfully",
        className: "bg-green-500 text-white",
      });
      navigate('/shop/orders');
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Failed to create order",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    }
  };

  // ...existing form JSX code...
};

export default ShoppingCheckout;