import { useContext } from "react";
import { MyContext } from "./../../context/MyContext";
import { API_BASE_URL } from "./../apiUrl";
import { showToast } from "../../Components/toast";
import { fetchWithAuth } from "../fetchWithAuth";
export async function InsertCart(itemId, size, color, quantity) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const res = await fetchWithAuth(`/cart/InsertCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, size, color, quantity }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      return data;
    } catch (err) {
      console.error("InsertCart error:", err.message);
      throw err;
    }
  } else {
  }
}
