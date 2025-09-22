"use client";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "./../context/MyContext";

export function useAuth() {
  const { user, setuser, setcartLength } = useContext(MyContext);
  const [error, setError] = useState(null);

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

  const signup = async (FormData) => {
    try {
      const res = await fetch(
        "https://backend-production-7ad70.up.railway.app/api/auth/Signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const login = async (email, password) => {
    try {
      const res = await fetch(
        "https://backend-production-7ad70.up.railway.app/api/auth/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      console.log("Data", data);

      localStorage.setItem("accessToken", data.Access_Token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (!res.ok) throw new Error(data.error || "Login failed");
      setuser(data.user);
      console.log("USER", data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
    }
  };
  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://backend-production-7ad70.up.railway.app/api/auth/Dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const res = await fetch(
        "https://backend-production-7ad70.up.railway.app/api/auth/updateProfile",
        {
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
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unauthorized");
      setuser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const Logout = async () => {
    try {
      const res = await fetch(
        "https://backend-production-7ad70.up.railway.app/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setuser(null);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Logout failed");
      }
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
