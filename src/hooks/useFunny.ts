import "@scss/seriousStuff.scss";
import { isToday } from "date-fns";

export default function useFunny() {
    const isSeriousDay = isToday(new Date(new Date().getFullYear(), 3, 1));
    const testing = false;

    if (isSeriousDay || testing) {
        document.documentElement.dataset.serious = "true";
    }
}