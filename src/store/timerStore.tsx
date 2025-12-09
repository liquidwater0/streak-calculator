import { create } from "zustand";
import { TIMERS_STORAGE_KEY } from "../constants";

export type Timer = {
    id: string,
    utcOffset: number,
    label: string
}

interface TimerStore {
    timers: Timer[],
    addTimer: (timerData: Timer) => void,
    deleteTimer: (timerId: Timer["id"]) => void,
    editTimer: (timerId: Timer["id"], editedTimerData: Timer) => void
}

const initialTimer = { id: crypto.randomUUID(), utcOffset: 0, label: "" };

export const useTimers = create<TimerStore>(set => ({
    timers: JSON.parse(localStorage.getItem(TIMERS_STORAGE_KEY)!) || [initialTimer],
    addTimer: (timerData: Timer) => set(state => {
        const newTimers = [
            ...state.timers,
            timerData
        ];

        localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(newTimers));

        return {
            ...state,
            timers: newTimers
        };
    }),
    deleteTimer: (timerId: Timer["id"]) => set(state => {
        const newTimers = state.timers.filter(timer => timer.id !== timerId);

        localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(newTimers));

        return {
            ...state,
            timers: newTimers
        };
    }),
    editTimer: (timerId: Timer["id"], editedTimerData: Timer) => set(state => {
        const newTimers = state.timers.map(timer => {
            if (timer.id === timerId) return editedTimerData;
            return timer;
        });

        localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(newTimers));

        return {
            ...state,
            timers: newTimers
        };
    })
}));