"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import AdminNavBar from "../../../../../Components/AdminNavBar";
import { API_BASE_URL } from "../../../../../Api1/apiUrl";
import { showToast } from "../../../../../Components/toast";
import { useRouter } from "next/navigation";
import Guardwrapper from "../../../../../Components/Guardwrapper";
import { fetchWithAuth } from "../../../../../Api1/fetchWithAuth";
export default function AddItemForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        discount: "",
        color: [],
        sizes: [],
        review: "",
        rating: "",
        image: [],
    });

    const [colorInput, setColorInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const categories = ["All", "Phones", "Computers", "SmartWatch", "Gaming", "Camera", "Men Fashion", "Women Fashion", "Medicine"];
    const sizeOptions = ["Sm", "Md", "Lg", "Xl"];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSizeToggle = (size) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    const addColor = () => {
        if (colorInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                color: [...prev.color, colorInput.trim()],
            }));
            setColorInput("");
        }
    };

    const removeColor = (index) => {
        setFormData((prev) => ({
            ...prev,
            color: prev.color.filter((_, i) => i !== index),
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = formData.image.length + files.length;

        if (totalFiles > 5) {
            showToast("You can upload a maximum of 5 images.", "success");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...files],
        }));
    };


    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.image.length === 0) {
            showToast("Please upload at least one image.", "error");
            return;
        }

        if (formData.image.length > 5) {
            showToast("You can upload a maximum of 5 images.", "error");
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const formDataToSend = new FormData();

            formDataToSend.append("name", formData.name);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("description", formData.description);
            if (formData.discount) formDataToSend.append("discount", formData.discount);
            if (formData.review) formDataToSend.append("review", formData.review);
            if (formData.rating) formDataToSend.append("rating", formData.rating);

            formData.color.forEach((c) => formDataToSend.append("color", c));
            formData.sizes.forEach((s) => formDataToSend.append("sizes", s));
            formData.image.forEach((file) => formDataToSend.append("images", file));

            // 🚫 DO NOT manually set Content-Type — browser sets it automatically for FormData
            const response = await fetchWithAuth(`/item/Insert`, {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                const result = await response.json();
                showToast("Item added successfully!", "success");
                router.push("/admin/dashboard/viewProducts");

                setFormData({
                    name: "",
                    category: "",
                    price: "",
                    description: "",
                    discount: "",
                    color: [],
                    sizes: [],
                    review: "",
                    rating: "",
                    image: [],
                });
            } else {
                const error = await response.json();
                showToast(error.message || "Failed to add item", "error");
            }
        } catch (err) {
            console.error("Error:", err);
            showToast("Network error. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Guardwrapper>
            <div>
                <AdminNavBar />

                <div className="min-h-screen py-12 px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                Add New Item
                            </h1>
                            <p className="text-slate-600 mb-8">
                                Fill in the details to add a new product to inventory
                            </p>

                            {/* {message.text && (
                            <div
                                className={`mb-6 p-4 rounded-lg ${message.type === "success"
                                    ? "bg-green-50 text-green-800 border border-green-200"
                                    : "bg-red-50 text-red-800 border border-red-200"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )} */}

                            <form onSubmit={handleSubmit} className="space-y-6">

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


                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2  cursor-pointer border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option className="curs " key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>


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


                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Colors
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={colorInput}
                                            onChange={(e) => setColorInput(e.target.value)}
                                            onKeyPress={(e) =>
                                                e.key === "Enter" && (e.preventDefault(), addColor())
                                            }
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter color"
                                        />
                                        <button
                                            type="button"
                                            onClick={addColor}
                                            className="px-4 py-2 cursor-pointer bg-[#DB4444] text-white rounded-lg transition"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.color.map((color, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                            >
                                                {color}
                                                <button
                                                    type="button"
                                                    onClick={() => removeColor(index)}
                                                    className="text-black cursor-pointer"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Sizes
                                    </label>
                                    <div className="flex gap-2">
                                        {sizeOptions.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => handleSizeToggle(size)}
                                                className={`px-4 py-2 rounded-lg  cursor-pointer border-2 transition ${formData.sizes.includes(size)
                                                    ? "bg-[#DB4444] text-white"
                                                    : "border-slate-300 text-black bg-white"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                                <div>

                                    <div className="border-2 rounded-[4px]  mb-[20px] ">

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple

                                            onChange={handleFileChange}
                                            disabled={formData.image.length >= 5}
                                            className="px-[10px] py-[10px] w-full"
                                        />
                                    </div>


                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {formData.image.map((file, index) => (
                                            <div
                                                key={index}
                                                className="relative bg-slate-50 rounded-lg overflow-hidden shadow"
                                            >
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="preview"
                                                    className="w-full h-32 object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-600 shadow hover:bg-red-50"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>



                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#DB4444] text-white py-3 px-6 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Adding Item..." : "Add Item"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div></Guardwrapper>
    );
}
