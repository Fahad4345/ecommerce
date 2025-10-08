import { API_BASE_URL } from "./../apiUrl";
import { showToast } from "../../Components/toast";
import { useContext } from "react";
import { fetchWithAuth } from "../fetchWithAuth";

export default async function AdminAllOrders() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetchWithAuth(`/order/GetAdminAllOrder`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("❌ Backend error response:", data);
      throw new Error(data.message || "Failed to fetch orders");
    }

    console.log("Data", data);

    return data;
  } catch (err) {
    console.log({ message: err.message });
    throw err;
  }
}
