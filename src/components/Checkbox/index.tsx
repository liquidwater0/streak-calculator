import "./_index.scss";
import { useRef } from "react";
import type { HTMLAttributes } from "react";
import { Check } from "@mui/icons-material";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {}

export default function Checkbox({
    className = "",
    ...props 
}: CheckboxProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                type="checkbox"
                className={`hidden ${className}`}
                ref={inputRef}
                { ...props }
            />

            <button 
                className="checkbox"
                onClick={() => inputRef.current?.click()}
            >
                <Check />
            </button>
        </>
    );
}