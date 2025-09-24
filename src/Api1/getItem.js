import { API_BASE_URL } from "./apiUrl";
export default async function getItem(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/${`api/auth/GetOneItem/${id}`}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });
    const item = await res.json();
    return item;
  } catch (err) {}
}
