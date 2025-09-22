import { useContext } from "react";
import { MyContext } from "./../../context/MyContext";

export async function InsertCart(itemId, size, color, quantity) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      "https://backend-production-7ad70.up.railway.app/api/auth/InsertCart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, size, color, quantity }),
      }
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to add to cart");

    return data;
  } catch (err) {
    console.error("InsertCart error:", err.message);
    throw err;
  }
}
