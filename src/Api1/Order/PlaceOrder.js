import { API_BASE_URL } from "./../apiUrl";
export default async function PlaceOrder(orderData) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/${`stripe/PlaceOrder`}`, {
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

    return data;
  } catch (err) {
    console.error("❌ Error placing order:", err);
    throw err;
  }
}
