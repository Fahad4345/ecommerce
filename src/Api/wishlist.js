"use client";
import { useState } from "react";

export function useWishlist() {
  const [error, setError] = useState(null);

  const insertItem = async (itemId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return null;
      }
      const res = await fetch("http://localhost:3001/api/auth/InsertWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const getItem = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return null;
      }
      const res = await fetch("http://localhost:3001/api/auth/GetWishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const wishlistItems = await res.json();
      if (!res.ok)
        throw new Error(wishlistItems.error || "Failed to fetch wishlist");

      return wishlistItems;
    } catch (err) {
      setError(err.message);
    }
  };
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return null;
      }
      const res = await fetch(
        "http://localhost:3001/api/auth/RemoveItemWishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: id }),
        }
      );
      const wishlistItems = await res.json();
      if (!res.ok)
        throw new Error(
          wishlistItems.error || "Failed to remove Item wishlist"
        );
      console.log("item remove sucessfully");

      return wishlistItems;
    } catch (err) {
      setError(err.message);
    }
  };
  return {
    insertItem,
    getItem,
    removeItem,
  };
}
