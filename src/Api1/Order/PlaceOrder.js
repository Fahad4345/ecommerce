import { API_BASE_URL } from "./../apiUrl";
import { showToast } from "../../Components/toast";
import { fetchWithAuth } from "../fetchWithAuth";
export default async function PlaceOrder(orderData) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetchWithAuth(`/order/PlaceOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("❌ Backend error response:", data);
      throw new Error(data.message || "Failed to place order");
    }
    showToast("Order Placed!", "success");
    console.log("Data", data);
    return data;
  } catch (err) {
    console.log({ message: err.message });
    throw err;
  }
}
