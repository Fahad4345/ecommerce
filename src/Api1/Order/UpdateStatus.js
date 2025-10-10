import { fetchWithAuth } from "../fetchWithAuth";

export const updateOrderStatus = async (id, orderStatus, token) => {
  try {
    const response = await fetchWithAuth(`/order/UpdateOrderStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, orderStatus }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update order status");
    }

    return data;
  } catch (error) {
    console.error(" Error updating order status:", error);
    throw error;
  }
};
