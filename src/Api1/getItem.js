import { API_BASE_URL } from "./apiUrl";
import { fetchWithAuth } from "./fetchWithAuth";
export default async function getItem(id) {
  try {
    const res = await fetchWithAuth(`/item/GetOneItem/${id}`, {
      method: "GET",
      noAuth: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    const item = await res.json();
    return item;
  } catch (err) {}
}
