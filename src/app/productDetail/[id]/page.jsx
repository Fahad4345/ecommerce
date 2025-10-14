"use client"
import React, { useEffect, useState, useContext } from 'react'
import Navbar from "../../../Components/NavBar";
import { useSearchParams } from 'next/navigation';
import getItem from "../../../Api1/getItem"
import { useParams } from "next/navigation";
import Image from 'next/image'
import { useWishlist } from "../../../Api1/wishlist"
import { InsertCart } from '../../../Api1/Cart/insertCart';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { UpdateCart } from '../../../Api1/Cart/updateCart';
import { clearCart } from './../../../store/productSlice';
import { GetDataByCategory } from './../../../Api1/getData';
import { MyContext } from '../../../context/MyContext';
import { GetCart } from './../../../Api1/Cart/getCart';
import Link from 'next/link';
import { Heart, Eye } from "lucide-react";
import { showToast } from './../../../Components/toast';
import Loader from '../../../Components/loader';

export default function ProductDetail() {

    const Cartitem = useSelector(state => state.cart.items);
    const router = useRouter();
    const { insertItem, removeItem } = useWishlist();
    const [size, setSize] = useState("Sm");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const searchParams = useSearchParams();
    const isCartItem = searchParams.get('cart')
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [products, setProducts] = useState([]);
    const [cartIds, setCartIds] = useState([]);

    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const dispatch = useDispatch();
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));
    const handleIncrement = () => setQuantity(prev => prev + 1);
    const { cartLength, setcartLength, wishlistIds, addToWishlist, removeFromWishlist, user } = useContext(MyContext);

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

    const handleAddToCart = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        const user = localStorage.getItem("user");
        if (user) {
            console.log("If Running");
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
            console.log("elseRunning");
            showToast("Login to Add", "error")
        }
    };

    const handleWishlistToggle = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        const user = localStorage.getItem("user");
        if (user) {
            try {
                if (wishlistIds?.includes(productId)) {
                    await removeItem(productId);
                    removeFromWishlist(productId);
                } else {
                    await insertItem(productId);
                    addToWishlist(productId);
                }
            } catch (error) {
                console.error("Error toggling wishlist:", error);
                alert("Failed to update wishlist");
            }
        }
        else {
            showToast("Login to add", "error");
            router.push("/login");
        }
    };

    useEffect(() => {
        if (user) {
            syncCartItems();
        }

        const fetchItem = async () => {
            try {
                const product = await getItem(id);
                const fetchedItem = product.item;
                if (!fetchedItem) return;

                setItem(fetchedItem);
                setMainImage(fetchedItem.image?.[0] || "");
                setSize(fetchedItem.sizes?.[0] || "Sm");
                setSelectedColor(fetchedItem.color?.[0] || "");
                setQuantity(1);
            } catch (err) {
                console.error(err);
            }
        };

        if (Cartitem && id === "cart-item") {
            setItem(Cartitem.itemId);
            setMainImage(Cartitem.itemId.image?.[0] || "");
            setSize(Cartitem.size || Cartitem.itemId.sizes?.[0] || "Sm");
            setSelectedColor(Cartitem.color || Cartitem.itemId.color?.[0] || "");
            setQuantity(Cartitem.quantity || 1);
        } else {
            fetchItem();
        }
    }, [Cartitem, id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await GetDataByCategory();
                setProducts(product?.item.slice(0, 4) || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchData();
    }, []);

    const smallImages = item?.image?.slice(1, 5);

    if (!item) return <>  <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} /><Loader /></>

    return (
        <div className='flex bg-white justify-center items-center flex-col h-full'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className='mx-[135px] mt-[80px] max-w-[1170px] w-full'>
                <div className='flex gap-[70px]'>

                    <div className='flex gap-[30px]'>
                        <div className='flex flex-col gap-[16px]'>
                            {smallImages?.map((img, idx) => {
                                const isSelected = mainImage === img;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`w-[170px] h-[138px] flex justify-center items-center rounded-[4px] bg-[#F5F5F5] cursor-pointer border-2 transition-all ${isSelected ? 'border-black scale-105' : 'border-transparent'}`}
                                    >
                                        <Image src={img} width={121} height={114} alt="" className='max-h-[138px] max-w-[170px] min-h-[138px] min-w-[170px] w-full h-full object-cover' />
                                    </div>
                                )
                            })}
                        </div>

                        <div className='w-[500px] h-[600px] flex justify-center items-center rounded-[4px] bg-[#F5F5F5]'>
                            <Image src={mainImage} width={500} height={600} alt="" className='max-h-[600px] max-w-[500px] min-h-[600px] min-w-[500px] w-full h-full object-cover' />
                        </div>
                    </div>

                    <div className='flex flex-col'>

                        <h1 className='font-[Inter] font-[600] text-[24px] leading-[24px] tracking-[3%]'>{item.name}</h1>

                        <div className='flex items-center gap-[16px] mt-[8px]'>
                            <div className="flex items-center text-yellow-400 text-[20px]">
                                {"★".repeat(Math.round(item.rating || 0))}
                                {"☆".repeat(5 - Math.round(item.rating || 0))}
                                <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                    ({item.review || 0} Reviews)
                                </span>
                            </div>
                            <div className='w-[2px] h-[16px] bg-[#000000]/50'></div>
                            <h1 className='font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px] text-green-500'>InStock</h1>
                        </div>

                        <p className='mt-[24px] font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px]'>{item.description}</p>


                        <div className='flex gap-[8px] mt-[24px] items-center'>
                            <label className='font-[Poppins] font-[400] text-[20px] leading-[20px] tracking-[3%]'>Colors:</label>
                            <div className='flex gap-[8px]'>
                                {item.color?.map((color, idx) => {
                                    const normalizedColor = color.toLowerCase();
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedColor(normalizedColor)}
                                            className={`flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer border-2 transition-transform duration-200
                                                ${selectedColor.toLowerCase() === normalizedColor ? 'scale-110 border-black' : 'border-transparent'}`}
                                            style={{ backgroundColor: selectedColor === normalizedColor ? 'transparent' : normalizedColor }}
                                        >
                                            {selectedColor === normalizedColor && (
                                                <div className='w-4 h-4 rounded-full' style={{ backgroundColor: normalizedColor }}></div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        <div className='flex gap-[24px] mt-[16px] items-center'>
                            <label className='font-[Poppins] font-[400] text-[20px] leading-[20px] tracking-[3%]'>Size:</label>
                            <div className=' flex gap-[16px]'>{item.sizes?.map((option, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSize(option)}
                                    className={`flex gap-[16px] w-[32px] h-[32px] border-[1px] rounded-[4px] justify-center items-center font-[Poppins] font-[500] text-[14px] leading-[21px] cursor-pointer transition-colors duration-200
                                        ${size === option ? 'bg-[#DB4444] text-[#FFFFFF]' : 'border-[#000000]/20 text-[#000]'}`}
                                >
                                    {option}
                                </div>
                            ))}</div>
                        </div>

                        <div className='flex mt-[16px] items-center gap-[16px]'>
                            <div className='flex border-[1px] border-[#00000080] rounded-[4px]'>
                                <button onClick={handleDecrement} className=' cursor-pointer px-3 py-2'>-</button>
                                <span className='py-[8px] px-[34px] border-l-[1px] border-r-[1px] font-[500] text-[20px] leading-[28px] font-[Poppins]'>{quantity}</span>
                                <button onClick={handleIncrement} className=' cursor-pointer px-3 py-2'>+</button>
                            </div>

                            <button
                                onClick={() => {
                                    if (Cartitem) {
                                        UpdateCart(Cartitem.itemId._id, selectedColor, size, quantity);
                                        router.push("/cart")

                                    } else {
                                        if (user) {
                                            InsertCart(item._id, size, selectedColor, quantity);
                                            router.push("/cart");
                                        }
                                        else {
                                            showToast("Login to add", "error");
                                            router.push("/login");
                                        }

                                    }
                                }}
                                className='px-[42px] py-[10px] font-[500] text-[16px] cursor-pointer font-[Poppins] leading-[24px] bg-[#DB4444] tracking-[0px] text-white rounded-[4px]'
                            >
                                {Cartitem ? "Buy Now" : "Add to Cart"}
                            </button>

                            <div onClick={(e) => handleWishlistToggle(item._id, e)} className='w-[40px] h-[40px] border border-[#00000080] rounded-[4px] flex justify-center items-center cursor-pointer'>
                                <Heart
                                    fill={wishlistIds?.includes(item._id) ? "red" : "none"}
                                    color={wishlistIds?.includes(item._id) ? "red" : "black"}
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {isLoadingProducts ? (
                <Loader />
            ) : (
                <div className=' mt-[140px]'>
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex items-center gap-[16px]">
                            <div className="bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]"></div>
                            <h1 className="font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]">
                                Related Item
                            </h1>
                        </div>
                    </div>

                    <div className='grid grid-cols-4 gap-x-[30px] gap-y-[60px] mt-[60px]'>
                        {products.map((product) => {
                            const inCart = cartIds?.includes(product._id);
                            return (
                                <Link key={product._id} href={`/productDetail/${product._id}`}>
                                    <div className="flex flex-col min-w-[270px]  max-w-[270px] w-full min-h-[350px]  max-h-[350px] h-full gap-[16px]">
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
                                                        fill={wishlistIds?.includes(product._id) ? "red" : "none"}
                                                        color={wishlistIds?.includes(product._id) ? "red" : "black"}
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
                                                className={`font-[Poppins] font-[500] text-[16px] cursor-pointer leading-[24px] absolute bottom-0 left-0 w-full py-2 text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ${inCart
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
                </div>
            )}
        </div>
    )
}
