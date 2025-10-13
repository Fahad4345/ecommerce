"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader";

export default function Guardwrapper({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("📌 LocalStorage user:", storedUser);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid JSON", err);
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!loading && user) {
      if (user.role !== "admin") {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />; 
  }

  if (!user || user.role !== "admin") {
    return null; 
  }

  return <>{children}</>;
}
