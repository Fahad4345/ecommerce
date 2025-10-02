"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../../Components/NavBar";
import { useAuth } from "./../../Api1/useAuth"
import { MyContext } from '../../context/MyContext';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from './../../Components/GoogleButton';
import { showToast } from './../../Components/toast';
import { API_BASE_URL } from '../../Api1/apiUrl';

export default function Login() {

    const { handleUserLogin } = useContext(MyContext);
    const { login } = useAuth();
    const router = useRouter();

    const [FormData, setFormdata] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = async (e) => {
        setFormdata({ ...FormData, [e.target.name]: e.target.value })

        if (error) setError("");
    }
    const handleForgetPassword = () => {
        if (FormData.email === "") {
            setError("Please enter your email");
        } else {
            try {
                const res = fetch(`${API_BASE_URL}/email/forgetPassword`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: FormData.email })
                });
                if (res.ok) {
                    showToast("Password reset email sent successfully", 'success');
                }
            }
            catch (error) {
                console.error("Error:", error);
                setError("Failed to send password reset email");
            }
        };
    }
    const handleLogin = async () => {

        if (!FormData.email || !FormData.password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const loginUser = await login(FormData.email, FormData.password);

            if (loginUser) {
                console.log("LoginUser", loginUser);


                await handleUserLogin(loginUser);


                router.push('/');
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    }

    return (
        <div className='bg-white h-full flex flex-col justify-center items-center'>
            <Navbar />

            <div className='flex flex-row mt-[60px] max-w-[1305px] gap-[129px] justify-center items-center'>
                <div className='max-w-[805px] w-full h-full bg-[#CBE4E8] max-h-[781px]'>
                    <Image src="/assets/images/loginImage.png" width={919} height={706} alt="Login" />
                </div>

                <div className='flex flex-col gap-[40px]'>
                    <div className='flex flex-col gap-[48px] min-w-[371px]'>
                        <div className='flex flex-col gap-[24px]'>
                            <h1 className="font-[Inter] font-[500] text-[30px] leading-[30px] tracking-[4%]">
                                Log in to Exclusive
                            </h1>
                            <h1 className="font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]">
                                Enter your details below
                            </h1>
                        </div>

                        <form className='gap-[40px] flex flex-col' onKeyPress={handleKeyPress}>
                            <div>
                                <input
                                    onChange={handleChange}
                                    className='pb-[8px] w-full border-b-[1px] border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0'
                                    placeholder='Email or Phone Number'
                                    name="email"
                                    value={FormData.email}
                                    type="text"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChange}
                                    className='pb-[8px] w-full border-b-[1px] border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0'
                                    placeholder='Password'
                                    name="password"
                                    value={FormData.password}
                                    type="password"
                                    disabled={loading}
                                />
                            </div>
                        </form>


                        {error && (
                            <div className='text-red-500 text-sm font-[Poppins]'>
                                {error}
                            </div>
                        )}
                    </div>
                    <GoogleSignInButton disabled={loading} />


                    <div className='flex flex-row gap-[87px] justify-center items-center'>


                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className={`cursor-pointer px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] text-white tracking-[0%] ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#DB4444] hover:bg-[#c53030]'
                                }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        < button onClick={handleForgetPassword}>
                            <h1 className='font-[Poppins] font-[500] text-[#DB4444] text-[16px] leading-[24px] tracking-[0%] underline cursor-pointer'>
                                Forget Password?
                            </h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}