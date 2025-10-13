"use client";
import { useEffect, useState } from 'react';
import { Search, ShoppingCart, Heart, Mail, MapPin, Trash } from 'lucide-react';
import AdminNavBar from '../../../../Components/AdminNavBar';
import AdminAllUsers from './../../../../Api1/getAllUsers';
import Guardwrapper from '../../../../Components/Guardwrapper';
import { showToast } from './../../../../Components/toast';
import { useAuth } from './../../../../Api1/useAuth';
import { fetchOrders } from '../../../../Api1/Order/GetOrder';

export default function AdminUsersDashboard() {
    const { DeleteUser } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await AdminAllUsers();


                const usersWithOrderCounts = await Promise.all(
                    users.map(async (user) => {
                        try {
                            const data = await fetchOrders(user._id);
                            return {
                                ...user,
                                orderCount: Array.isArray(data) ? data.length : 0
                            };
                        } catch (err) {
                            console.error(`Error fetching orders for ${user._id}:`, err.message);
                            return { ...user, orderCount: 0 };
                        }
                    })
                );

                setUsers(usersWithOrderCounts);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const res = await DeleteUser(id)
        if (res) {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
            users.filter((user) => user._id === users._id)
            showToast("User Deleted", "sucess");

        } else {
            showToast("Failed to delete user", "error");
        }

    }
    const [users, setUsers] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        `${user.Firstname} ${user.Lastname} ${user.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <Guardwrapper>
            <div className=" bg-gray-50 ">
                <AdminNavBar />
                <div className="max-w-7xl mx-auto mt-[40px]">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-[Poppins] text-gray-900 mb-2">Users Management</h1>
                        <p className="text-gray-600 font-[Poppins]">Total Users: {users.length}</p>
                    </div>

                    <div className="mb-6 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-[Poppins] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border font-[Poppins] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold font-[Poppins] text-gray-700">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold font-[Poppins] text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold font-[Poppins] text-gray-700">Orders</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold font-[Poppins] text-gray-700">Cart</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold font-[Poppins] text-gray-700">Wishlist</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold font-[Poppins] text-gray-700">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-medium font-[Poppins] text-gray-900">
                                                {user.Firstname} {user.Lastname}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="w-4 h-4 mr-2 text-gray-400 font-[Poppins]" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2 text-gray-400 font-[Poppins]" />
                                                {user.orderCount ?? 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <ShoppingCart className="w-4 h-4 mr-1 text-blue-500" />
                                                <span className="font-semibold text-gray-900 font-[Poppins]">
                                                    {user.cart.length}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <Heart className="w-4 h-4 mr-1 text-red-500" />
                                                <span className="font-semibold text-gray-900 font-[Poppins]">
                                                    {user.wishlist.length}
                                                </span>
                                            </div>
                                        </td><td className="px-6 py-4">
                                            <div onClick={() => handleDelete(user._id)} className="flex items-center justify-center">
                                                <Trash className="w-4 h-4 mr-1 text-red-500" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="text-center  font-[Poppins] py-12 text-gray-500">
                                No users found matching your search.
                            </div>
                        )}
                    </div>
                </div>
            </div></Guardwrapper>
    );
}