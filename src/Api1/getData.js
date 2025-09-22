export async function GetDataByCategory(Category) {
  try {
    const url = Category
      ? `https://backend-production-7ad70.up.railway.app/api/auth/GetItem?Category=${encodeURIComponent(
          Category
        )}`
      : `https://backend-production-7ad70.up.railway.app/api/auth/GetItem`;
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();
    console.log(" Get Data", data);
    return data;
  } catch (err) {}
}
