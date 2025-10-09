"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../Components/NavBar";
import { SendEmail } from "../../Api1/sendEmail";
import { showToast } from "./../../Components/toast";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setEmail(user.email);
            setName(user.Firstname);
        }
    }, []);

    const handleSend = async () => {
        if (!email || !name || !message) {
            showToast("Please enter all fields", "error");
            return;
        }

        try {
            setIsSending(true);
            await SendEmail(name, email, message);



            setMessage("");
            setPhone("");
        } catch (err) {
            console.error("SendEmail error:", err);
            showToast("Failed to send message", "error");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-white h-full flex flex-col justify-center items-center">
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <div className="flex flex-row gap-[30px] mt-[80px] mx-[135px]">

                <div className="flex max-w-[340px] flex-col px-[35px] pt-[40px] pb-[51px] gap-[32px] shadow-[0px_1px_13px_0px_#0000000D]">
                    <div className="flex flex-col gap-[24px] w-full">
                        <div className="flex gap-[16px] items-center">
                            <div className="flex items-center justify-center max-w-[40px] w-full min-h-[40px] bg-[#DB4444] rounded-full">
                                <Image src="/assets/icons/Dial.svg" width={20} height={20} alt="Phone" />
                            </div>
                            <div className="font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]">
                                Call To Us
                            </div>
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <h1 className="font-[Poppins] text-[14px]">We are available 24/7, 7 days a week.</h1>
                            <h1 className="font-[Poppins] text-[14px]">Phone: +8801611112222</h1>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-[#000000]/50"></div>

                    <div className="flex flex-col gap-[24px] w-full">
                        <div className="flex gap-[16px] items-center">
                            <div className="flex items-center justify-center max-w-[40px] w-full min-h-[40px] bg-[#DB4444] rounded-full">
                                <Image src="/assets/icons/Dial.svg" width={20} height={20} alt="Phone" />
                            </div>
                            <div className="font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]">
                                Write To Us
                            </div>
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <h1 className="font-[Poppins] text-[14px]">
                                Fill out our form and we will contact you within 24 hours.
                            </h1>
                            <h1 className="font-[Poppins] text-[14px]">Emails: customer@exclusive.com</h1>
                            <h1 className="font-[Poppins] text-[14px]">Emails: support@exclusive.com</h1>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-[32px] max-w-[800px] py-[40px] px-[31px] shadow-[0px_1px_13px_0px_#0000000D]">
                    <div className="gap-[16px] flex">
                        <input
                            value={name ?? ""}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Your Name*"
                            className="w-[235px] py-[13px] px-[16px] bg-[#F5F5F5] font-[Poppins] text-[16px] focus:outline-none"
                        />

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Your Email*"
                            className="w-[235px] py-[13px] px-[16px] bg-[#F5F5F5] font-[Poppins] text-[16px] focus:outline-none"
                        />

                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Your Phone *"
                            className="w-[235px] py-[13px] pl-[16px] pr-[118px] bg-[#F5F5F5] font-[Poppins] text-[16px] focus:outline-none"
                        />
                    </div>

                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message *"
                            className="py-[13px] px-[16px] bg-[#F5F5F5]  resize-none font-[Poppins] text-[16px] w-[737px] h-[207px] focus:outline-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSend}
                            disabled={isSending}
                            className={`bg-[#DB4444] w-fit text-white py-[16px] px-[48px] rounded-[4px] font-[Poppins] font-[500] text-[16px] ${isSending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                                }`}
                        >
                            {isSending ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
