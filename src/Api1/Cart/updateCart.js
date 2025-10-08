import { API_BASE_URL } from "./../apiUrl";
import { showToast } from "../../Components/toast";
import { fetchWithAuth } from "../fetchWithAuth";
export async function UpdateCart(itemId, color, size, quantity) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetchWithAuth(`/cart/UpdateCart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId, color, quantity, size }),
    });
    const data = await res.json();
    showToast("Cart updated successfully", "success");
    return data;
  } catch (err) {
    console.error("UpdateCart error:", err.message);
    throw err;
  }
}
