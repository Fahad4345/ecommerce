export async function GetDataByCategory(Category) {
  try {
    const url = Category
      ? `http://localhost:3001/api/auth/GetItem?Category=${encodeURIComponent(
          Category
        )}`
      : `http://localhost:3001/api/auth/GetItem`;
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();

    return data;
  } catch (err) {}
}
