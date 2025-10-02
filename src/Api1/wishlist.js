"use client";
import { API_BASE_URL } from "./apiUrl";
import { useContext, useState } from "react";
import { showToast } from "./../Components/toast";
import { MyContext } from "./../context/MyContext";

export function useWishlist() {
  const [wishlistLength, setWishlistLength] = useState();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);

  const insertItem = async (itemId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;

      const res = await fetch(`${API_BASE_URL}/${`wishlist/InsertWishlist`}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to insert wishlist");

      const stored = JSON.parse(localStorage.getItem("Wishlist") || "[]");
      const updated = stored.includes(itemId) ? stored : [...stored, itemId];

      localStorage.setItem("Wishlist", JSON.stringify(updated));
      setWishlistLength(updated.length);
      setWishlistItems(updated);
      showToast("Added to Wishlist!", "success");
      window.dispatchEvent(new Event("wishlist-updated"));
      return data.wishlist;
    } catch (err) {
      console.error("Insert Wishlist Error", err);
      setError(err.message);
    }
  };

  const getItem = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;
      console.log("Token in wishlist", token);

      const res = await fetch(`${API_BASE_URL}/${`wishlist/GetWishlist`}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch wishlist");

      console.log("data from get", data);
      const ids = data.wishlist.map((item) => item._id);
      localStorage.setItem("Wishlist", JSON.stringify(ids));
      setWishlistItems(data.wishlist);
      setWishlistLength(data.wishlist.length);

      window.dispatchEvent(new Event("wishlist-updated"));
      return data.wishlist;
    } catch (err) {
      console.error("Get Wishlist Error", err);
      setError(err.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;

      const res = await fetch(
        `${API_BASE_URL}/${`wishlist/RemoveItemWishlist`}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: id }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to remove Item wishlist");

      const stored = JSON.parse(localStorage.getItem("Wishlist") || "[]");
      const updated = stored.filter((itemId) => itemId !== id);

      localStorage.setItem("Wishlist", JSON.stringify(updated));
      setWishlistLength(updated.length);
      setWishlistItems(updated);
      showToast("Removed from  Wishlist", "success");
      window.dispatchEvent(new Event("wishlist-updated"));
      return data;
    } catch (err) {
      console.error("Remove Wishlist Error", err);
      setError(err.message);
    }
  };

  return {
    wishlistItems,
    insertItem,
    getItem,
    removeItem,
    error,
  };
}
