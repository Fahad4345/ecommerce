export async function GetCart() {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("Token:" + token);
    const res = await fetch("http://localhost:3001/api/auth/GetCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("Get Cart Data" + JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error("GetCart error:", err.message);
    throw err;
  }
}
