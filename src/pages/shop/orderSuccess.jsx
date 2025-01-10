import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="container mx-auto py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll send you a confirmation email with your order details.
        </p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: {orderId}
          </p>
        )}
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/shop/orders')}
          >
            View Orders
          </Button>
          <Button
            onClick={() => navigate('/shop/home')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

// Add explicit default export
export default OrderSuccessPage;
