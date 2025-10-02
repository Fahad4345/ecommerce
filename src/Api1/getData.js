import { API_BASE_URL } from "./apiUrl";
export async function GetDataByCategory(Category) {
  try {
    const url = Category
      ? ` ${API_BASE_URL}/${`item/GetItem?Category=${encodeURIComponent(
          Category
        )}`}`
      : ` ${API_BASE_URL}/${`item/GetItem`}`;
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();
    console.log(" Get Data", data);
    return data;
  } catch (err) {
    cobnsole.log("Error fetching data:", err);
  }
}
