import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserFromLocalStorage } from '@/store/utils/localStorage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import {fetchOrders, deleteOrder} from "@/store/order/shopOrder.js";
import {useDispatch, useSelector} from 'react-redux';



const user = getUserFromLocalStorage(); 
const normalizePaymentStatus = (status) => {
  if (status === false) return 'pending';
  return status || 'pending';
};

const OrderDetail = ({ order, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Add this new function to handle product price calculation
  const calculateItemTotal = (item) => {
    return (Number(item.price) * Number(item.quantity)) || 0;
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order?._id}</span>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order?.status)}`}>
                {order?.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                normalizePaymentStatus(order?.paymentStatus) === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {normalizePaymentStatus(order?.paymentStatus)}
              </span>
            </div>
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Ordered on: {order && formatDate(order.createdAt)}
          </p>
        </DialogHeader>
 
        <div className="space-y-6">
          {/* Updated Shipping Address section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-lg">Shipping Address</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <p><span className="font-medium">Name:</span> {user.fullName || 'N/A'}</p>
              <p><span className="font-medium">Phone:</span> {order?.address?.phone}</p>
              <p><span className="font-medium">Street:</span> {order?.address?.street}</p>
              <p><span className="font-medium">City:</span> {order?.address?.city}</p>
              <p><span className="font-medium">Postal Code:</span> {order?.address?.postalCode}</p>
            </div>
          </div>

          {/* Updated Order Items section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-lg">Order Items</h3>
            <div className="space-y-4">
              {order?.items?.map((item) => (
                <div key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                    <img
                      src={item.image || 'placeholder.jpg'}
                      alt={item.name || 'Product'}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base">
                      {item.name || 'Product Unavailable'}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 text-sm">
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${(Number(item.price) || 0).toFixed(2)}</p>
                      <p className="font-medium">
                        Total: ${calculateItemTotal(item).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-lg">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Subtotal:</span>
                <span>${(Number(order?.total) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${(Number(order?.total) || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ShoppingOrders = () => {
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get orders directly from Redux store
    const { orders, loading, error } = useSelector((state) => state.shopOrder);

    useEffect(() => {
        if (user?._id) {
        dispatch(fetchOrders(user._id));
        }
    }, [dispatch]);

    // Add debugging logs
    useEffect(() => {
        console.log('Raw orders data:', orders);
    }, [orders]);

    // Remove nested data access, use orders array directly
    const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = orders?.slice(startIndex, endIndex) || [];
    console.log(totalPages, orders.length)

    const handleOrderClick = (order) => {
        setSelectedOrderDetail(order);
    };

    // Modify table cell render for items
    const renderOrderItems = (order) => {
        return order.items?.map((item, idx) => (
            <div key={idx}>
                {item.quantity}x {item.name || 'Unknown Item'} 
                <span className="text-gray-500 text-sm ml-1">
                    (${(Number(item.price) || 0).toFixed(2)} each)
                </span>
            </div>
        ));
    };

    // Loading state
    if (loading) {
        return (
        <div className="container mx-auto py-8 flex justify-center items-center">
            <div className="text-xl">Loading orders...</div>
        </div>
        );
    }

    // Error state
    if (error) {
        return (
        <div className="container mx-auto py-8">
            <Card className="p-6 text-center text-red-600">
            {error?.message || "Failed to fetch orders"}
            </Card>
        </div>
        );
    }

    // Empty state
    if (!orders?.length) {
        return (
        <div className="container mx-auto py-8">
            <Card className="p-6 text-center">
            No orders found
            </Card>
        </div>
        );
    }

    const handleOrderSelect = (orderId) => {
        if (!orderId) return; // Guard against undefined/null orderIds
        setSelectedOrders(prev => {
            if (prev.includes(orderId)) {
                return prev.filter(id => id !== orderId);
            }
            return [...prev, orderId];
        });
    };

    const handlePayNow = () => {
        const ordersToPay = orders.filter(order => 
            selectedOrders.includes(order._id) && 
            normalizePaymentStatus(order.paymentStatus) === 'pending'
        );
        
        if (ordersToPay.length === 0) {
            alert('No valid orders selected for payment');
            return;
        }

        const totalAmount = calculateTotalAmount(ordersToPay);
        const orderData = {
            items: ordersToPay.flatMap(order => order.items),
            total: totalAmount,
            orderIds: ordersToPay.map(order => order._id)
        };

        navigate('/shop/checkout', {
            state: {
                orderData,
                total: totalAmount,
                isFromOrders: true
            }
        });
    };

    const calculateTotalAmount = (orders) => {
        return orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    };

    // Replace the existing totalAmount calculation with this:
    const totalAmount = calculateTotalAmount(
        orders.filter(order => 
            order?._id && 
            selectedOrders.includes(order._id) && 
            normalizePaymentStatus(order.paymentStatus) === 'pending'
        )
    );

    const handleRemoveSelected = async () => {
        if (!window.confirm('Are you sure you want to cancel these orders?')) {
            return;
        }

        try {
            // Delete each selected order
            for (const orderId of selectedOrders) {
                await dispatch(deleteOrder(orderId)).unwrap();
            }
            setSelectedOrders([]); // Clear selection
            // Refresh orders after deletion
            await dispatch(fetchOrders(user._id));
        } catch (error) {
            console.error('Failed to delete orders:', error);
            alert('Failed to cancel some orders. Please try again.');
        }
    };

    // Add a single order delete handler
    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }

        try {
            await dispatch(deleteOrder(orderId)).unwrap();
            // Refresh orders after deletion
            await dispatch(fetchOrders(user._id));
        } catch (error) {
            console.error('Failed to delete order:', error);
            alert('Failed to cancel order. Please try again.');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto py-8">
        <Card className="p-6">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>No.</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentOrders?.map((order, index) => {
                    console.log('Processing order:', order); // Debug log
                    return (
                        <TableRow 
                            key={order?._id || index}
                            onDoubleClick={() => handleOrderClick(order)}
                            className="cursor-pointer hover:bg-gray-50"
                        >
                            <TableCell>
                                {order?._id && normalizePaymentStatus(order.paymentStatus) === 'pending' && (
                                    <Checkbox
                                        checked={selectedOrders.includes(order._id)}
                                        onCheckedChange={() => handleOrderSelect(order._id)}
                                    />
                                )}
                            </TableCell>
                            <TableCell className="font-medium">
                            {startIndex + index + 1}
                            </TableCell>
                            <TableCell>
                            {Array.isArray(order?.items) ? renderOrderItems(order) : <div>No items available</div>}
                            </TableCell>
                            <TableCell>${(Number(order.total) || 0).toFixed(2)}</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {order.status}
                            </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        normalizePaymentStatus(order.paymentStatus) === 'paid' ? 'bg-green-100 text-green-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {normalizePaymentStatus(order.paymentStatus)}
                                    </span>
                                 
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center gap-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                    currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-100'
                }`}
                >
                {index + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
            </div>

            {selectedOrders.length > 0 && totalAmount > 0 && (
            <div className="mt-6 flex justify-between items-center border-t pt-4">
                <div className="text-lg font-semibold">
                Total Selected: ${totalAmount.toFixed(2)}
                </div>
                <div className="flex gap-2">
                <button
                    onClick={handleRemoveSelected}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Remove Selected
                </button>
                <button
                    onClick={handlePayNow}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Pay Now
                </button>
                </div>
            </div>
            )}
        </Card>
        <OrderDetail 
            order={selectedOrderDetail} 
            onClose={() => setSelectedOrderDetail(null)} 
        />
        </div>
    );
};

export default ShoppingOrders;