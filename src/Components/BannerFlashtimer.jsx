
"use client";

import { useState, useEffect } from "react";

export default function BannerFlashSaleTimer() {
    const targetDate = new Date("2026-09-21T00:00:00").getTime();

    const [time, setTime] = useState("00:00:00:00");

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTime("00:00:00:00");
                return;
            }

            const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
            const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
            const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0");
            const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");

            setTime(`${days}:${hours}:${minutes}:${seconds}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    const [days, hours, minutes, seconds] = time.split(":");

    return (
        <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>

            <div className=" flex justify-center gap-[24px]" >

                <TimeBox label="Days" value={days} />
                <TimeBox label="Hours" value={hours} />
                <TimeBox label="Minutes" value={minutes} />
                <TimeBox label="Seconds" value={seconds} />
            </div>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="rounded-full w-[62px] h-[62px] flex flex-col justify-center items-center bg-white" style={{ textAlign: "center" }}>
            <div className="font-[600] font-[Inter] text-[16px] text-black leading-[20px] tracking-[0%]">{value}</div>
            <div className="font-[400] font-[Poppins] text-[11px] text-black leading-[18px] tracking-[0%]">{label}</div>

        </div>
    );
}

