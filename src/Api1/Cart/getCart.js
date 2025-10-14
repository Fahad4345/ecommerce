import { fetchWithAuth } from "../fetchWithAuth";
import { API_BASE_URL } from "./../apiUrl";
export async function GetCart() {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("AcessToken", token);
    const res = await fetchWithAuth(`/cart/GetCart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("GetCart error:", err.message);
    throw err;
  }
}
