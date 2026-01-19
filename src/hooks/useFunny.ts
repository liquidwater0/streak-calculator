import { useEffect } from "react";
import { isToday } from "date-fns";

export default function useFunny() {
    useEffect(() => {
        const isSeriousDay = isToday(new Date(new Date().getFullYear(), 3, 1));
        const testing = false;

        if (isSeriousDay || testing) {
            document.documentElement.dataset.serious = "true";
        }
    }, []);
}