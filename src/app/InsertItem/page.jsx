"use client";
import { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import AdminNavBar from './../../Components/AdminNavBar';

export default function AddItemForm() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        discount: '',
        discountPrice: '',
        color: [],
        sizes: [],
        review: '',
        rating: '',
        image: []
    });

    const [colorInput, setColorInput] = useState('');
    const [imageInput, setImageInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const categories = ['Phones', 'Computers', 'SmartWatch', 'Camera', 'HeadPhones', 'Gaming'];
    const sizeOptions = ['Sm', 'Md', 'Lg', 'Xl'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeToggle = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const addColor = () => {
        if (colorInput.trim()) {
            setFormData(prev => ({
                ...prev,
                color: [...prev.color, colorInput.trim()]
            }));
            setColorInput('');
        }
    };

    const removeColor = (index) => {
        setFormData(prev => ({
            ...prev,
            color: prev.color.filter((_, i) => i !== index)
        }));
    };

    const addImage = () => {
        if (imageInput.trim()) {
            setFormData(prev => ({
                ...prev,
                image: [...prev.image, imageInput.trim()]
            }));
            setImageInput('');
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Prepare data for submission
        const submitData = {
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            description: formData.description,
            image: formData.image,
            ...(formData.discount && { discount: parseFloat(formData.discount) }),
            ...(formData.discountPrice && { discountPrice: parseFloat(formData.discountPrice) }),
            ...(formData.color.length > 0 && { color: formData.color }),
            ...(formData.sizes.length > 0 && { sizes: formData.sizes }),
            ...(formData.review && { review: parseFloat(formData.review) }),
            ...(formData.rating && { rating: parseFloat(formData.rating) })
        };

        try {
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Item added successfully!' });
                // Reset form
                setFormData({
                    name: '',
                    category: '',
                    price: '',
                    description: '',
                    discount: '',
                    discountPrice: '',
                    color: [],
                    sizes: [],
                    review: '',
                    rating: '',
                    image: []
                });
            } else {
                const error = await response.json();
                setMessage({ type: 'error', text: error.message || 'Failed to add item' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AdminNavBar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Add New Item</h1>
                        <p className="text-slate-600 mb-8">Fill in the details to add a new product to inventory</p>

                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter product name"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price & Discount */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Discount Price */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Discount Price
                                </label>
                                <input
                                    type="number"
                                    name="discountPrice"
                                    value={formData.discountPrice}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0.00"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter product description"
                                />
                            </div>

                            {/* Colors */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Colors
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={colorInput}
                                        onChange={(e) => setColorInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter color"
                                    />
                                    <button
                                        type="button"
                                        onClick={addColor}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.color.map((color, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {color}
                                            <button type="button" onClick={() => removeColor(index)} className="hover:text-blue-600">
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Sizes
                                </label>
                                <div className="flex gap-2">
                                    {sizeOptions.map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => handleSizeToggle(size)}
                                            className={`px-4 py-2 rounded-lg border-2 transition ${formData.sizes.includes(size)
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'border-slate-300 text-slate-700 hover:border-blue-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Image URLs *
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="url"
                                        value={imageInput}
                                        onChange={(e) => setImageInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter image URL"
                                    />
                                    <button
                                        type="button"
                                        onClick={addImage}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Upload size={20} />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.image.map((img, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                                            <span className="flex-1 text-sm text-slate-600 truncate">{img}</span>
                                            <button type="button" onClick={() => removeImage(index)} className="text-red-600 hover:text-red-700">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review & Rating */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Review Count
                                    </label>
                                    <input
                                        type="number"
                                        name="review"
                                        value={formData.review}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Rating
                                    </label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.0"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Adding Item...' : 'Add Item'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}