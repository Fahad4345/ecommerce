"use client";
import { useState, useEffect } from "react";
import Navbar from "../../Components/NavBar";
import { GetCart } from "../../Api1/Cart/getCart";
import PlaceOrder from "../../Api1/Order/PlaceOrder";
import Image from "next/image";
import { API_BASE_URL } from "./../../Api1/apiUrl";
import Loader from "../../Components/loader";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";

export default function CheckoutPage() {
    const [selected, setSelected] = useState(false);
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useContext(MyContext);

    const [firstName, setFirstName] = useState("");
    const [company, setCompany] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleToggle = () => setSelected((prev) => !prev);

    useEffect(() => {

        fetchCart();
    }, []);
    useEffect(() => {
        if (user?.email) setEmail(user.email);
        fetchCart();
    }, [user]);

    const fetchCart = async () => {
        try {
            setIsLoading(true);
            const data = await GetCart();
            if (data && data.cart) {
                setCart(data.cart);
            }
        } catch (err) {
            console.error("Failed to load cart:", err);
            setError("Failed to load cart items");
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        setError("");

        if (!paymentMethod) {
            setError("Please select a payment method!");
            return false;
        }

        if (!firstName.trim() || !street.trim() || !city.trim() || !phone.trim() || !email.trim()) {
            setError("Please fill all required fields!");
            return false;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address!");
            return false;
        }


        if (phone.length < 10) {
            setError("Please enter a valid phone number!");
            return false;
        }

        return true;
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.itemId.price * item.quantity), 0);
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError("");

        try {

            let user = null;
            try {
                const userStr = localStorage.getItem("user");
                user = userStr ? JSON.parse(userStr) : null;
            } catch (parseError) {
                console.warn("Failed to parse user from localStorage:", parseError);
            }


            const orderData = {
                items: cart.map((item) => ({
                    productId: item.itemId._id,
                    name: item.itemId.name,
                    price: Number(item.itemId.price),
                    quantity: Number(item.quantity),
                })),
                total: calculateTotal(),
                paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Card",
                status: "Pending",
                customer: {
                    userId: user?._id || null,
                    firstName: firstName.trim(),
                    company: company.trim(),
                    address: `${street.trim()}${apartment.trim() ? `, ${apartment.trim()}` : ""}, ${city.trim()}`,
                    phone: phone.trim(),
                    email: email.trim().toLowerCase(),
                },
            };

            console.log("Order data being sent:", orderData);

            if (paymentMethod === "cod") {

                const response = await PlaceOrder(orderData);
                console.log("response", response);
                if (response && response.success !== false) {
                    localStorage.removeItem("CartItems");
                    localStorage.removeItem("CartLength");
                    resetForm();
                } else {
                    throw new Error("Failed to place order");
                }
            } else {

                const response = await fetch(
                    `${API_BASE_URL}/${`stripe/CreateSession`}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",

                        },
                        body: JSON.stringify(orderData),
                    }
                );

                console.log("Stripe response status:", response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Stripe API error response:", errorText);
                    throw new Error(`Server error: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                console.log("Stripe response data:", data);

                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.url) {

                    window.location.href = data.url;
                } else {
                    throw new Error("No checkout URL received from server");
                }
            }
        } catch (error) {
            console.error("Order placement error:", error);


            if (error.message.includes("Server error: 400")) {
                setError("Invalid order data. Please check your information and try again.");
            } else if (error.message.includes("Server error: 500")) {
                setError("Server error. Please try again later.");
            } else if (error.message.includes("Failed to fetch")) {
                setError("Network error. Please check your connection and try again.");
            } else {
                setError(error.message || "Something went wrong! Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFirstName("");
        setCompany("");
        setStreet("");
        setApartment("");
        setCity("");
        setPhone("");
        setEmail("");
        setPaymentMethod("");
        setSelected(false);
        setError("");
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className="mx-auto  mt-[80px] flex flex-col lg:flex-row gap-[173px]">

                <div className="flex-1">
                    <h1 className="font-[500] text-[36px] leading-[30px] tracking-[4%] font-[Poppins] mb-[48px]">
                        Billing Details
                    </h1>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-[32px]">
                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]   font-[400] text-[16px]  leading-[24px] font-[Poppins]">First Name*</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px] px-[16px] border-none outline-none"
                                placeholder="Enter your first name"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]  font-[400] text-[16px]  leading-[24px] font-[Poppins]">Company Name</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px] px-[16px] border-none outline-none"
                                placeholder="Enter company name (optional)"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]  font-[400] text-[16px]  leading-[24px] font-[Poppins]">Street Address*</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px] px-[16px] border-none outline-none"
                                placeholder="Enter your street address"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]  font-[400] text-[16px]  leading-[24px] font-[Poppins]">Apartment, floor (optional)</label>
                            <input
                                type="text"
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px] px-[16px] border-none outline-none"
                                placeholder="Apartment, suite, floor, etc."
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]  font-[400] text-[16px]  leading-[24px] font-[Poppins]">Town/City*</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px] px-[16px] border-none outline-none"
                                placeholder="Enter your city"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]  font-[400] text-[16px]  leading-[24px] font-[Poppins]">Phone Number*</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px] px-[16px] border-none outline-none"
                                placeholder="Enter your phone number"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]  font-[400] text-[16px]  leading-[24px] font-[Poppins]">Email Address*</label>
                            <input
                                type="email"

                                value={email || user?.email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full max-w-[470px] h-[50px] bg-[#F5F5F5] opacity-40% rounded-[4px] px-[16px] border-none outline-none"


                            />
                        </div>
                    </div>


                    <div className="flex gap-4 mt-[24px] items-center">
                        <label className="cursor-pointer flex items-center gap-4">
                            <input
                                type="checkbox"
                                checked={selected}
                                onChange={handleToggle}
                                className="hidden"
                                disabled={isLoading}

                            />
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-md transition 
                                ${selected ? "bg-[#DB4444]" : "bg-gray-200"}`}
                            >
                                {selected && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="font-[400] text-[16px] font-[Poppins]">
                                Save this information for faster check-out next time
                            </span>
                        </label>
                    </div>
                </div>


                <div className="flex-1 lg:ml-[50px] mt-[50px] lg:mt-[110px]">

                    <div className="space-y-4 mb-6">
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between w-full"
                            >
                                <div className="flex gap-[20px] items-center">
                                    <Image
                                        src={item.itemId.image[0]}
                                        width={54}
                                        height={54}
                                        alt={item.itemId.name}
                                        className="rounded"
                                    />
                                    <div>
                                        <h3 className="font-[400] text-[16px]  leading-[24px] font-[Poppins]">
                                            {item.itemId.name}
                                        </h3>

                                    </div>
                                </div>
                                <p className="font-[400] text-[16px] font-[Poppins]">
                                    ${(item.itemId.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>


                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">Subtotal:</span>
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#00000020]"></div>

                        <div className="flex justify-between items-center">
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">Shipping:</span>
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">Free</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#00000020]"></div>

                        <div className="flex justify-between items-center font-semibold">
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">Total:</span>
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">${calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>


                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="flex gap-4 items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bank"
                                    checked={paymentMethod === "bank"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-[20px] h-[20px]"
                                    disabled={isLoading}
                                />
                                <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">Bank/Card Payment</span>
                            </label>
                            <Image
                                src="/assets/icons/Bank.svg"
                                alt="Bank"
                                width={192}
                                height={28}
                            />
                        </div>

                        <label className="flex gap-4 items-center cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-[20px] h-[20px]"
                                disabled={isLoading}
                            />
                            <span className=" font-[400] text-[16px]  leading-[24px] font-[Poppins]">Cash on Delivery</span>
                        </label>
                    </div>


                    <button
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className={`w-full mt-8 text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] transition-colors
                        ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#DB4444] hover:bg-red-600 cursor-pointer'
                            }`}
                    >
                        {isLoading ? "Processing..." : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
}