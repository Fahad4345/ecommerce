import { API_BASE_URL } from "./apiUrl";
import { fetchWithAuth } from "./fetchWithAuth";
export async function GetDataByCategory(Category) {
  try {
    const url = Category
      ? `/item/GetItem?Category=${encodeURIComponent(Category)}`
      : `/item/GetItem`;
    const res = await fetchWithAuth(url, {
      method: "GET",
      noAuth: true,
    });
    const data = await res.json();
    console.log(" Get Data", data);
    return data;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
}
