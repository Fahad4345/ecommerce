"use client";
import { useState } from 'react';
import { Search, ShoppingCart, Heart, Mail, MapPin } from 'lucide-react';
import AdminNavBar from './../../Components/AdminNavBar';

export default function AdminUsersDashboard() {

    const [users] = useState([
        {
            _id: '1',
            Firstname: 'John',
            Lastname: 'Doe',
            email: 'john.doe@example.com',
            Addresse: '123 Main St, New York',
            cart: [{ itemId: '101', quantity: 2 }, { itemId: '102', quantity: 1 }],
            wishlist: ['201', '202', '203']
        },
        {
            _id: '2',
            Firstname: 'Jane',
            Lastname: 'Smith',
            email: 'jane.smith@example.com',
            Addresse: '456 Oak Ave, Los Angeles',
            cart: [{ itemId: '103', quantity: 1 }],
            wishlist: ['204', '205']
        },
        {
            _id: '3',
            Firstname: 'Mike',
            Lastname: 'Johnson',
            email: 'mike.j@example.com',
            Addresse: '789 Pine Rd, Chicago',
            cart: [],
            wishlist: ['206']
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        `${user.Firstname} ${user.Lastname} ${user.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className=" bg-gray-50 ">
            <AdminNavBar />
            <div className="max-w-7xl mx-auto mt-[40px]">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
                    <p className="text-gray-600">Total Users: {users.length}</p>
                </div>

                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Cart</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Wishlist</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">
                                            {user.Firstname} {user.Lastname}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                            {user.Addresse || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <ShoppingCart className="w-4 h-4 mr-1 text-blue-500" />
                                            <span className="font-semibold text-gray-900">
                                                {user.cart.length}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <Heart className="w-4 h-4 mr-1 text-red-500" />
                                            <span className="font-semibold text-gray-900">
                                                {user.wishlist.length}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No users found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}