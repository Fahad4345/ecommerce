"use client"
import React, { useState, useRef, useEffect } from 'react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const dropdownRef = useRef(null);

    const languages = [
        { value: 'English', label: 'English' },
        { value: 'Chinese', label: 'Chinese' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'French', label: 'French' }
    ];


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (language) => {
        setSelectedLanguage(language.label);
        setIsOpen(false);
    };

    return (
        <div className='bg-[#000000] w-full justify-center items-center flex'>
            <div className='flex max-w-[1440px] w-full flex-row gap-[231px] py-[12px] pl-[445px] max-h-[48px]'>
                <div className='flex items-center gap-[8px]'>
                    <p className='font-[Poppins] font-[400] text-[14px] leading-[21px] text-white'>
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                    </p>
                    <span className='font-[600] font-[Poppins] text-[14px] leading-[24px] underline cursor-pointer text-white hover:text-gray-300 transition-colors'>
                        ShopNow
                    </span>
                </div>

                <div className="relative" ref={dropdownRef}>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 bg-transparent text-white font-[400] font-[Poppins] text-[14px] leading-[21px] cursor-pointer border-none outline-none hover:text-gray-300 transition-colors"
                    >
                        {selectedLanguage}
                        <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            className={`text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>


                    {isOpen && (
                        <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[120px] overflow-hidden">
                            {languages.map((language, index) => (
                                <button
                                    key={language.value}
                                    onClick={() => handleSelect(language)}
                                    className={`w-full text-left px-4 py-3 font-[Poppins] text-[14px] leading-[21px] transition-colors duration-150 ${selectedLanguage === language.label
                                        ? 'bg-[#DB4444] text-white'
                                        : 'text-black hover:bg-gray-100'
                                        } ${index === 0 ? 'rounded-t-md' : ''} ${index === languages.length - 1 ? 'rounded-b-md' : ''}`}
                                >
                                    {language.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}