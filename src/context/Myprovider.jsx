"use client";
import { useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import { GetCart } from "../Api1/Cart/getCart";

export default function MyProvider({ children }) {
    const [WishlistLength, setWishlistLength] = useState(0);
    const [cartLength, setcartLength] = useState(0);
    const [user, setuser] = useState(null);
    const [wishlistIds, setWishlistIds] = useState([]);


    const refreshCartLength = async () => {
        try {
            const data = await GetCart();
            if (data && data.cart && Array.isArray(data.cart)) {
                const totalItems = data.cart.reduce((total, item) => total + item.quantity, 0);
                setcartLength(totalItems);
            } else {
                setcartLength(0);
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setcartLength(0);
        }
    };


    const syncWishlist = () => {
        try {
            const stored = JSON.parse(localStorage.getItem("Wishlist") || "[]");
            const safeStored = Array.isArray(stored) ? stored.filter(Boolean) : [];
            setWishlistIds(safeStored);
            setWishlistLength(safeStored.length);
            localStorage.setItem("Wishlist", JSON.stringify(safeStored));
        } catch (e) {
            console.error("Error parsing Wishlist:", e);
            setWishlistIds([]);
            setWishlistLength(0);
            localStorage.setItem("Wishlist", JSON.stringify([]));
        }
    };


    const addToWishlist = (productId) => {
        if (!wishlistIds.includes(productId)) {
            const updatedWishlist = [...wishlistIds, productId];
            setWishlistIds(updatedWishlist);
            setWishlistLength(updatedWishlist.length);
            localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));


            window.dispatchEvent(new CustomEvent('wishlist-updated', {
                detail: { wishlistIds: updatedWishlist }
            }));
        }
    };


    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlistIds.filter(id => id !== productId);
        setWishlistIds(updatedWishlist);
        setWishlistLength(updatedWishlist.length);
        localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));


        window.dispatchEvent(new CustomEvent('wishlist-updated', {
            detail: { wishlistIds: updatedWishlist }
        }));
    };


    useEffect(() => {
        refreshCartLength();
        syncWishlist();
    }, []);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setuser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleWishlistUpdate = (event) => {
            if (event.detail && event.detail.wishlistIds) {
                setWishlistIds(event.detail.wishlistIds);
                setWishlistLength(event.detail.wishlistIds.length);
            }
        };

        window.addEventListener('wishlist-updated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('wishlist-updated', handleWishlistUpdate);
        };
    }, []);

    return (
        <MyContext.Provider value={{
            WishlistLength,
            setWishlistLength,
            cartLength,
            setcartLength,
            user,
            setuser,
            refreshCartLength,
            wishlistIds,
            addToWishlist,
            removeFromWishlist,
            syncWishlist
        }}>
            {children}
        </MyContext.Provider>
    );
}