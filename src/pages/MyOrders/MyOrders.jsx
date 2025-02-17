import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { Store } from '../../context/storeContext';
import axios from "axios";
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(Store);
    const [data, setData] = useState([]); 

    const fetchOrders = async () => { 
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
            // console.log(response.data.data) 
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2> 
            <div className='container'>
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="Order Parcel Icon" />
                        <p>{order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}</p>
                        <p>₹{order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
