import { useState, useEffect } from "react";
import { API_BASE_URL } from "./../apiUrl";
import { fetchWithAuth } from "../fetchWithAuth";

export const fetchOrders = async (userId) => {
  if (!userId) return;
  try {
    const res = await fetchWithAuth(`/order/GetOrder/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
