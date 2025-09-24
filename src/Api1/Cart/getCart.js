import { API_BASE_URL } from "./../apiUrl";
export async function GetCart() {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE_URL}/${`api/auth/GetCart`}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("GetCart error:", err.message);
    throw err;
  }
}
