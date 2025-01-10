import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

const mockOrders = [
  {
    _id: "ORD001",
    userId: "USER123",
    items: [
      {
        productId: "PROD1",
        productName: "Gaming Laptop",
        quantity: 1,
        price: 1299.99
      },
      {
        productId: "PROD2",
        productName: "Wireless Mouse",
        quantity: 2,
        price: 29.99
      }
    ],
    address: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      phone: "123-456-7890"
    },
    total: 1359.97,
    orderStatus: "PROCESSING",
    checkoutStatus: "PAID",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    _id: "ORD002",
    userId: "USER123",
    items: [
      {
        productId: "PROD3",
        productName: "Mechanical Keyboard",
        quantity: 1,
        price: 149.99
      }
    ],
    address: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      phone: "123-456-7890"
    },
    total: 159.99,
    orderStatus: "DELIVERED",
    checkoutStatus: "PAID",
    createdAt: "2024-01-10T15:45:00Z"
  },
  {
    _id: "ORD003",
    userId: "USER123",
    items: [
      {
        productId: "PROD4",
        productName: "Gaming Monitor",
        quantity: 1,
        price: 499.99
      },
      {
        productId: "PROD5",
        productName: "Gaming Headset",
        quantity: 1,
        price: 89.99
      }
    ],
    address: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      phone: "123-456-7890"
    },
    total: 599.97,
    orderStatus: "PENDING",
    checkoutStatus: "PENDING",
    createdAt: "2024-01-20T09:15:00Z"
  },
  {
    _id: "ORD004",
    userId: "USER123",
    items: [
      {
        productId: "PROD6",
        productName: "Gaming Chair",
        quantity: 1,
        price: 299.99
      }
    ],
    address: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      phone: "123-456-7890"
    },
    total: 299.99,
    orderStatus: "PENDING",
    checkoutStatus: "PENDING",
    createdAt: "2024-01-21T14:30:00Z"
  }
];

const OrderDetail = ({ order, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order?._id}</span>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order?.orderStatus)}`}>
                {order?.orderStatus}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                order?.checkoutStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order?.checkoutStatus}
              </span>
            </div>
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Ordered on: {order && formatDate(order.createdAt)}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-lg">Shipping Address</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <p><span className="font-medium">Name:</span> {order?.address?.fullName}</p>
              <p><span className="font-medium">Phone:</span> {order?.address?.phone}</p>
              <p><span className="font-medium">Street:</span> {order?.address?.street}</p>
              <p><span className="font-medium">City:</span> {order?.address?.city}</p>
              <p><span className="font-medium">Postal Code:</span> {order?.address?.postalCode}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-lg">Order Items</h3>
            <div className="space-y-4">
              {order?.items?.map((item) => (
                <div key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                    <img
                      src={item.productImage || 'placeholder.jpg'}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base">{item.productName}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 text-sm">
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                      <p className="font-medium">Total: ${(item.quantity * item.price).toFixed(2)}</p>
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
                <span>${order?.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${order?.total.toFixed(2)}</span>
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
  const [orders, setOrders] = useState(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Calculate pagination values
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handleOrderSelect = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      }
      return [...prev, orderId];
    });
  };

  const handleOrderClick = (order) => {
    setSelectedOrderDetail(order);
  };

  const handlePayNow = () => {
    const ordersToPay = orders.filter(order => 
      selectedOrders.includes(order._id) && order.checkoutStatus === 'PENDING'
    );
    
    navigate('/shop/checkout', {
      state: {
        orders: ordersToPay,
        totalAmount: totalAmount
      }
    });
  };

  const handleRemoveSelected = () => {
    const updatedOrders = orders.filter(order => !selectedOrders.includes(order._id));
    setOrders(updatedOrders);
    setSelectedOrders([]); // Clear selection after removal
  };

  const totalAmount = orders
    .filter(order => selectedOrders.includes(order._id) && order.checkoutStatus === 'PENDING')
    .reduce((sum, order) => sum + order.total, 0);

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
            {currentOrders.map((order, index) => (
              <TableRow 
                key={order._id}
                onDoubleClick={() => handleOrderClick(order)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell>
                  {order.checkoutStatus === 'PENDING' ? (
                    <Checkbox
                      checked={selectedOrders.includes(order._id)}
                      onCheckedChange={() => handleOrderSelect(order._id)}
                    />
                  ) : null}
                </TableCell>
                <TableCell className="font-medium">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>
                  {order.items.map((item) => (
                    <div key={item.productId}>
                      {item.quantity}x {item.productName}
                    </div>
                  ))}
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.orderStatus === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                    order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.checkoutStatus === 'PAID' ? 'bg-green-100 text-green-800' :
                    order.checkoutStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.checkoutStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
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

        {selectedOrders.length > 0 && (
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
              {totalAmount > 0 && (
                <button
                  onClick={handlePayNow}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Pay Now
                </button>
              )}
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