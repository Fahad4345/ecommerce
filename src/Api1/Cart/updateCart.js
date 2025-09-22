export async function UpdateCart(itemId, color, size, quantity) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      "https://backend-production-7ad70.up.railway.app/api/auth/UpdateCart",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, color, quantity, size }),
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("UpdateCart error:", err.message);
    throw err;
  }
}
