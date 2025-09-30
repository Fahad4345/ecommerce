"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Components/NavBar";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const [FormData, setFormdata] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormdata({ ...FormData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleResetPassword = async () => {
    if (!FormData.password || !FormData.confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    if (FormData.password !== FormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (FormData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/auth/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            token,
            newPassword: FormData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess("Password reset successful! Redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white h-full flex flex-col justify-center items-center">
      <Navbar />

      <div className="flex flex-row mt-[60px] max-w-[1305px] gap-[129px]">
        <div className="max-w-[805px] w-full h-full bg-[#CBE4E8] max-h-[781px]">
          <Image
            src="/assets/images/loginImage.png"
            width={919}
            height={706}
            alt="Reset Password"
          />
        </div>

        <div className="flex flex-col gap-[48px] min-w-[371px]">
          <div className="flex flex-col gap-[24px]">
            <h1 className="font-[Inter] font-[500] text-[30px]">
              Reset Password
            </h1>
            <h1 className="font-[Poppins] text-[16px]">
              Enter your new password below
            </h1>
          </div>

          <div className="gap-[40px] flex flex-col">
            <input
              onChange={handleChange}
              name="password"
              value={FormData.password}
              type="password"
              placeholder="New Password *"
              className="pb-[8px] w-full border-b border-[#00000066] focus:outline-none"
              disabled={loading}
              required
            />

            <input
              onChange={handleChange}
              name="confirmPassword"
              value={FormData.confirmPassword}
              type="password"
              placeholder="Confirm Password *"
              className="pb-[8px] w-full border-b border-[#00000066] focus:outline-none"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`px-[122px] py-[16px] rounded-[4px] text-white transition-colors ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#DB4444] hover:bg-[#c53030]"
              }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="cursor-pointer flex justify-center items-center mt-[32px] gap-[16px]">
            <h1 className="font-[Poppins] text-[16px]">Remembered password?</h1>
            <Link href="/login">
              <h1 className="cursor-pointer font-[Poppins] font-[500] underline hover:text-[#DB4444]">
                Rest Passowrd
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
