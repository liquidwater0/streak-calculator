import "./_index.scss";
import { useState, Activity } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    invalidMessage?: string
}

export default function Input({
    className = "",
    invalidMessage = "Invalid",
    ...props 
}: InputProps) {
    const [valid, setValid] = useState<boolean | undefined>(undefined);
    const isValid = valid || valid === undefined;

    return (
        <div className="input-container">
            <Activity mode={ isValid ? "hidden" : "visible" }>
                <span className="invalid-message">
                    { invalidMessage }
                </span>
            </Activity>
            <input 
                { ...props }
                className={`input ${!isValid ? "invalid" : ""} ${className}`}
                onChange={event => {
                    setValid(event.target.checkValidity());
                    if (props.onChange) props.onChange(event);
                }}
                onBlur={event => {
                    setValid(event.target.checkValidity());
                    if (props.onBlur) props.onBlur(event);
                }}
            />
        </div>
    );
}