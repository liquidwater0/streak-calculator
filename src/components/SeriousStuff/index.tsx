import "./_index.scss";
import { useEffect } from 'react';
import { isToday } from 'date-fns';

export default function SeriousStuff() {
    const isSeriousDay = isToday(new Date(new Date().getFullYear(), 3, 1));
    const testing = false;

    useEffect(() => {
        if (isSeriousDay || testing) {
            document.documentElement.dataset.serious = "true";
        }
    }, []);
}