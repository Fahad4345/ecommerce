import { API_BASE_URL } from "./apiUrl";
import { showToast } from "./../Components/toast";
import { fetchWithAuth } from "./fetchWithAuth";
export async function SendEmail(name, email, message) {
  try {
    let text = `Hello my name is ${name} and ${message} `;

    const res = await fetchWithAuth(`/email/SendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: email, text: text }),
    });
    const data = await res.json();
    console.log("data", data);

    if (!res.ok) throw new Error(data.message || "Email not Sent");
    showToast("Email sent Sucessfully!", "success");
  } catch (err) {
    console.error("InsertCart error:", err.message);
    throw err;
  }
}
