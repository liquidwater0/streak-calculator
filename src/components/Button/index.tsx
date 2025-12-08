import "./_index.scss";
import { useState } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonStyle: "primary" | "secondary" | "success" | "danger" | "floating",
	icon?: boolean
}

type Ripples = {
	id: string,
	x: number,
	y: number
}

export default function Button({ 
	children,
	buttonStyle,
	className = "", 
	icon = false,
	...props 
}: ButtonProps) {
	const [ripples, setRipples] = useState<Ripples[]>([]);

	return (
		<button
			{ ...props }
			className={`button ${buttonStyle} ${icon ? "icon-button" : ""} ${className}`}
			onClick={event => {
				const rect = event.currentTarget.getBoundingClientRect();
				const clickedX = event.clientX - rect.x;
        		const clickedY = event.clientY - rect.y;

				setRipples(prevRipples => {
					const newRipples = [...prevRipples];
					newRipples.push({ id: crypto.randomUUID(), x: clickedX, y: clickedY });
					return newRipples;
				});
				
				if (props.onClick) props.onClick(event);
			}}
		>
			{ children }
			{ripples.map(({ id, x, y }) => (
				<span 
					key={id}
					className="ripple" 
					style={{ "left": x, "top": y }}
					onAnimationEnd={() => {
						setRipples(prevRipples => {
							const newRipples = prevRipples.filter(ripple => ripple.id !== id);
							return newRipples;
						})
					}}
				/>
			))}
		</button>
	);
}