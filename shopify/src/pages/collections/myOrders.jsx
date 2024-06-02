import { useEffect, useState } from 'react'
import { base_url } from "../../helper"
import React from 'react'
import axios from 'axios'

const TimeLine = ({ status }) => {
    const statuses = [
        { label: 'incart', detail: 'Item in cart' },
        { label: 'ordered', detail: 'Order placed' },
        { label: 'shipped', detail: 'Order shipped' },
        { label: 'delivered', detail: 'Order delivered' },
    ];
    const currentStatusIndex = statuses.findIndex(s => s.label === status);

    const statusColors = {
        incart: 'bg-blue-500',
        ordered: 'bg-orange-500',
        shipped: 'bg-purple-500',
        delivered: 'bg-green-500',
    };

    return (
        <div className="flex items-center w-full my-6 relative">
            {statuses.map((item, index) => (
                <div key={item.label} className="flex-1 text-center">
                    <div className="relative flex items-center justify-center">
                        <div
                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStatusIndex ? statusColors[item.label] : 'bg-gray-300'}`}
                        >
                            <span className="text-white">{index + 1}</span>
                        </div>

                        {index < statuses.length  &&  (
                            <div className={`flex-1 h-1 bg-gray-300 relative ${index == statuses.length -1? 'invisible' : ''}`}>

                                <div className={`absolute  top-0 left-0 h-full ${index <= currentStatusIndex ? statusColors[item.label] : 'bg-gray-300'}`} style={{ width: `${(index < currentStatusIndex ? 100 : index==currentStatusIndex ? 50:0)}%  ` }}></div>
                            </div>
                        )}
                    </div>
                    <span className="block mt-2 capitalize">{item.label}</span>
                    <span className="block text-sm text-gray-500">{item.detail}</span>
                </div>
            ))}
        </div>
    );
};

function MyOrders() {

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        axios.get(`${base_url}/cart/myorders`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        // setOrders([
        //     {
        //         _id: 1,
        //         date: '2021-09-01',
        //         status: 'ordered'
        //     },
        //     {
        //         _id: 2,
        //         date: '2021-09-02',
        //         status: 'shipped'
        //     },
        //     {
        //         _id: 3,
        //         date: '2021-09-03',
        //         status: 'delivered'
        //     }
        // ])

    }, []);

    // page of my orders each order will have order id , date of order, status of order

    return (

        
            orders.length === 0 ? <>
            
            <div className="flex flex-col items-center mt-16 bg-gray-100 p-8 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800">No Orders</h1>
            </div>

            </ >
            :


        <div className="flex flex-col items-center mt-8 bg-gray-100 p-8 min-h-screen">
            {orders.map((order, indx) => (
                <div key={indx} className="w-full max-w-4xl bg-white rounded-lg p-6 m-4 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-600 text-sm">
                            Order ID: <span className="font-medium">{order._id}</span>
                        </div>
                        <div className="text-gray-600 text-sm">
                            <div flex flex-col items-center justify-center>
                                <div >

                                    Date of Order: <span className="font-medium">

                                        {/* parse date from iso format */}
                                        {new Date(order.createdAt).toLocaleDateString()}


                                    </span>
                                </div>
                                <div >
                                    Time of Order: <span className="font-medium">
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                    </div>
                    {/* Order status timeline */}
                    <div className="mb-4">
                        <TimeLine status={order.status} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyOrders