"use client";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "./../context/MyContext";
import { API_BASE_URL } from "./apiUrl";
import { showToast } from "./../Components/toast";
import { useRouter } from "next/navigation";

export function useAuth() {
  const {
    user,
    setuser,
    setcartLength,
    setWishlistLength,
    setWishlistIds,
    handleUserLogout,
  } = useContext(MyContext);
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
      const res = await fetch(`${API_BASE_URL}/${`auth/Signup`}`, {
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
      const res = await fetch(` ${API_BASE_URL}/${`auth/Login`}`, {
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
      localStorage.setItem("Wishlist", JSON.stringify(data.user.wishlist));
      localStorage.setItem("CartItems", JSON.stringify(data.user.cart));
      localStorage.setItem("CartLength", JSON.stringify(data.user.cart.length));
      localStorage.setItem(
        "WishlistLength",
        JSON.stringify(data.user.wishlist.length) || []
      );
      setcartLength(data.user.cart.length);
      setWishlistLength(data.user.wishlist.length);
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
      const res = await fetch(`${API_BASE_URL}/${`auth/Dashboard`}`, {
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
      const res = await fetch(` ${API_BASE_URL}/${`auth/updateProfile`}`, {
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
      const res = await fetch(`${API_BASE_URL}/auth/Logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Logout failed");
      }

      handleUserLogout();

      router.push("/");
      showToast("Logout Successfully!", "success");

      return data;
    } catch (err) {
      console.error("❌ Logout error:", err.message);

      handleUserLogout();
      router.push("/");
      showToast("Logged out locally", "info");

      throw err;
    }
  };
  const handleResponse = async (response) => {
    const res = await fetch(`${API_BASE_URL}/${`auth/GoogleLogin`}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    });

    const data = await res.json();
    localStorage.setItem("accessToken", data.Access_Token);
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log("Data", user);
    setuser(data.user);
    showToast("Login sucessfull!", "success");

    router.push("/");
  };
  return {
    user,
    error,
    signup,
    login,
    getDashboard,
    updateProfile,
    Logout,
    handleResponse,
  };
}
