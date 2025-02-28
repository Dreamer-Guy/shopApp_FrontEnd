import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { CURRENCY } from "../../../config/index.js";
import EditingOrderDialog from "@/components/admin/Content/Order/editingDialog";
import { getOrderById } from "@/store/order/adminOrder.js";
import formatNumber from "@/utils/formatNumber.js";

const mockOrder = {
    _id: "64a8cce5f2b41e7a01234567", // Example ObjectId as a string
    userId: {
      _id: "64a8cce5f2b41e7a01234567", // Example ObjectId as a string
      fullName: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://github.com/shadcn.png",
    },
    items: [
      {
        name: "Product 1",
        price: 25.99,
        image: "https://github.com/shadcn.png",
        quantity: 2,
      },
      {
        name: "Product 2",
        price: 15.49,
        image: "https://github.com/shadcn.png",
        quantity: 1,
      },
      {
        name: "Product 1",
        price: 25.99,
        image: "https://github.com/shadcn.png",
        quantity: 2,
      },{
        name: "Product 1",
        price: 25.99,
        image: "https://github.com/shadcn.png",
        quantity: 2,
      },{
        name: "Product 1",
        price: 25.99,
        image: "https://github.com/shadcn.png",
        quantity: 2,
      },{
        name: "Product 1",
        price: 25.99,
        image: "https://github.com/shadcn.png",
        quantity: 2,
      },
    ],
    total: 67.47, // Total of items: (25.99 * 2) + (15.49 * 1)
    status: "pending", // Default status
    paymentStatus: false, // Default payment status
    address: {
      street: "123 Main St",
      city: "Springfield",
      postalCode: "12345",
      phone: "+1234567890",
      notes: "Leave at the front door.",
    },
    createdAt: "2024-01-06", // Current date
  };


const OrderItem = ({ name, price, image, quantity }) => {
    return (
        <div className="flex flex-col md:flex-row gap-2 justify-between w-full p-2 bg-white rounded-md shadow-sm">
            <div className="flex flex-row gap-2 justify-start items-center w-full md:w-2/3">
                <img className="w-[80px] object-cover rounded" src={image} alt={name} />
                <p className="font-medium">{name}</p>
            </div>
            <div className="flex flex-row gap-2 justify-start md:justify-end items-center w-full md:w-1/3">
                <span className="md:hidden font-bold">Quantity:</span>
                <p className="font-semibold">{CURRENCY}{formatNumber(price)}</p>
                <p className="font-bold text-lg">x{quantity}</p>
            </div>
        </div>
    );
};

const OrderDetailsPage = ({}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const {currentEditingOrder}=useSelector((state)=>state.order);
    useEffect(() => {
        dispatch(getOrderById(id));
    }, [id]);
    console.log(currentEditingOrder);
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <EditingOrderDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog} />
            <h2 className="font-bold text-2xl mb-4">Order {currentEditingOrder._id}</h2>
            <div className="flex flex-col md:flex-row p-4 bg-white rounded-lg shadow-sm">
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div>
                            <img className="w-[200px] object-cover rounded" src={currentEditingOrder.userId?.avatar} alt="User Avatar" />
                        </div>
                        <div>
                            <p><span className="font-semibold">Order Date:</span> {currentEditingOrder.createdAt}</p>
                            <p><span className="font-semibold">Name:</span> {currentEditingOrder.userId?.fullName}</p>
                            <p><span className="font-semibold">Email:</span> {currentEditingOrder.userId?.email}</p>
                            <p><span className="font-semibold">Total:</span> {`${CURRENCY}${formatNumber(currentEditingOrder?.total)}`}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <h4 className="font-bold text-lg">Shipping Address</h4>
                        <div className="px-2">
                            <p><span className="font-semibold">Street:</span> {currentEditingOrder.address?.street}, {currentEditingOrder.address?.city}</p>
                            <p><span className="font-semibold">Postal Code:</span> {currentEditingOrder.address?.postalCode}</p>
                            <p><span className="font-semibold">Phone:</span> {currentEditingOrder.address?.phone}</p>
                            <p><span className="font-semibold">Notes:</span> {currentEditingOrder.address?.notes||"No notes"}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h4 className="font-semibold md:font-normal">Order Items</h4>
                    <div className="flex flex-col gap-3 bg-gray-200 md:w-2/3 h-[350px] overflow-y-auto rounded-md shadow-lg p-2">
                        {currentEditingOrder.items?.map((item, index) => (
                            <OrderItem {...item} key={index} />
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setOpenUpdateDialog(true);
                }}
                className="border w-40 border-blue-500 bg-blue-500 p-2 mt-5 rounded-lg text-white hover:bg-white hover:text-blue-500 font-semibold transition-colors">
                Update Order Status
            </button>
        </div>
    );
};

export default OrderDetailsPage;