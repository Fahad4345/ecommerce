import { useState, useEffect } from "react";
import { API_BASE_URL } from "./../apiUrl";

export default function useCustomerOrders(userId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("UserId", userId);
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/${`order/GetOrder/${userId}`}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, loading, error };
}
