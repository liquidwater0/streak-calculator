import "./_index.scss";
import Button from "../Button";
import { cloneElement, Children, isValidElement } from "react";
import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

interface ButtonToggleProps extends HTMLAttributes<HTMLDivElement> {
    buttonStyle: "primary" | "secondary"
}

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    selected: boolean,
    icon?: boolean
}

export default function ButtonToggle({
    children,
    className = "", 
    buttonStyle,
    ...props 
}: ButtonToggleProps) {
    const buttons = Children.map(children, button => {
        if (isValidElement(button)) {
            return cloneElement(button as any, { buttonStyle });
        }

        return button;
    });

    return (
        <div
            className={`button-toggle ${className}`}
            { ...props }
        >
            { buttons }
        </div>
    );
}

function ToggleButton({
    children,
    className = "", 
    selected,
    icon = false,
    ...props 
}: ToggleButtonProps) {
    return (
        <Button
            className={`${selected ? "selected" : ""} ${className}`}
            buttonStyle={(props as any).buttonStyle}
            icon={icon}
            { ...props }
        >
            { children }
        </Button>
    );
}

ButtonToggle.Button = ToggleButton;