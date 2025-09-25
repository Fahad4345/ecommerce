"use client";
import { useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import { GetCart } from "../Api1/Cart/getCart";
import { useWishlist } from "../Api1/wishlist";

export default function MyProvider({ children }) {
    const [WishlistLength, setWishlistLength] = useState(0);
    const [cartLength, setcartLength] = useState(0);
    const [user, setuser] = useState(null);
    const [wishlistIds, setWishlistIds] = useState([]);
    const [cartIds, setCartIds] = useState([]);

    const { getItem } = useWishlist();

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

    const refreshWishlistLength = async () => {
        try {
            const wishlist = await getItem();

            if (Array.isArray(wishlist)) {
                const ids = wishlist.map((item) => item._id);

                setWishlistIds(ids);
                setWishlistLength(ids.length);

                // Sync with localStorage so UI stays red on refresh
                localStorage.setItem("Wishlist", JSON.stringify(ids));

                console.log("Wishlist from API:", ids);
            } else {
                setWishlistIds([]);
                setWishlistLength(0);
                localStorage.setItem("Wishlist", JSON.stringify([]));
            }
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
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

    // Function to handle login - call this after successful login
    const handleUserLogin = async (userData) => {
        setuser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Refresh both cart and wishlist after login
        await refreshCartLength();
        await refreshWishlistLength();
    };

    // Function to handle logout
    const handleUserLogout = () => {
        setuser(null);
        localStorage.removeItem("user");
        setCartIds([]);

        // Clear wishlist and cart data
        setWishlistIds([]);
        setWishlistLength(0);
        setcartLength(0);
        localStorage.removeItem("Wishlist");
        localStorage.removeItem("CartItems");
        localStorage.removeItem("WishlistLength");
        localStorage.removeItem("CartLength");
    };

    // Initial load - check for existing user and sync data
    useEffect(() => {
        const initializeData = async () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    setuser(userData);

                    // Refresh data from API for logged-in users
                    await refreshCartLength();
                    await refreshWishlistLength();
                } catch (error) {
                    console.error("Error parsing stored user:", error);
                    localStorage.removeItem("user");
                    syncWishlist(); // Fallback to localStorage sync
                }
            } else {
                // For non-logged-in users, sync from localStorage
                syncWishlist();
            }
        };

        initializeData();
    }, []);

    // Watch for user changes and refresh data accordingly
    useEffect(() => {
        if (user) {
            // User is logged in, refresh from API
            refreshWishlistLength();
            refreshCartLength();
        } else {
            // User is not logged in, clear data or sync from localStorage
            syncWishlist();
        }
    }, [user?.id]); // Watch for user ID changes to detect login/logout

    // Listen for localStorage changes (for multi-tab sync)
    useEffect(() => {
        const handleStorageChange = async (event) => {
            if (event.key === 'user') {
                const newUser = event.newValue ? JSON.parse(event.newValue) : null;
                setuser(newUser);

                if (newUser) {
                    await refreshCartLength();
                    await refreshWishlistLength();
                } else {
                    setWishlistIds([]);
                    setWishlistLength(0);
                    setcartLength(0);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Listen for custom wishlist update events
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
            cartIds,
            setCartIds,
            user,
            setuser,
            refreshCartLength,
            refreshWishlistLength, // Expose this function
            wishlistIds,
            setWishlistIds,
            addToWishlist,
            removeFromWishlist,
            syncWishlist,
            handleUserLogin,  // Expose login handler
            handleUserLogout  // Expose logout handler
        }}>
            {children}
        </MyContext.Provider>
    );
}