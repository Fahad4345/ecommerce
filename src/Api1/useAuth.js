"use client";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "./../context/MyContext";
import { API_BASE_URL } from "./apiUrl";
import { showToast } from "./../Components/toast";
import { useRouter } from "next/navigation";
export function useAuth() {
  const { user, setuser, setcartLength } = useContext(MyContext);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token", token);
    if (token) {
      const storedUser = localStorage.getItem("user");
      console.log("User", storedUser);
      if (storedUser) {
        setuser(JSON.parse(storedUser));

        return;
      }
    }
  }, []);
  const debugCookies = () => {
    console.log("All cookies:", document.cookie);
    console.log(
      "Refresh token cookie:",
      document.cookie
        .split(";")
        .find((row) => row.startsWith("Refresh_Token="))
        ?.split("=")[1]
    );
  };
  const signup = async (FormData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${`api/auth/Signup`}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      router.push("/login");
      showToast("Signup Sucessfully Now Login!", "success");
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const login = async (email, password) => {
    try {
      const res = await fetch(` ${API_BASE_URL}/${`api/auth/Login`}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("Data", data);

      localStorage.setItem("accessToken", data.Access_Token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        debugCookies();
      }, 1000);

      if (!res.ok) throw new Error(data.error || "Login failed");
      setuser(data.user);
      router.push("/");
      showToast("Login Sucessfully!", "success");
      return data.user;
    } catch (err) {
      setError(err.message);
    }
  };

  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_BASE_URL}/${`api/auth/Dashboard`}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unauthorized");

      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const updateProfile = async (
    Firstname,
    Lastname,
    Addresse,
    Newpassword,
    currentPassword
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(` ${API_BASE_URL}/${`api/auth/updateProfile`}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Firstname: Firstname,
          Lastname: Lastname,
          Addresse: Addresse,
          password: Newpassword,
          currentPassword: currentPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unauthorized");
      setuser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      showToast("Profile Updated!", "success");

      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  const Logout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/${`api/auth/Logout`}`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setuser(null);
      setcartLength(0);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Logout failed");
      }
      router.push("/");
      showToast("Logout Sucessfully!", "success");
      return data;
    } catch (err) {
      console.error("❌ Logout error:", err.message);
      throw err;
    }
  };
  return {
    user,
    error,
    signup,
    login,
    getDashboard,
    updateProfile,
    Logout,
  };
}
