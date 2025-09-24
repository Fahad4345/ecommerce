
"use client";

import { useState, useEffect } from "react";

export default function FlashSaleTimer() {
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

            <div className=" flex justify-center gap-[17px]" >
                <TimeBox label="Days" value={days} />
                <Separator />
                <TimeBox label="Hours" value={hours} />
                <Separator />
                <TimeBox label="Minutes" value={minutes} />
                <Separator />
                <TimeBox label="Seconds" value={seconds} />
            </div>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div style={{ textAlign: "center" }}>
            <div className="font-[500] font-[Poppins] text-[12px] leading-[18px] tracking-[0%]">{label}</div>
            <div className="font-[700] font-[Inter] text-[32px] leading-[30px] tracking-[4%]">{value}</div>
        </div>
    );
}

function Separator() {
    return <div className="flex flex-col gap-[8px] mt-[23px]">
        <div className=" w-[5px] h-[5px] rounded-full bg-[#E07575]"></div>
        <div className=" w-[5px] h-[5px] rounded-full bg-[#E07575]"></div>
    </div>;
}
