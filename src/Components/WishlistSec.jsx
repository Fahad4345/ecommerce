



// "use client"
// import React, { useEffect, useState, useContext } from 'react'
// import Image from 'next/image';
// import { Heart, Eye } from "lucide-react";
// import Link from 'next/link';
// import { useWishlist } from '../Api1/wishlist';
// import { MyContext } from "../context/MyContext";
// import { InsertCart } from "../Api1/Cart/insertCart";
// import { GetCart } from '../Api1/Cart/getCart';
// import SaleSection from './SaleSec';
// import { GetDataByCategory } from './../Api1/getData';

// const Foryou = [
//     {
//         id: 5,
//         _id: "foryou_5",
//         name: "HAVIT HV-G92 Gamepad",
//         price: 120,
//         oldPrice: 160,
//         discount: "-40%",
//         image: ["/products/gamepad.png"],
//         rating: 4.5,
//         review: 88,
//     },
//     {
//         id: 6,
//         _id: "foryou_6",
//         name: "AK-900 Wired Keyboard",
//         price: 960,
//         oldPrice: 1160,
//         discount: "-35%",
//         image: ["/products/gamepad.png"],
//         rating: 4.7,
//         review: 75,
//     },
//     {
//         id: 7,
//         _id: "foryou_7",
//         name: "IPS LCD Gaming Monitor",
//         price: 370,
//         oldPrice: 400,
//         discount: "-30%",
//         image: ["/products/gamepad.png"],
//         rating: 4.8,
//         review: 99,
//     },
//     {
//         id: 8,
//         _id: "foryou_8",
//         name: "IPS LCD Gaming Monitor",
//         price: 370,
//         oldPrice: 400,
//         discount: "-30%",
//         image: ["/products/gamepad.png"],
//         rating: 4.8,
//         review: 99,
//     },
// ];

// export default function wishlistSec() {
//     const [Wishlist, setWishlist] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [cartIds, setCartIds] = useState([]);
//     const [products, setProducts] = useState([]);
//     const { getItem, removeItem, insertItem } = useWishlist();
//     const { cartLength, setcartLength, wishlistIds, addToWishlist, removeFromWishlist } = useContext(MyContext);


//     const syncCartItems = async () => {
//         try {
//             const data = await GetCart();
//             if (data && data.cart && Array.isArray(data.cart)) {
//                 const itemIds = data.cart.map(item => item.itemId._id);
//                 setCartIds(itemIds);
//                 localStorage.setItem("CartItems", JSON.stringify(itemIds));
//             } else {
//                 setCartIds([]);
//                 localStorage.setItem("CartItems", JSON.stringify([]));
//             }
//         } catch (error) {
//             console.error("Error syncing cart items:", error);
//         }
//     };

//     useEffect(() => {
//         syncCartItems();
//         const product = GetDataByCategory();
//         setProducts(product);
//     }, []);

//     useEffect(() => {
//         const handleVisibilityChange = () => {
//             if (!document.hidden) {
//                 syncCartItems();
//             }
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);

//         return () => {
//             document.removeEventListener('visibilitychange', handleVisibilityChange);
//         };
//     }, []);

//     useEffect(() => {
//         const fetchWishlist = async () => {
//             try {
//                 setIsLoading(true);
//                 const data = await getItem();
//                 console.log("data", data);
//                 setWishlist(data);
//             } catch (error) {
//                 console.error("Error fetching wishlist:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchWishlist();
//     }, []);


//     const handleAddToCart = async (productId, e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         try {
//             await InsertCart(productId);

//             if (!cartIds.includes(productId)) {
//                 const updatedCartIds = [...cartIds, productId];
//                 setCartIds(updatedCartIds);
//                 localStorage.setItem("CartItems", JSON.stringify(updatedCartIds));
//             }

//             setcartLength(cartLength + 1);
//             alert("Item Added Successfully");
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//             alert("Failed to add item to cart");
//         }
//     };

//     const handleRemove = async (id) => {
//         try {
//             await removeItem(id);
//             removeFromWishlist(id);

