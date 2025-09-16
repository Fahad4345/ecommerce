export async function InsertCart(itemId, size, color, quantity) {
  try {
    console.log(size, color);
    const token = localStorage.getItem("accessToken");
    console.log("Token:" + token);
    const res = await fetch("http://localhost:3001/api/auth/InsertCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId, size, color, quantity }),
    });
    const data = await res.json();
    console.log("Data" + JSON.stringify(data, null, 2));
    if (!res.ok) throw new Error(data.message || "Failed to add to cart");

    return data;
  } catch (err) {
    console.error("InsertCart error:", err.message);
    throw err;
  }
}
