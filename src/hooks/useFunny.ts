import { useEffect } from "react";
import { isToday } from "date-fns";

export default function useFunny() {
    useEffect(() => {
        const html = document.documentElement;
        const testing = true;
        const isSeriousDay = isToday(new Date(new Date().getFullYear(), 3, 1)) || testing;

        if (!isSeriousDay) return;

        html.setAttribute("data-serious", "true");

        return () => html.removeAttribute("data-serious");
    }, []);
}