//             setWishlist((prev) => {
//                 if (!Array.isArray(prev)) return [];

//                 const updated = prev.filter((item) => item._id !== id);
//                 const updatedIds = updated.map((item) => item._id);
//                 localStorage.setItem("Wishlist", JSON.stringify(updatedIds));
//                 console.log("Updated", updated);

//                 return updated;
//             });
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleMoveAllToBag = async () => {
//         try {
//             const promises = Wishlist.map(async (product) => {
//                 if (!cartIds.includes(product._id)) {
//                     return InsertCart(product._id);
//                 }
//                 return null;
//             });

//             await Promise.all(promises);


//             const newCartIds = [...cartIds];
//             Wishlist.forEach(product => {
//                 if (!newCartIds.includes(product._id)) {
//                     newCartIds.push(product._id);
//                 }
//             });

//             setCartIds(newCartIds);
//             localStorage.setItem("CartItems", JSON.stringify(newCartIds));
//             setcartLength(newCartIds.length);

//             alert("All items moved to cart successfully!");
//         } catch (error) {
//             console.error("Error moving items to cart:", error);
//             alert("Failed to move some items to cart");
//         }
//     };

//     return (
//         <div className='flex flex-col gap-[80px] max-w-[1170px] w-full'>
//             <div className='mt-[80px] flex flex-col gap-[60px] items-center'>
//                 <div className='flex w-full justify-between'>
//                     <div className='flex flex-col gap-[24px] items-center justify-center'>
//                         <h1 className='font-[Poppins] font-[400] text-[20px] leading-[26px] text-black'>
//                             Wishlist({isLoading ? "..." : Wishlist.length})
//                         </h1>
//                     </div>
//                     <div className='flex gap-[8px]'>
//                         <button
//                             onClick={handleMoveAllToBag}
//                             disabled={isLoading || Wishlist.length === 0}
//                             className={`justify-center items-center flex font-[Poppins] font-[500] text-[16px] leading-[24px] px-[48px] py-[16px] cursor-pointer ${isLoading || Wishlist.length === 0
//                                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                 : 'bg-[#F5F5F5] hover:bg-gray-200'
//                                 }`}
//                         >
//                             Move All To Bag
//                         </button>
//                     </div>
//                 </div>

//                 {isLoading ? (
//                     <div className='max-w-[1170px] mx-[135px] mt-[80px]'>
//                         <div className='flex justify-center items-center py-[100px]'>
//                             <p className='font-[Poppins] text-[18px]'>Loading wishlist...</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className='grid grid-cols-4 gap-x-[30px] gap-y-[60px]'>
//                         {Wishlist?.map((product, id) => {
//                             const inCart = cartIds?.includes(product._id);

//                             return (
//                                 <Link key={id} href={`/productDetail/${product._id}`}>
//                                     <div className="flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-[16px]">
//                                         <div className='relative group overflow-hidden bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full flex justify-center items-center'>
//                                             {product.discount && (
//                                                 <span className="absolute top-[12px] left-[12px] font-[Poppins] h-[26px] font-[400] text-[12px] leading-[18px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
//                                                     {product.discount}%
//                                                 </span>
//                                             )}

//                                             <div className="absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end">
//                                                 <button
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         e.stopPropagation();
//                                                         handleRemove(product._id);
//                                                     }}
//                                                     className="w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex shadow hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
//                                                 >
//                                                     <Image src="/assets/icons/delete.svg" alt="" width={24} height={24} />
//                                                 </button>
//                                             </div>

//                                             <div>
//                                                 <Image src={product.image[0] || "assets/images/Led.png"} width={172} height={129} alt="" className="cursor-pointer" />
//                                             </div>

//                                             <button
//                                                 onClick={(e) => handleAddToCart(product._id, e)}
//                                                 disabled={inCart}
//                                                 className={`font-[Poppins] font-[500] text-[16px] leading-[24px] absolute bottom-0 left-0 w-full py-2 text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ${inCart
//                                                     ? "bg-green-600 text-white cursor-not-allowed"
//                                                     : "bg-black text-white hover:bg-gray-800"
//                                                     }`}
//                                             >
//                                                 {inCart ? "Added to Cart" : "Add To Cart"}
//                                             </button>
//                                         </div>

//                                         <div className='gap-[8px] flex flex-col'>
//                                             <h3 className="font-[Poppins] font-[500] text-[16px] leading-[24px]">{product.name}</h3>
//                                             <div className="flex items-center gap-2">
//                                                 <span className="text-red-600 font-[Poppins] font-[500] text-[16px] leading-[24px]">${product.price}</span>
//                                                 {product.discountPrice && (
//                                                     <span className="text-[#757575] font-[Poppins] font-[400] text-[14px] leading-[20px] line-through">${product.discountPrice}</span>
//                                                 )}
//                                             </div>

//                                             {product.rating && (
//                                                 <div className="flex items-center text-yellow-400 text-[16px]">
//                                                     {"★".repeat(Math.round(product.rating))}
//                                                     {"☆".repeat(5 - Math.round(product.rating))}
//                                                     <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px]">
//                                                         ({product.review})
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>


//             <div className='flex flex-col gap-[60px] items-center'>
//                 <div className='flex w-full justify-between'>
//                     <div className='flex flex-col gap-[24px] items-center justify-center'>
//                         <h1 className='font-[Poppins] font-[400] text-[20px] leading-[26px] text-black'>For you</h1>
//                     </div>
//                     <div className='flex gap-[8px]'>
//                         <button className='justify-center items-center flex bg-[#F5F5F5] font-[Poppins] font-[500] text-[16px] leading-[24px] px-[48px] py-[16px] cursor-pointer hover:bg-gray-200'>
//                             See All
//                         </button>
//                     </div>
//                 </div>
//                 <SaleSection title="For you" showViewAll={true} />

//                 <div className='grid grid-cols-4 gap-x-[30px] gap-y-[60px]'>
//                     {products.map.map((product) => {
//                         const wishlisted = wishlistIds?.includes(product._id);
//                         const inCart = cartIds?.includes(product._id);

//                         return (
//                             <Link key={product.id} href={`/productDetail/${product._id}`}>
//                                 <div className="flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-[16px]">
//                                     <div className='relative group overflow-hidden bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full flex justify-center items-center'>
//                                         <span className="absolute top-[12px] left-[12px] font-[Poppins] h-[26px] font-[400] text-[12px] leading-[18px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
//                                             {product.discount}
//                                         </span>

//                                         <div className="absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end">
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     e.stopPropagation();

//                                                     if (wishlisted) {
//                                                         removeItem(product._id);
//                                                         removeFromWishlist(product._id);
//                                                     } else {
//                                                         insertItem(product._id);
//                                                         addToWishlist(product._id);
//                                                     }
//                                                 }}
//                                                 className="w-[34px] h-[34px] cursor-pointer bg-white rounded-full flex justify-center items-center shadow hover:bg-gray-100"
//                                             >
//                                                 <Heart fill={wishlisted ? "red" : "none"} color={wishlisted ? "red" : "black"} size={20} />
//                                             </button>
//                                             <button className="w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex shadow hover:bg-gray-100 cursor-pointer">
//                                                 <Eye size={20} />
//                                             </button>
//                                         </div>

//                                         <div>
//                                             <Image src={product.image[0] || "/assets/images/Led.png"} width={172} height={129} alt="" className="cursor-pointer" />
//                                         </div>

//                                         <button
//                                             onClick={(e) => handleAddToCart(product._id, e)}
//                                             disabled={inCart}
//                                             className={`font-[Poppins] font-[500] text-[16px] leading-[24px] absolute bottom-0 left-0 w-full py-2 text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ${inCart
//                                                 ? "bg-green-600 text-white cursor-not-allowed"
//                                                 : "bg-black text-white hover:bg-gray-800"
//                                                 }`}
//                                         >
//                                             {inCart ? "Added to Cart" : "Add To Cart"}
//                                         </button>
//                                     </div>

//                                     <div className='gap-[8px] flex flex-col'>
//                                         <h3 className="font-[Poppins] font-[500] text-[16px] leading-[24px]">{product.name}</h3>
//                                         <div className="flex items-center gap-2">
//                                             <span className="text-red-600 font-[Poppins] font-[500] text-[16px] leading-[24px]">${product.price}</span>
//                                             {product.oldPrice && (
//                                                 <span className="line-through text-gray-400 font-[Poppins] font-[500] text-[16px]">
//                                                     ${product.oldPrice}
//                                                 </span>
//                                             )}
//                                         </div>

//                                         <div className="flex items-center text-yellow-400 text-[16px]">
//                                             {"★".repeat(Math.round(product.rating))}
//                                             {"☆".repeat(5 - Math.round(product.rating))}
//                                             <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
//                                                 ({product.review})
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }










