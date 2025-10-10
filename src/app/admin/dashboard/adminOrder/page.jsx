"use client";
import { useState, useEffect, useContext } from 'react';
import { Package, User, CreditCard, Clock, CheckCircle, XCircle, RefreshCw, Truck, MapPin, Mail, Phone } from 'lucide-react';
import AdminAllOrders from '../../../../Api1/Order/AdminAllOrder';
import AdminNavBar from '../../../../Components/AdminNavBar';
import Guardwrapper from '../../../../Components/Guardwrapper';
import Loader from '../../../../Components/Guardwrapper';
import { MyContext } from './../../../../context/MyContext';
import cancelOrder from '../../../../Api1/Order/CancelOrder';
import { updateOrderStatus } from '../../../../Api1/Order/UpdateStatus';



export default function OrdersDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const handleAcceptOrder = async (orderId) => {
        await updateOrderStatus(orderId, "Confirmed")
        setOrders((prevOrders) => {
            return prevOrders.map((order) => {
                if (order._id === orderId) {

                    return { ...order, orderStatus: "Confirmed" };
                }
                return order;
            });
        });
    };
    const handleDeclineOrder = (orderId) => {
        setOrders((prevOrders) => {
            return prevOrders.map((order) => {
                if (order._id === orderId) {

                    return { ...order, orderStatus: "Cancelled" };
                }
                return order;
            });
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await AdminAllOrders();


                setOrders(data);
                console.log("Orders", data);

            } catch (err) {
                console.log(err)
                setError('Network error. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

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



    const uniqueStatuses = [...new Set(orders.map(order => order.orderStatus))].sort();

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true
        return order.orderStatus.toLowerCase() === filter.toLowerCase();
    });

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
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


    const orderStats = {
        total: orders.length,
        ...uniqueStatuses.reduce((acc, status) => {
            acc[status.toLowerCase()] = orders.filter(o => o.orderStatus === status).length;
            return acc;
        }, {})
    };

    if (loading) {
        return (<>
            <AdminNavBar />
            <Loader /></>
        );
    }

    return (
        <Guardwrapper>
            <div className=" bg-gradient-to-br">
                <AdminNavBar />
                <div className="max-w-7xl mx-auto mt-[40px]">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">Orders Management</h1>
                        <p className="text-slate-600">Manage and track all customer orders</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                            {error}
                        </div>
                    )}


                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 p-4">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'all'
                                    ? 'bg-[#DB4444] text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                All Orders ({orders.length})
                            </button>
                            {uniqueStatuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${filter === status
                                        ? 'bg-[#DB4444] text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >

                                    {status} ({orderStats[status.toLowerCase()] || 0})
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                                <Package className="mx-auto mb-4 text-slate-400" size={64} />
                                <p className="text-slate-600 text-lg">No orders found</p>
                                <p className="text-slate-500 text-sm mt-2">
                                    {filter !== 'all' ? `No orders with status "${filter}"` : 'Start by creating your first order'}
                                </p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order._id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                                    <div
                                        className="p-6 cursor-pointer hover:bg-slate-50 transition"
                                        onClick={() => toggleExpand(order._id)}
                                    >
                                        <div className="flex flex-wrap items-start justify-between ">
                                            <div className="flex-1 max-w-[600px] ">
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
                                                        <User size={14} />
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
                                            {["all", "Placed"].includes(filter) && (
                                                <div className='flex gap-[10px]'>
                                                    {order.orderStatus === "Confirmed" ? (
                                                        <span className="bg-green-100 text-green-700 px-[20px] py-[5px] rounded-[4px] font-semibold">
                                                            Accepted
                                                        </span>
                                                    ) : order.orderStatus === "Cancelled" ? (
                                                        <span className="bg-red-100 text-red-700 px-[20px] py-[5px] rounded-[4px] font-semibold">
                                                            Declined
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleDeclineOrder(order._id)}
                                                                className='bg-[#DB4444] text-white px-[20px] py-[5px] rounded-[4px]'
                                                            >
                                                                Decline
                                                            </button>
                                                            <button
                                                                onClick={() => handleAcceptOrder(order._id)}
                                                                className='bg-green-500 text-white px-[20px] py-[5px] rounded-[4px]'
                                                            >
                                                                Accept
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            <div className="text-right w-[200px]">
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
                                                        <User size={18} />
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
            </div></Guardwrapper>
    );
}