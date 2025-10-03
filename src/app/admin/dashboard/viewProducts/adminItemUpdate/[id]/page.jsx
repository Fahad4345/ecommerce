"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import getItem from "../../../../../../Api1/getItem"

import { useParams } from "next/navigation";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { showToast } from '../../../../../../Components/toast';
import AdminNavBar from '../../../../../../Components/AdminNavBar';
import Loader from '../../../../../../Components/loader';
import Guardwrapper from '../../../../../../Components/Guardwrapper';

export default function ProductDetail() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState("");
    const [item, setItem] = useState(null);
    const searchParams = useSearchParams();
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const { id } = useParams();
    const [mainImage, setMainImage] = useState("");

    const allSizes = ["Sm", "Md", "Lg", "Xl"];
    const updateItem = async (id, updatedData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/item/Update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const product = await getItem(id);
                const fetchedItem = product.item;
                if (!fetchedItem) return;

                setItem(fetchedItem);
                setName(fetchedItem.name || "");
                setDescription(fetchedItem.description || "");
                setPrice(fetchedItem.price || "");
                setMainImage(fetchedItem.image?.[0] || "");
                setSelectedSizes(fetchedItem.sizes || []);
                setColors(fetchedItem.color || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleSizeToggle = (size) => {
        setSelectedSizes(prev => {
            if (prev.includes(size)) {
                return prev.filter(s => s !== size);
            } else {
                return [...prev, size];
            }
        });
    };

    const handleAddColor = () => {
        if (colorInput.trim() && !colors.includes(colorInput.trim())) {
            setColors([...colors, colorInput.trim()]);
            setColorInput("");
        }
    };

    const handleRemoveColor = (colorToRemove) => {
        setColors(colors.filter(c => c !== colorToRemove));
    };

    const handleUpdateItem = async () => {
        if (!name.trim()) {
            showToast('Please enter a product name', 'error');
            return;
        }
        if (!price || parseFloat(price) <= 0) {
            showToast('Please enter a valid price', 'error');
            return;
        }
        if (selectedSizes.length === 0) {
            showToast('Please select at least one size', 'error');
            return;
        }
        if (colors.length === 0) {
            showToast('Please add at least one color', 'error');
            return;
        }

        setIsUpdating(true);
        try {
            const updatedData = {
                name: name,
                description: description,
                price: parseFloat(price),
                sizes: selectedSizes,
                color: colors,
            };

            const response = await updateItem(id, updatedData);
            console.log("Update response:", response);
            if (response) {
                showToast('Item updated successfully!', 'success');
                const product = await getItem(id);
                setItem(product.item);
            }
        } catch (error) {
            console.error('Error updating item:', error);
            showToast('Failed to update item. Please try again.', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    const smallImages = item?.image?.slice(1, 5);

    if (isLoadingProducts) {
        return (<>
            <AdminNavBar />

            <Loader /></>
        );
    }

    if (!item) {
        return (
            <div className='max-w-[1170px] h-[500px] flex justify-center items-center mx-[135px] mt-[80px]'>
                <div className='flex justify-center items-center py-[100px]'>
                    <p className='font-[Poppins] text-[18px]'>Item not found</p>
                </div>
            </div>
        );
    }

    return (
        <Guardwrapper><div className='flex bg-white justify-center items-center flex-col h-full '>
            <AdminNavBar />

            <div className='mx-[135px] mt-[80px] max-w-[1170px] w-full mb-[80px]'>
                <div className='flex gap-[70px]'>

                    <div className='flex gap-[30px]'>
                        <div className='flex flex-col gap-[16px]'>
                            {smallImages?.map((img, idx) => {
                                const isSelected = mainImage === img;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`w-[170px] overflow-hidden h-[138px] flex justify-center items-center rounded-[4px] bg-[#F5F5F5] cursor-pointer border-2 transition-all ${isSelected ? 'border-black scale-105' : 'border-transparent'}`}
                                    >
                                        <Image src={img} width={170} height={137} alt="" />
                                    </div>
                                )
                            })}
                        </div>

                        <div className='w-[500px] overflow-hidden h-[600px] flex justify-center items-center rounded-[4px] bg-[#F5F5F5]'>
                            {mainImage && <Image src={mainImage} width={500} height={600} alt="" />}
                        </div>
                    </div>

                    <div className='flex flex-col flex-1'>

                        <div className='mb-[16px]'>
                            <label className='font-[Poppins] font-[500] text-[14px] text-gray-700 mb-[8px] block'>
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full px-[16px] py-[10px] border-[1px] border-[#000000]/20 rounded-[4px] font-[Inter] text-[16px] focus:outline-none focus:border-[#DB4444]'
                                placeholder='Enter product name'
                            />
                        </div>

                        {/* <div className='flex items-center gap-[16px] mb-[16px]'>
                            <div className="flex items-center text-yellow-400 text-[20px]">
                                {"★".repeat(Math.round(item.rating || 0))}
                                {"☆".repeat(5 - Math.round(item.rating || 0))}
                                <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                    ({item.review || 0} Reviews)
                                </span>
                            </div>
                            <div className='w-[2px] h-[16px] bg-[#000000]/50'></div>
                            <h1 className='font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px] text-green-500'>InStock</h1>
                        </div> */}

                        <div className='mb-[16px]'>
                            <label className='font-[Poppins] font-[500] text-[14px] text-gray-700 mb-[8px] block'>
                                Price ($)
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='w-full px-[16px] py-[10px] border-[1px] border-[#000000]/20 rounded-[4px] font-[Poppins] text-[16px] focus:outline-none focus:border-[#DB4444]'
                                placeholder='Enter price'
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className='mb-[16px]'>
                            <label className='font-[Poppins] font-[500] text-[14px] text-gray-700 mb-[8px] block'>
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full px-[16px] py-[10px] border-[1px] border-[#000000]/20 rounded-[4px] font-[Poppins] text-[14px] focus:outline-none focus:border-[#DB4444] resize-none'
                                placeholder='Enter product description'
                                rows={4}
                            />
                        </div>

                        <div className='mb-[16px]'>
                            <label className='font-[Poppins] font-[500] text-[14px] text-gray-700 mb-[8px] block'>
                                Colors
                            </label>
                            <div className='flex gap-[8px] mb-[8px] flex-wrap'>
                                {colors.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className='flex items-center gap-[8px] px-[12px] py-[6px] bg-[#F5F5F5] rounded-[4px] border-[1px] border-[#000000]/20'
                                    >
                                        <div
                                            className='w-[20px] h-[20px] rounded-full border-[1px] border-[#000000]/30'
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        ></div>
                                        <span className='font-[Poppins] text-[14px]'>{color}</span>
                                        <X
                                            size={16}
                                            className='cursor-pointer text-gray-500 hover:text-red-500'
                                            onClick={() => handleRemoveColor(color)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='flex gap-[8px]'>
                                <input
                                    type="text"
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddColor()}
                                    className='flex-1 px-[16px] py-[8px] border-[1px] border-[#000000]/20 rounded-[4px] font-[Poppins] text-[14px] focus:outline-none focus:border-[#DB4444]'
                                    placeholder='Enter color name (e.g., red, #FF0000)'
                                />
                                <button
                                    onClick={handleAddColor}
                                    className='px-[20px] py-[8px] bg-[#000000] text-white rounded-[4px] font-[Poppins] text-[14px] hover:bg-[#333333]'
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className='mb-[24px]'>
                            <label className='font-[Poppins] font-[500] text-[14px] text-gray-700 mb-[8px] block'>
                                Available Sizes
                            </label>
                            <div className='flex gap-[12px] flex-wrap'>
                                {allSizes.map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => handleSizeToggle(size)}
                                        className={`w-[50px] h-[40px] border-[1px] rounded-[4px] flex justify-center items-center font-[Poppins] font-[500] text-[14px] cursor-pointer transition-colors duration-200
                                            ${selectedSizes.includes(size)
                                                ? 'bg-[#DB4444] text-white border-[#DB4444]'
                                                : 'border-[#000000]/20 text-[#000] hover:border-[#DB4444]'
                                            }`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex items-center gap-[16px]'>
                            <button
                                onClick={handleUpdateItem}
                                disabled={isUpdating}
                                className={`px-[48px] py-[12px] font-[500] text-[16px] font-[Poppins] leading-[24px] bg-[#DB4444] tracking-[0px] text-white rounded-[4px] transition-all
                                    ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#c43939]'}`}
                            >
                                {isUpdating ? 'Updating...' : 'Update Item'}
                            </button>

                            <button
                                onClick={() => router.back()}
                                className='px-[48px] py-[12px] font-[500] text-[16px] font-[Poppins] leading-[24px] bg-gray-200 text-gray-700 rounded-[4px] hover:bg-gray-300 transition-all'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div></Guardwrapper>

    )
}