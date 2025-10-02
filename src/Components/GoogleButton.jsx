"use client";

import { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "./../Api1/apiUrl";
import { showToast } from "./../Components/toast";
import { useAuth } from "../Api1/useAuth";

export default function GoogleSignInButton() {
    const { handleResponse } = useAuth();
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



    return <div id="google-btn" className=" w-full" ></div>;
}
