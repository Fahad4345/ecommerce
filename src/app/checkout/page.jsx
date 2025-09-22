"use client";
import { useState, useEffect } from "react";
import Navbar from "../../Components/NavBar";
import { GetCart } from "../../Api1/Cart/getCart";
import PlaceOrder from "../../Api1/Order/PlaceOrder";
import Image from "next/image";


export default function CheckoutPage() {
    const [selected, setSelected] = useState(false);
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");


    const [firstName, setFirstName] = useState("");
    const [company, setCompany] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleToggle = () => setSelected((prev) => !prev);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await GetCart();
                if (data && data.cart) {
                    setCart(data.cart);
                }
            } catch (err) {
                console.error("Failed to load cart:", err);
            }
        }
        fetchCart();
    }, []);

    const handlePlaceOrder = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method!");
            return;
        }

        if (!firstName || !street || !city || !phone || !email) {
            alert("Please fill all required fields!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const orderData = {
            items: cart.map((item) => ({
                productId: item.itemId._id,
                name: item.itemId.name,
                price: item.itemId.price,
                quantity: item.quantity,
            })),
            total: cart.reduce(
                (acc, item) => acc + item.itemId.price * item.quantity,
                0
            ),
            paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Bank",
            status: "Pending",
            customer: {
                userId: user?.id,
                firstName,
                company,
                address: `${street}${apartment ? `, ${apartment}` : ""}, ${city}`,
                phone,
                email,
            },
        };

        try {
            if (paymentMethod === "cod") {
                // ✅ COD flow: Directly place order
                const response = await PlaceOrder(orderData);

                alert("Order placed successfully (Cash on Delivery)!");
                console.log("Order response:", response);

                // reset fields
                resetForm();
            } else {
                // ✅ Bank flow: create Checkout Session
                const res = await fetch(
                    "http://localhost:3001/stripe/CreateSession",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(orderData),
                    }
                );

                const data = await res.json();
                console.log("Order response:", data.url);

                if (data.url) {
                    // redirect to Stripe checkout
                    window.location.href = data.url;
                } else {
                    alert("Failed to start payment session");
                }
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
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
    };


    return (
        <div className="bg-white h-full flex flex-col justify-center items-center">
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className="mx-[135px] mt-[80px] flex flex-row">

                <div>
                    <h1 className="font-[500] text-[36px] leading-[30px] tracking-[4%] font-[Poppins]">
                        Billing Details
                    </h1>
                    <div className="flex flex-col gap-[32px] mt-[48px]">
                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">First Name*</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">Company Name</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">Street Address*</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="text"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">Apartment, floor (optional)</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="text"
                                    value={apartment}
                                    onChange={(e) => setApartment(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">Town/City*</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">Phone Number*</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <label className="opacity-[40%]">Email Address*</label>
                            <div className="w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-[10px] py-[10px]"
                                />
                            </div>
                        </div>
                    </div>


                    <div className="flex gap-[16] mt-[24px] items-center">
                        <div className="flex gap-4">
                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={handleToggle}
                                    className="hidden cursor-pointer"
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
                            </label>
                        </div>
                        <h1 className="font-[400] text-[16px] font-[Poppins]">
                            Save this information for faster check-out next time
                        </h1>
                    </div>
                </div>

                <div className="ml-[173px] mt-[110px]">
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center min-w-[425px] w-full justify-between "
                        >
                            <div className="flex gap-[20px] items-center">
                                <Image
                                    src={item.itemId.image[0]}
                                    width={54}
                                    height={54}
                                    alt={item.itemId.name}
                                />
                                <h1 className="font-[400] text-[16px] font-[Poppins]">
                                    {item.itemId.name}
                                </h1>
                            </div>
                            <h1 className="font-[400] text-[16px] font-[Poppins]">
                                {item.itemId.price}
                            </h1>
                        </div>
                    ))}


                    <div className="mt-[24px]">
                        <div className="flex justify-between">
                            <h1>Subtotal:</h1>
                            <h1>
                                $
                                {cart.reduce(
                                    (acc, item) => acc + item.itemId.price * item.quantity,
                                    0
                                )}
                            </h1>
                        </div>
                        <div className="w-full h-[1px] bg-[#00000080] mt-[16px]"></div>
                    </div>

                    <div className="mt-[16px]">
                        <div className="flex justify-between">
                            <h1>Shipping:</h1>
                            <h1>Free</h1>
                        </div>
                        <div className="w-full h-[1px] bg-[#00000080] mt-[16px]"></div>
                    </div>

                    <div className="mt-[16px]">
                        <div className="flex justify-between">
                            <h1>Total:</h1>
                            <h1>
                                $
                                {cart.reduce(
                                    (acc, item) => acc + item.itemId.price * item.quantity,
                                    0
                                )}
                            </h1>
                        </div>
                    </div>


                    <div className="flex justify-between mt-[34px]">
                        <div className="flex gap-[16px] items-center">
                            <input
                                type="radio"
                                name="payment"
                                value="bank"
                                checked={paymentMethod === "bank"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-[24px] h-[24px] cursor-pointer"
                            />
                            <label>Bank</label>
                        </div>
                        <Image
                            src="/assets/icons/Bank.svg"
                            alt="Bank"
                            width={192}
                            height={28}
                        />
                    </div>

                    <div className="flex gap-[16px] mt-[32px] items-center">
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-[24px] h-[24px] cursor-pointer"
                        />
                        <label>Cash on Delivery</label>
                    </div>

                    {/* Place Order */}
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-[#DB4444] mt-[32px] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] cursor-pointer"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
