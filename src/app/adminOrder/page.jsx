"use client";
import { useState, useEffect } from 'react';
import { Package, User, CreditCard, Clock, CheckCircle, XCircle, RefreshCw, Truck, MapPin, Mail, Phone } from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavBar';
import Loader from '../../Components/loader';

export default function OrdersDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                setError('Failed to fetch orders');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
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

    const getStatusIcon = (status) => {
        const icons = {
            Placed: <Package size={16} />,
            Pending: <Clock size={16} />,
            Processing: <RefreshCw size={16} />,
            Shipped: <Truck size={16} />,
            Delivered: <CheckCircle size={16} />,
            Cancelled: <XCircle size={16} />
        };
        return icons[status] || <Package size={16} />;
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
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
        placed: orders.filter(o => o.orderStatus === 'Placed').length,
        processing: orders.filter(o => o.orderStatus === 'Processing').length,
        shipped: orders.filter(o => o.orderStatus === 'Shipped').length,
        delivered: orders.filter(o => o.orderStatus === 'Delivered').length
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <div>
            <AdminNavbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">Orders Management</h1>
                        <p className="text-slate-600">Manage and track all customer orders</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                            <p className="text-slate-600 text-sm mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-slate-800">{orderStats.total}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
                            <p className="text-blue-600 text-sm mb-1">Placed</p>
                            <p className="text-2xl font-bold text-blue-800">{orderStats.placed}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-200">
                            <p className="text-purple-600 text-sm mb-1">Processing</p>
                            <p className="text-2xl font-bold text-purple-800">{orderStats.processing}</p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg shadow-sm border border-indigo-200">
                            <p className="text-indigo-600 text-sm mb-1">Shipped</p>
                            <p className="text-2xl font-bold text-indigo-800">{orderStats.shipped}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
                            <p className="text-green-600 text-sm mb-1">Delivered</p>
                            <p className="text-2xl font-bold text-green-800">{orderStats.delivered}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 p-4">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                All Orders
                            </button>
                            {['Placed', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg transition ${filter === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                                <Package className="mx-auto mb-4 text-slate-400" size={64} />
                                <p className="text-slate-600 text-lg">No orders found</p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order._id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                    <div
                                        className="p-6 cursor-pointer hover:bg-slate-50 transition"
                                        onClick={() => toggleExpand(order._id)}
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-slate-800">
                                                        Order #{order._id?.slice(-8)}
                                                    </h3>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                                                        {getStatusIcon(order.orderStatus)}
                                                        {order.orderStatus}
                                                    </span>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.paymentStatus)}`}>
                                                        <CreditCard size={14} />
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
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-slate-800">${order.total.toFixed(2)}</p>
                                                <p className="text-sm text-slate-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
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
                                                        <p className="text-slate-700 flex items-center gap-2">
                                                            <Phone size={14} />
                                                            {order.customer.phone}
                                                        </p>
                                                        <p className="text-slate-700 flex items-start gap-2">
                                                            <MapPin size={14} className="mt-1" />
                                                            <span>{order.customer.address}</span>
                                                        </p>
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
                                                            <p className="text-slate-700"><span className="font-medium">Payment ID:</span> {order.paymentId}</p>
                                                        )}
                                                        {order.sessionId && (
                                                            <p className="text-slate-700"><span className="font-medium">Session ID:</span> {order.sessionId}</p>
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
    );
}