import OrdersList from "@/components/admin/Content/Order/ordersList";

const orders = [
    {
      _id: "64fa1c2b3f2a2c3b5678d4e9",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678a1b2",
        fullName: "John Doe",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678b3c4",
          quantity: 2,
        },
        {
          productId: "64fa1c2b3f2a2c3b5678c4d5",
          quantity: 1,
        },
      ],
      total: 150.75,
      status: "pending",
      paymentStatus: false,
      createdAt: "2025-01-06T10:30:00.000Z",
    },
    {
      _id: "64fa1c2b3f2a2c3b5678d5e0",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678a3b4",
        fullName: "Jane Smith",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678d5e6",
          quantity: 3,
        },
      ],
      total: 90.5,
      status: "processing",
      paymentStatus: true,
      createdAt: "2025-01-05T09:20:00.000Z",
    },
    {
      _id: "64fa1c2b3f2a2c3b5678e6f1",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678b5c6",
        fullName: "Alice Johnson",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678e7f2",
          quantity: 5,
        },
        {
          productId: "64fa1c2b3f2a2c3b5678f8g3",
          quantity: 2,
        },
      ],
      total: 200.0,
      status: "completed",
      paymentStatus: true,
      createdAt: "2025-01-04T14:15:00.000Z",
    },
    {
      _id: "64fa1c2b3f2a2c3b5678f9g4",
      userId: {
        _id: "64fa1c2b3f2a2c3b5678c7d8",
        fullName: "Bob Williams",
      },
      items: [
        {
          productId: "64fa1c2b3f2a2c3b5678g9h5",
          quantity: 1,
        },
      ],
      total: 45.25,
      status: "pending",
      paymentStatus: false,
      createdAt: "2025-01-03T11:00:00.000Z",
    },
];
const re=()=>{
    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold">Orders</h1>
            </div>
            <div className="flex flex-row">
                <div className="w-1/12">

                </div>
                <div className="w-11/12"></div>
            </div>
            <OrdersList orders={orders}/>
        </div>
    )
};