import { API_BASE_URL } from "./../apiUrl";
import { showToast } from "../../Components/toast";
export const deleteCartItem = async (itemId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE_URL}/${`api/auth/DeleteCart`}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId }),
    });

    if (!res.ok) throw new Error("Failed to delete item");
    showToast("Item Deleted!", "success");
    const data = await res.json();

    return data.cart;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
