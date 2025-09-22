export async function SendEmail(name, email, message) {
  try {
    const subject = "Helpline";
    let text = `Hello my name is ${name} and ${message} `;

    const res = await fetch(
      "https://backend-production-7ad70.up.railway.app/api/auth/SendEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email, subject: subject, text: text }),
      }
    );
    const data = await res.json();
    console.log("data", data);

    if (!res.ok) throw new Error(data.message || "Email not Sent");
  } catch (err) {
    console.error("InsertCart error:", err.message);
    throw err;
  }
}
