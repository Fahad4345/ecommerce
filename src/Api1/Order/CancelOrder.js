import { API_BASE_URL } from "./../apiUrl";
export default async function cancelOrder(orderId) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/${`stripe/CancelOrder/${orderId}`}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to cancel order");
    alert("Order cancelled and refunded successfully!");
  } catch (err) {
    alert(err.message);
  }
}
