import "./_index.scss";
import { createPortal } from "react-dom";
import { Activity } from "react";
import type { HTMLAttributes } from "react";
import { Close } from "@mui/icons-material";
import Button from "../Button";
import { useMenus } from "../../store/menuStore";

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    title: string,
    open: boolean,
}

export default function Menu({ 
    children,
    className = "",
    title,
    open,
    ...props 
}: MenuProps) {
    const closeAllMenus = useMenus(state => state.closeAllMenus);

    return createPortal(
        <Activity mode={ open ? "visible" : "hidden" }>
            <div>
                <div 
                    className="menu-backdrop" 
                    onClick={() => closeAllMenus()}
                />

                <div
                    className={`menu ${className}`}
                    { ...props }
                >
                    <header className="menu-header">
                        <h2 className="menu-title">
                            { title }
                        </h2>

                        <Button 
                            buttonStyle="floating"
                            icon
                            className="close-button"
                            onClick={() => closeAllMenus()}
                            aria-label="menu close button"
                        >
                            <Close />
                        </Button>
                    </header>
                    
                    <div className="menu-body">
                        { children }
                    </div>
                </div>
            </div>
        </Activity>,
        document.querySelector("#portal") as HTMLDivElement
    );
}