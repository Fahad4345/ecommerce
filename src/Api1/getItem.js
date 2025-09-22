export default async function getItem(id) {
  try {
    const res = await fetch(
      `https://backend-production-7ad70.up.railway.app/api/auth/GetOneItem/${id}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const item = await res.json();
    return item;
  } catch (err) {}
}
