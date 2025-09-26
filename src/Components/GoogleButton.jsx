"use client";

import { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "./../Api1/apiUrl";
import { showToast } from "./../Components/toast";


export default function GoogleSignInButton() {
    const { user, setuser } = useContext(MyContext);
    const router = useRouter();
    useEffect(() => {
        if (window.google) {
            console.log("ClientID", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("google-btn"),
                { theme: "outline" }
            );
        }
    }, []);

    const handleResponse = async (response) => {
        const res = await fetch(`${API_BASE_URL}/${`api/auth/GoogleLogin`}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();
        localStorage.setItem("accessToken", data.Access_Token)
        localStorage.setItem("user", JSON.stringify(data.user))
        console.log("Data", user);
        setuser(data.user);
        showToast("Login sucessfull!", "success");

        router.push("/");

    };

    return <div id="google-btn" className=" w-full" ></div>;
}
