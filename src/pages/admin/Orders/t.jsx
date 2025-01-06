import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import CustomForm from "../../../components/admin/form";
import adminFormControl from "../../../config/admin/form.js";
import {CURRENCY} from "../../../config/index.js";
import { mock } from "node:test";

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

  const initFormData={
    status: mockOrder.status,
    paymentStatus: mockOrder.paymentStatus,
  }

const OrderItem=({name,price,image,quantity,key})=>{
    return (
        <div key={key} className="flex flex-row gap-2 justify-between w-full">
            <div className="flex flex-row gap-2 justify-start items-center w-2/3">
                <img className="w-[80px] object-cover" src={image}></img>
                <p>{name}</p>
            </div>
            <div className="flex flex-row gap-2 justify-end items-center w-1/3">
                <p>{CURRENCY}{price}</p>
                <p className="font-bold text-lg">x{quantity}</p>
            </div>
        </div>
    );
};

const OrderDetailsPage=({})=>{
    return(
        <div>
            <h2 className="font-bold text-xl">Order {mockOrder._id}</h2>
            <div className="flex flex-col md:flex-row p-4">
                <div className="w-1/2">
                    <div className="flex flex-row gap-3">
                        <div>
                            <img className="w-[200px] object-cover" src={mockOrder.userId.avatar} alt="User Avatar"/>
                        </div>
                        <div>
                            <p>Order Date: {mockOrder.createdAt}</p>
                            <p>{mockOrder.userId.fullName}</p>
                            <p>{mockOrder.userId.email}</p>
                            <p><span className="font-semibold">Total:</span>{`${CURRENCY}${mockOrder.total}`}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4>Shipping address</h4>
                        <p><span className="font-semibold">Street:</span> {mockOrder.address.street}, {mockOrder.address.city}</p>
                        <p><span className="font-semibold">Postal Code:</span> {mockOrder.address.postalCode}</p>
                        <p><span className="font-semibold">Phone:</span> {mockOrder.address.phone}</p>
                        <p><span className="font-semibold">Notes:</span> {mockOrder.address.notes}</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <h4>Order Items</h4>
                    <div className="flex flex-col gap-3 bg-gray-200 md:w-2/3 h-[350px] overflow-y-auto rounded-sm shadow-lg">
                        {mockOrder.items.map((item,index)=>(OrderItem({...item,key:index})))}
                    </div>
                </div>
                <div className="border border-black bg-blue-300 ">
                  
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage;