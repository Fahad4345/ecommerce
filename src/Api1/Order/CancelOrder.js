import { API_BASE_URL } from "./../apiUrl";
import { showToast } from "../../Components/toast";
import { fetchWithAuth } from "../fetchWithAuth";
export default async function cancelOrder(orderId) {
  try {
    const res = await fetchWithAuth(`/stripe/CancelOrder/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to cancel order");
    showToast(" Order Cancelled!", "success");
  } catch (err) {
    alert(err.message);
  }
}
