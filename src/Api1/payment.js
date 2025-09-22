"use client";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default async function handleCheckout() {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(
    "https://backend-production-7ad70.up.railway.app/api/auth/CheckOut",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401 || res.status === 403) {
    alert("You must be logged in to checkout.");
    return;
  }

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Checkout session failed");
  }
}
