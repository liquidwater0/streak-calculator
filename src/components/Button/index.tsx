import "./_index.scss";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonStyle: "primary" | "secondary" | "floating",
	icon?: boolean
}

export default function Button({ 
	children,
	buttonStyle,
	className = "", 
	icon = false,
	...props 
}: ButtonProps) {
	return (
		<button
			className={`button ${buttonStyle} ${icon ? "icon-button" : ""} ${className}`}
			{ ...props }
		>
			{ children }
		</button>
	);
}