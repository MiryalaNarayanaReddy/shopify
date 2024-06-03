import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../helper";


function OrderCard({ order }) {
    const types = ["ordered", "shipped", "delivered"]; // Define order types
    const currentType = types.indexOf(order.status);

    const changeStatus = (newStatus) => {
        axios.post(`${base_url}/cart/update`, {
            cart_id: order._id,
            status: newStatus,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(
            (res) => {
                console.log(res);
                alert("Status updated");
                window.location.reload();   // Reload the page
            }
        ).catch(
            (err) => {
                console.error(err);
                alert("Failed to update status");
            }
        );
    }

    return (
        <div className="bg-white p-4 m-4 rounded-md shadow-md">
            <h1 className="text-xl font-bold">Order ID: {order._id}</h1>
            <h1 className="text-lg mt-2 mb-2">Status: {order.status}</h1>
            <div className="flex justify-between items-center">
                <button
                    disabled={currentType === 0}
                    onClick={() => changeStatus("ordered")}
                    className={`p-2 rounded-md ${currentType === 0 ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                    Ordered
                </button>
                <div className="border-l h-6"></div>
                <button
                    disabled={currentType === 1}
                    onClick={() => changeStatus("shipped")}
                    className={`p-2 rounded-md ${currentType === 1 ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                    Shipped
                </button>
                <div className="border-l h-6"></div>
                <button
                    disabled={currentType === 2}
                    onClick={() => changeStatus("delivered")}
                    className={`p-2 rounded-md ${currentType === 2 ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                    Delivered
                </button>
            </div>
        </div>
    );
}


function ViewAllOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        axios.get(`${base_url}/cart/all`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then((res) => {
            setOrders(res.data);
        },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }, []);


    return (
        <div>
           {
            orders.length > 0 ? orders.map((order) => (
                <OrderCard key={order._id} order={order} />
            )) : <h1>No orders found</h1>
           }
        </div>
    );
}




export default ViewAllOrders;