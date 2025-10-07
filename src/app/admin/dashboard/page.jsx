"use client";

import AdminNavBar from './../../../Components/AdminNavBar';
import Guardwrapper from './../../../Components/Guardwrapper';
import AdminAllOrders from '../../../Api1/Order/AdminAllOrder';
import { GetDataByCategory } from '../../../Api1/getData';
import AdminAllUsers from '../../../Api1/getAllUsers';
import React, { useContext, useState, useEffect } from 'react';
import {
    Package, Users, CreditCard, Clock, CheckCircle, XCircle, RefreshCw, Truck, MapPin, Mail, Phone, ShoppingBag
} from 'lucide-react';
import Loader from '../../../Components/loader';
import Link from 'next/link';


export default function Dashboard() {
    const [UserLength, SetUserLength] = useState(0);
    const [ProductLength, SetProductLength] = useState(0);
    const [OrderLength, SetOrderLength] = useState(0);
    const [Orders, SetOrders] = useState([]);
    const [isLoading, SetisLoading] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusColor = (status) => {
        const colors = {
            Confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            Placed: 'bg-blue-100 text-blue-800 border-blue-200',
            Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            Processing: 'bg-purple-100 text-purple-800 border-purple-200',
            Shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            Delivered: 'bg-green-100 text-green-800 border-green-200',
            Cancelled: 'bg-red-100 text-red-800 border-red-200',
            Paid: 'bg-green-100 text-green-800 border-green-200',
            Failed: 'bg-red-100 text-red-800 border-red-200',
            Refunded: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                SetisLoading(true);
                const users = await AdminAllUsers();
                SetUserLength(users.length);

            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                SetisLoading(false);
            }
        };
        const fetchOrders = async () => {

            try {
                SetisLoading(true);
                const data = await AdminAllOrders();


                SetOrders(data);
                SetOrderLength(data.length)
            } catch (err) {
                console.log(err)
                setError('Network error. Please try again.');
            } finally {
                SetisLoading(false);
            }
        };
        const fetchItems = async () => {
            try {
                SetisLoading(true);

                const data = await GetDataByCategory();

                SetProductLength(data.item.length);
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                SetisLoading(false);
            }
        }
        fetchItems();
        fetchOrders();

        fetchUsers();
    }, []);


    const stats = [

        { title: 'Total Users', value: UserLength, change: '+8.2%', icon: Users, color: 'bg-green-500', path: "/admin/dashboard/adminUser" },
        { title: 'Total Products', value: ProductLength, change: '+3.1%', icon: Package, color: 'bg-purple-500', path: "/admin/dashboard/viewProducts" },
        { title: 'Total Orders', value: OrderLength, change: '+15.3%', icon: ShoppingBag, color: 'bg-orange-500', path: "/admin/dashboard/adminOrder" }
    ];

    if (isLoading) {
        return <>  <AdminNavBar /><Loader /></>
    }



    return (
        <Guardwrapper><div className=' bg-white flex justify-center items-center flex-col'>
            <AdminNavBar />
            <div className="w-[1170px]">



                <div className=" p-8">

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600 mt-1">Welcome back, Admin!</p>
                        </div>
                        <div className="flex gap-3">

                        </div>
                    </div>



                    <div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, idx) => (
                                <Link key={idx} href={`${stat.path}`}>
                                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`${stat.color} p-3 rounded-lg`}>
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>

                                        </div>
                                        <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                                        <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                                    </div></Link>
                            ))}
                        </div>


                        <div className="space-y-4">
                            {Orders.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                                    <Package className="mx-auto mb-4 text-slate-400" size={64} />
                                    <p className="text-slate-600 text-lg">No orders found</p>

                                </div>
                            ) : (
                                Orders.slice(0, 5).map((order) => (
                                    <div key={order._id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                                        <div
                                            className="p-6 cursor-pointer hover:bg-slate-50 transition"
                                            onClick={() => toggleExpand(order._id)}
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                        <h3 className="text-lg font-semibold text-slate-800">
                                                            Order #{order._id?.slice(-8)}
                                                        </h3>
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>

                                                            {order.orderStatus}
                                                        </span>
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.paymentStatus)}`}>

                                                            {order.paymentStatus}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                                        <span className="flex items-center gap-1">
                                                            <Users size={14} />
                                                            {order.customer.firstName}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Mail size={14} />
                                                            {order.customer.email}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            {formatDate(order.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-slate-800">${order.total.toFixed(2)}</p>
                                                    <p className="text-sm text-slate-600">{order.items.length} item</p>
                                                </div>
                                            </div>
                                        </div>

                                        {expandedOrder === order._id && (
                                            <div className="border-t border-slate-200 bg-slate-50 p-6">
                                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                                    <div>
                                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                                            <Users size={18} />
                                                            Customer Information
                                                        </h4>
                                                        <div className="space-y-2 text-sm">
                                                            <p className="text-slate-700"><span className="font-medium">Name:</span> {order.customer.firstName}</p>
                                                            <p className="text-slate-700 flex items-center gap-2">
                                                                <Mail size={14} />
                                                                {order.customer.email}
                                                            </p>
                                                            {order.customer.phone && (
                                                                <p className="text-slate-700 flex items-center gap-2">
                                                                    <Phone size={14} />
                                                                    {order.customer.phone}
                                                                </p>
                                                            )}
                                                            {order.customer.address && (
                                                                <p className="text-slate-700 flex items-start gap-2">
                                                                    <MapPin size={14} className="mt-1" />
                                                                    <span>{order.customer.address}</span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                                            <CreditCard size={18} />
                                                            Payment Details
                                                        </h4>
                                                        <div className="space-y-2 text-sm">
                                                            <p className="text-slate-700"><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                                                            <p className="text-slate-700"><span className="font-medium">Status:</span> {order.paymentStatus}</p>
                                                            {order.paymentId && (
                                                                <p className="text-slate-700 break-all"><span className="font-medium">Payment ID:</span> {order.paymentId}</p>
                                                            )}
                                                            {order.sessionId && (
                                                                <p className="text-slate-700 break-all"><span className="font-medium">Session ID:</span> {order.sessionId}</p>
                                                            )}
                                                            {order.refundId && (
                                                                <p className="text-slate-700"><span className="font-medium">Refund ID:</span> {order.refundId}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                                        <Package size={18} />
                                                        Order Items
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                                                                <div>
                                                                    <p className="font-medium text-slate-800">{item.name}</p>
                                                                    <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="font-semibold text-slate-800">${item.price.toFixed(2)}</p>
                                                                    <p className="text-sm text-slate-600">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-6 pt-4 border-t border-slate-300">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-lg font-semibold text-slate-800">Order Total</span>
                                                        <span className="text-2xl font-bold text-blue-600">${order.total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>



                </div>
            </div>






        </div></Guardwrapper>
    )
}













