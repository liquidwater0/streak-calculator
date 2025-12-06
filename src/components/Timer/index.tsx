import "./_index.scss";
import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const TIMEOUT_DELAY_MS = 500;

interface TimerProps extends HTMLAttributes<HTMLDivElement>  {
    utcOffset: number,
    label?: string
};

function pad(n: number) {
    return String(Math.floor(n)).padStart(2, "0");
}

function getNextResetTimestamp(utcOffset = 0) {
    const now = new Date();

    const reset = new Date(now);
    reset.setUTCHours(24 + utcOffset, 0, 0, 0);

    while (reset.getTime() <= now.getTime()) {
        reset.setUTCDate(reset.getUTCDate() + 1);
    }

    return reset.getTime();
}

export default function Timer({ 
    utcOffset, 
    label = "",
    className = "",
    ...props
}: TimerProps) {
    const [timeRemaining, setTimeRemaining] = useState<string>("24h 00m 00s");
    const [percentage, setPercentage] = useState<number>(100);

    const utcOffsetRef = useRef<number>(utcOffset);
    const resetRef = useRef<number>(getNextResetTimestamp(utcOffset));
    const timeoutRef = useRef<number | null>(null);
    
    useEffect(() => {
        utcOffsetRef.current = utcOffset;
        resetRef.current = getNextResetTimestamp(utcOffset);

        const tick = () => {
            const now = Date.now();
            const resetTime = resetRef.current;

            if (now >= resetTime) {
                const next = getNextResetTimestamp(utcOffsetRef.current);
                resetRef.current = next;

                setTimeRemaining("24h 00m 00s");
                setPercentage(100);

                timeoutRef.current = setTimeout(tick, TIMEOUT_DELAY_MS);

                return;
            }

            const remainingMs = resetTime - now;
            const remainingSec = remainingMs / 1000;

            const hh = pad((remainingSec / 3600) % 24);
            const mm = pad((remainingSec / 60) % 60);
            const ss = pad(remainingSec % 60);

            setTimeRemaining(`${hh}h ${mm}m ${ss}s`);

            const percent = (remainingMs / DAY_MS) * 100;
            setPercentage(Math.max(0, Math.min(100, percent)));

            timeoutRef.current = setTimeout(tick, TIMEOUT_DELAY_MS);
        };

        tick();

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [utcOffset]);

    return (
        <div 
            className={`timer ${className}`}
            { ...props }
        >
            <label className="timer-label">
                { label }
            </label>

            { timeRemaining }
            
            <div 
                className="progress-bar" 
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}