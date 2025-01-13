import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from "@/store/order/shopOrder.js";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive' },
  { id: 'card', name: 'Credit/Debit Card', description: 'Secure online payment' },
  { id: 'momo', name: 'MoMo E-Wallet', description: 'Quick mobile payment' }
];

const ShoppingCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.user);

  const orderData = location.state?.orderData || {};
  const totalAmount = location.state?.total || 0;
  const isFromOrders = location.state?.isFromOrders || false;

  const [selectedPayment, setSelectedPayment] = useState('cod');

  const handleSubmit = async () => {
    try {
      const orderPayload = {
        ...orderData,
        userId: user?._id,
        paymentMethod: selectedPayment,
        isFromOrders: isFromOrders
      };

      const result = await dispatch(createOrder(orderPayload)).unwrap();

      toast({
        title: "Success",
        description: "Order placed successfully",
        className: "bg-green-500 text-white"
      });

      navigate('/shop/checkout/success', { 
        state: { orderId: result._id } 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Failed to place order",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                  />
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total Amount:</span>
              <span className="text-xl">${totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/shop/cart')}
          >
            Back to Cart
          </Button>
          <Button
            onClick={handleSubmit}
          >
            Place Order
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingCheckout;