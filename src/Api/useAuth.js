"use client";
import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const signup = async (FormData) => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const login = async (email, password) => {
    try {
      console.log(email, password);
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      localStorage.setItem("accessToken", data.Access_Token);
      if (!res.ok) throw new Error(data.error || "Login failed");
      setUser({ email });
      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3001/api/auth/Dashboard", {
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
      const res = await fetch("http://localhost:3001/api/auth/updateProfile", {
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

      return data;
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return {
    user,
    error,
    signup,
    login,
    getDashboard,
    updateProfile,
  };
}