"use client"
import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image';
import { Heart, Eye } from "lucide-react";
import Link from 'next/link';
import { useWishlist } from '../Api1/wishlist';
import { MyContext } from "../context/MyContext";
import { InsertCart } from "../Api1/Cart/insertCart";
import { GetCart } from '../Api1/Cart/getCart';
import { GetDataByCategory } from './../Api1/getData';
import { showToast } from './toast';
import Loader from './loader';
import { Package, User, CreditCard, Clock, CheckCircle, XCircle, RefreshCw, Truck, MapPin, Mail, Phone } from 'lucide-react';


export default function wishlistSec() {
    const [Wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cartIds, setCartIds] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const { getItem, removeItem, insertItem } = useWishlist();
    const { cartLength, setcartLength, wishlistIds, addToWishlist, removeFromWishlist } = useContext(MyContext);

    const syncCartItems = async () => {
        try {
            const data = await GetCart();
            if (data && data.cart && Array.isArray(data.cart)) {
                const itemIds = data.cart.map(item => item.itemId._id);
                setCartIds(itemIds);
                localStorage.setItem("CartItems", JSON.stringify(itemIds));
            } else {
                setCartIds([]);
                localStorage.setItem("CartItems", JSON.stringify([]));
            }
        } catch (error) {
            console.error("Error syncing cart items:", error);
        }
    };

    useEffect(() => {
        syncCartItems();
        const fetchData = async () => {
            try {


                const product = await GetDataByCategory();
                console.log("Product", product);

                setProducts(product?.item.slice(0, 4) || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchData();


    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                syncCartItems();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setIsLoading(true);
                const data = await getItem();
                console.log("data", data);
                setWishlist(data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleAddToCart = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        const user = localStorage.getItem("user");
        if (user) {
            try {
                await InsertCart(productId);

                if (!cartIds.includes(productId)) {
                    const updatedCartIds = [...cartIds, productId];
                    setCartIds(updatedCartIds);
                    localStorage.setItem("CartItems", JSON.stringify(updatedCartIds));
                }

                setcartLength(cartLength + 1);
                showToast("Added to Cart", "success");
            } catch (error) {
                console.error("Error adding to cart:", error);
                alert("Failed to add item to cart");
            }
        }
        else {
            showToast("Login to Add", "error")
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeItem(id);
            removeFromWishlist(id);

            setWishlist((prev) => {
                if (!Array.isArray(prev)) return [];

                const updated = prev.filter((item) => item._id !== id);
                const updatedIds = updated.map((item) => item._id);
                localStorage.setItem("Wishlist", JSON.stringify(updatedIds));
                console.log("Updated", updated);

                return updated;
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleMoveAllToBag = async () => {



        try {
            const promises = Wishlist.map(async (product) => {
                if (!cartIds.includes(product._id)) {
                    return InsertCart(product._id);
                }
                return null;
            });

            await Promise.all(promises);

            const newCartIds = [...cartIds];
            Wishlist.forEach(product => {
                if (!newCartIds.includes(product._id)) {
                    newCartIds.push(product._id);
                }
            });

            setCartIds(newCartIds);
            localStorage.setItem("CartItems", JSON.stringify(newCartIds));
            setcartLength(newCartIds.length);

            showToast("All items moved to cart successfully!", "success");
        } catch (error) {
            console.error("Error moving items to cart:", error);
            alert("Failed to move some items to cart");
        }
    };


    const handleWishlistToggle = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const isCurrentlyWishlisted = wishlistIds?.includes(productId);

            if (isCurrentlyWishlisted) {
                await removeItem(productId);
                removeFromWishlist(productId);


                setWishlist(prev => prev.filter(item => item._id !== productId));
            } else {
                await insertItem(productId);
                addToWishlist(productId);


                const newProduct = products.find(p => p._id === productId);
                if (newProduct) {
                    setWishlist(prev => [...prev, newProduct]);
                }
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            alert("Failed to update wishlist");
        }
    };
    if (isLoading && isLoadingProducts) {
        return <Loader />;
    }
    return (
        <div className='flex flex-col gap-[80px] max-w-[1170px] w-full'>
            <div className='mt-[80px] flex flex-col gap-[60px] items-center'>
                <div className='flex w-full justify-between'>
                    <div className='flex flex-col gap-[24px] items-center justify-center'>
                        <h1 className='font-[Poppins] font-[400] text-[20px] leading-[26px] text-black'>
                            Wishlist({isLoading ? "..." : Wishlist.length})
                        </h1>
                    </div>
                    <div className='flex gap-[8px]'>
                        <button
                            onClick={handleMoveAllToBag}
                            disabled={isLoading || Wishlist.length === 0}
                            className={`justify-center items-center flex font-[Poppins] font-[500] text-[16px] leading-[24px] px-[48px] py-[16px] cursor-pointer ${isLoading || Wishlist.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#F5F5F5] hover:bg-gray-200'
                                }`}
                        >
                            Move All To Bag
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className='max-w-[1170px] mx-[135px] mt-[80px]'>
                        <div className='flex justify-center items-center py-[100px]'>
                            <p className='font-[Poppins] text-[18px]'>Loading wishlist...</p>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-4 gap-x-[30px] gap-y-[60px]'>
                        {Wishlist?.map((product, id) => {
                            const inCart = cartIds?.includes(product._id);

                            return (
                                <Link key={id} href={`/productDetail/${product._id}`}>
                                    <div className="flex flex-col  max-w-[270px] min-w-[270px] w-full min-h-[350px] max-h-[350px] h-full gap-[16px]">
                                        <div className='relative group overflow-hidden bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full flex justify-center items-center'>
                                            {product.discount && (
                                                <span className="absolute top-[12px] left-[12px] font-[Poppins] h-[26px] font-[400] text-[12px] leading-[18px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
                                                    {product.discount}%
                                                </span>
                                            )}

                                            <div className="absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleRemove(product._id);
                                                    }}
                                                    className="w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex shadow hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
                                                >
                                                    <Image src="/assets/icons/delete.svg" alt="" width={24} height={24} />
                                                </button>
                                            </div>

                                            <div>
                                                <Image src={product.image[0] || "assets/images/Led.png"} width={270} height={250} alt="" className="cursor-pointer max-h-[270px] max-w-[250px] min-h-[250px] min-w-[270px] w-full h-full object-cover" />
                                            </div>

                                            <button
                                                onClick={(e) => handleAddToCart(product._id, e)}
                                                disabled={inCart}
                                                className={`font-[Poppins] font-[500] text-[16px] leading-[24px] absolute bottom-0 left-0 w-full py-2 text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ${inCart
                                                    ? "bg-green-600 text-white cursor-not-allowed"
                                                    : "bg-black text-white hover:bg-gray-800"
                                                    }`}
                                            >
                                                {inCart ? "Added to Cart" : "Add To Cart"}
                                            </button>
                                        </div>

                                        <div className='gap-[8px] flex flex-col'>
                                            <h3 className="font-[Poppins] font-[500] text-[16px] leading-[24px]">{product.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-600 font-[Poppins] font-[500] text-[16px] leading-[24px]">${product.price}</span>
                                                {product.discountPrice && (
                                                    <span className="text-[#757575] font-[Poppins] font-[400] text-[14px] leading-[20px] line-through">${product.discountPrice}</span>
                                                )}
                                            </div>

                                            {product.rating && (
                                                <div className="flex items-center text-yellow-400 text-[16px]">
                                                    {"★".repeat(Math.round(product.rating))}
                                                    {"☆".repeat(5 - Math.round(product.rating))}
                                                    <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px]">
                                                        ({product.review})
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>


            <div className='flex flex-col gap-[60px] items-center'>
                <div className='flex w-full justify-between'>
                    <div className='flex flex-col gap-[24px] items-center justify-center'>
                        <h1 className='font-[Poppins] font-[400] text-[20px] leading-[26px] text-black'>For you</h1>
                    </div>
                    <div className='flex gap-[8px]'>
                        <Link href="/allProduct"><button className='justify-center items-center flex bg-[#F5F5F5] font-[Poppins] font-[500] text-[16px] leading-[24px] px-[48px] py-[16px] cursor-pointer hover:bg-gray-200'>
                            See All
                        </button></Link>
                    </div>
                </div>

                {isLoadingProducts ? (
                    <Loader />
                ) : (
                    <div className='grid grid-cols-4 gap-x-[30px] gap-y-[60px]'>
                        {products.map((product) => {
                            const wishlisted = wishlistIds?.includes(product._id);
                            const inCart = cartIds?.includes(product._id);

                            return (
                                <Link key={product._id} href={`/productDetail/${product._id}`}>
                                    <div className="flex flex-col min-w-[270px] max-w-[270px]  max-h-[350px] w-full min-h-[350px] h-full gap-[16px]">
                                        <div className='relative group overflow-hidden bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full flex justify-center items-center'>
                                            {product.discount && (
                                                <span className="absolute top-[12px] left-[12px] font-[Poppins] h-[26px] font-[400] text-[12px] leading-[18px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
                                                    {product.discount}%
                                                </span>
                                            )}

                                            <div className="absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end">
                                                <button
                                                    onClick={(e) => handleWishlistToggle(product._id, e)}
                                                    className="w-[34px] h-[34px] cursor-pointer bg-white rounded-full flex justify-center items-center shadow hover:bg-gray-100"
                                                >
                                                    <Heart
                                                        fill={wishlisted ? "red" : "none"}
                                                        color={wishlisted ? "red" : "black"}
                                                        size={20}
                                                    />
                                                </button>
                                                <button className="w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex shadow hover:bg-gray-100 cursor-pointer">
                                                    <Eye size={20} />
                                                </button>
                                            </div>

                                            <div>
                                                <Image
                                                    src={product.image[0] || "/assets/images/Led.png"}
                                                    width={172}
                                                    height={129}
                                                    alt=""
                                                    className="cursor-pointer max-h-[270px] max-w-[250px] min-h-[250px] min-w-[270px] w-full h-full object-cover"
                                                />
                                            </div>

                                            <button
                                                onClick={(e) => handleAddToCart(product._id, e)}
                                                disabled={inCart}
                                                className={`font-[Poppins] font-[500] text-[16px] leading-[24px] absolute bottom-0 left-0 w-full py-2 text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ${inCart
                                                    ? "bg-green-600 text-white cursor-not-allowed"
                                                    : "bg-black text-white hover:bg-gray-800"
                                                    }`}
                                            >
                                                {inCart ? "Added to Cart" : "Add To Cart"}
                                            </button>
                                        </div>

                                        <div className='gap-[8px] flex flex-col'>
                                            <h3 className="font-[Poppins] font-[500] text-[16px] leading-[24px]">{product.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-600 font-[Poppins] font-[500] text-[16px] leading-[24px]">${product.discountPrice}</span>
                                                {product.oldPrice && (
                                                    <span className="line-through text-gray-400 font-[Poppins] font-[500] text-[16px]">
                                                        ${product.price}
                                                    </span>
                                                )}
                                            </div>

                                            {product.rating && (
                                                <div className="flex items-center text-yellow-400 text-[16px]">
                                                    {"★".repeat(Math.round(product.rating))}
                                                    {"☆".repeat(5 - Math.round(product.rating))}
                                                    <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                                        ({product.review})
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}