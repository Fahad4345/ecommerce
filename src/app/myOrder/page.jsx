"use client";
import React, { useEffect, useState } from 'react';
import Navbar from './../../Components/NavBar';
import useCustomerOrders from "../../Api1/Order/GetOrder";
import cancelOrder from "./../../Api1/Order/CancelOrder"

function MyOrdersPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser.id); console.log("User", user);
    }, []);

    const { orders, loading, error } = useCustomerOrders(user);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'text-green-600 bg-green-100';
            case 'shipped':
                return 'text-blue-600 bg-blue-100';
            case 'processing':
                return 'text-yellow-600 bg-yellow-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
                <div className="flex flex-col justify-center items-center h-96">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                    </div>
                    <p className="mt-4 text-lg text-gray-600 font-medium">Loading your orders...</p>
                    <p className="text-sm text-gray-500">This may take a moment</p>
                </div>
            </div>
        );
    }



    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-8">
                            <div className="text-8xl">📦</div>
                            <div className="absolute -top-2 -right-2 text-4xl">✨</div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                        <p className="text-xl text-gray-600 mb-2">Your order history is waiting to be filled!</p>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Discover amazing products and start your shopping journey with us today.</p>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                            🛍️ Start Shopping Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <div className="max-w-6xl mx-auto p-6">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
                    <p className="text-lg text-gray-600">Track and manage your recent purchases</p>
                    <div className="flex items-center mt-4 space-x-4">
                        <span className="text-sm text-gray-500">Total Orders:</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {orders.length}
                        </span>
                    </div>
                </div>

                <div className="space-y-8">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >

                            <div className="border-b border-gray-200 p-8 bg-gradient-to-r from-white to-blue-50 rounded-t-2xl">
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <h2 className="text-2xl font-bold text-gray-800">
                                                Order #{order._id.slice(-8)}
                                            </h2>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        </div>
                                        {order.createdAt && (
                                            <p className="text-gray-600 flex items-center space-x-2">
                                                <span>📅</span>
                                                <span>Placed on {formatDate(order.createdAt)}</span>
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col lg:items-end gap-4">
                                        <span
                                            className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.orderStatus)} ring-2 ring-current ring-opacity-20`}
                                        >
                                            {order.orderStatus === 'Delivered' && '✅ '}
                                            {order.orderStatus === 'Shipped' && '🚚 '}
                                            {order.orderStatus === 'Processing' && '⏳ '}
                                            {order.orderStatus}
                                        </span>
                                        <div className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                            ${order.total.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-6 mb-8">

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Payment Details</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Status:</span>
                                                <span className={`ml-2 px-2 py-1 rounded text-xs ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </p>
                                            <p className="text-sm text-gray-600 mt-2">
                                                <span className="font-medium">Method:</span> {order.paymentMethod}
                                            </p>
                                        </div>
                                    </div>


                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Order Summary</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Items ({order.items.length})</span>
                                                <span className="text-sm font-medium">${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                                                <span className="font-semibold text-gray-800">Total</span>
                                                <span className="font-bold text-lg text-gray-800">${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
                                        <span>📦</span>
                                        <span>Order Items ({order.items.length})</span>
                                    </h3>
                                    <div className="grid gap-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 group">
                                                <div className="flex items-center space-x-6">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                                            <span className="text-white font-bold text-xl">
                                                                {item.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">{item.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-gray-600 flex items-center space-x-2">
                                                            <span>Qty:</span>
                                                            <span className="font-semibold">{item.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <p className="font-bold text-xl text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                        ${item.price.toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-4">

                                        <button onClick={() => cancelOrder(order._id)} className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer">
                                            <span>📄</span>
                                            <span>Cancel Order</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyOrdersPage;
