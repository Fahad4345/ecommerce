"use client"
import React, { useState, useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../../Components/NavBar";
import { useAuth } from "../../Api1/useAuth";
import GoogleSignInButton from './../../Components/GoogleButton';
import { MyContext } from '../../context/MyContext';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const { signup, login } = useAuth();
    const { handleUserLogin } = useContext(MyContext);

    const [FormData, setFormdata] = useState({
        Firstname: "",
        Lastname: "",
        Addresse: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = async (e) => {
        setFormdata({ ...FormData, [e.target.name]: e.target.value });

        if (error) setError("");
    }

    const handleSignup = async () => {
        // Basic validation
        if (!FormData.Firstname || !FormData.Lastname || !FormData.email || !FormData.password) {
            setError("Please fill in all required fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(FormData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Password validation
        if (FormData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const signupResult = await signup({
                Firstname: FormData.Firstname,
                Lastname: FormData.Lastname,
                Addresse: FormData.Addresse,
                email: FormData.email,
                password: FormData.password,
            });

            if (signupResult) {
                console.log("Signup successful:", signupResult);

                try {
                    const loginUser = await login(FormData.email, FormData.password);

                    if (loginUser) {
                        console.log("Auto-login successful:", loginUser);


                        await handleUserLogin(loginUser);


                        router.push('/');
                    } else {

                        console.log("Signup successful but auto-login failed");
                        router.push('/login?message=Account created successfully. Please login.');
                    }
                } catch (loginError) {
                    console.error("Auto-login error:", loginError);

                    router.push('/login?message=Account created successfully. Please login.');
                }
            } else {
                setError("Account creation failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            if (error.message?.includes('email')) {
                setError("Email already exists. Please use a different email.");
            } else {
                setError("Account creation failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSignup();
        }
    }

    return (
        <div className='bg-white h-full flex flex-col justify-center items-center'>
            <Navbar />

            <div className='flex flex-row mt-[60px] max-w-[1305px] gap-[129px]'>
                <div className='max-w-[805px] w-full h-full bg-[#CBE4E8] max-h-[781px]'>
                    <Image src="/assets/images/loginImage.png" width={919} height={706} alt="Signup" />
                </div>
                <div className='flex flex-col gap-[48px] min-w-[371px]'>
                    <div className='flex flex-col gap-[24px]'>
                        <h1 className="font-[Inter] font-[500] text-[30px] leading-[30px] tracking-[4%]">
                            Create an account
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
                                placeholder='First Name *'
                                name='Firstname'
                                value={FormData.Firstname}
                                type="text"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                className='pb-[8px] w-full border-b-[1px] border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0'
                                placeholder='Last Name *'
                                name='Lastname'
                                value={FormData.Lastname}
                                type="text"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                className='pb-[8px] w-full border-b-[1px] border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0'
                                placeholder='Address (Optional)'
                                name='Addresse'
                                value={FormData.Addresse}
                                type="text"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                className='pb-[8px] w-full border-b-[1px] border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0'
                                placeholder='Email *'
                                name='email'
                                value={FormData.email}
                                type="email"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                className='pb-[8px] w-full border-b-[1px] border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0'
                                placeholder='Password (min 6 characters) *'
                                name='password'
                                value={FormData.password}
                                type="password"
                                disabled={loading}
                                required
                            />
                        </div>
                    </form>


                    {error && (
                        <div className='text-red-500 text-sm font-[Poppins] mt-[-20px]'>
                            {error}
                        </div>
                    )}

                    <div className='flex flex-col gap-[16px]'>
                        <button
                            onClick={handleSignup}
                            disabled={loading}
                            className={`px-[122px] py-[16px] cursor-pointer rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] text-white tracking-[0%] transition-colors ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#DB4444] hover:bg-[#c53030]'
                                }`}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        <GoogleSignInButton disabled={loading} />

                        <div className='cursor-pointer flex justify-center items-center mt-[32px] gap-[16px]'>
                            <h1 className='font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]'>
                                Already have account?
                            </h1>
                            <Link href="/login">
                                <h1 className='cursor-pointer font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] underline hover:text-[#DB4444] transition-colors'>
                                    Log in
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}