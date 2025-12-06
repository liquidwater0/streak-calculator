import { create } from "zustand";

type Timer = {
    id: string,
    utcOffset: number,
    label: string
}

interface TimerStore {
    timers: Timer[],
    addTimer: (timer: Timer) => void
}

export const useTimers = create<TimerStore>(set => ({
    timers: [{ id: crypto.randomUUID(), utcOffset: 0, label: "" }],
    addTimer: (timer: Timer) => set(state => {
        return {
            ...state,
            timers: [
                ...state.timers,
                { ...timer }
            ]
        };
    })
}));