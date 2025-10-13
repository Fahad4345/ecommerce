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

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update cart");
    }

    return await res.json();
  } catch (err) {
    console.error("UpdateCart error:", err.message);
    throw err;
  }
}
