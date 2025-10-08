import { API_BASE_URL } from "./apiUrl";
import { fetchWithAuth } from "./fetchWithAuth";
export async function GetDataByCategory(Category) {
  try {
    const url = ` /item/GetItem?Category=${encodeURIComponent(Category)}`;

    const res = await fetchWithAuth(url, {
      method: "GET",
    });
    const data = await res.json();
    const items = Array.isArray(data) ? data : data.items || [];

    const filtered = items.filter((item) => item.review >= 4.5);

    return filtered;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
}
