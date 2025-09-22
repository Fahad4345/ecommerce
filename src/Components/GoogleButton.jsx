"use client";

import { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { useRouter } from "next/navigation";


export default function GoogleSignInButton() {
    const { user, setuser } = useContext(MyContext);
    const router = useRouter();
    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("google-btn"),
                { theme: "outline", size: "large" }
            );
        }
    }, []);

    const handleResponse = async (response) => {
        const res = await fetch("https://backend-production-7ad70.up.railway.app/api/auth/GoogleLogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();
        localStorage.setItem("accessToken", data.Access_Token)
        localStorage.setItem("user", JSON.stringify(data.user))
        console.log("Data", user);
        setuser(data.user);
        router.push("/")

    };

    return <div id="google-btn"></div>;
}
